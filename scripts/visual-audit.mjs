import { chromium } from "@playwright/test";
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const LIVE_URL = process.env.LIVE_URL || "https://nol.interpark.com/ticket";
const TEMPLATE_URL = process.env.TEMPLATE_URL || "http://127.0.0.1:3000";
const OUT_DIR = process.env.OUT_DIR || "qa/latest";
const RUN_AT = new Date().toISOString();

const viewports = [
  { name: "desktop", width: 1440, height: 1200, isMobile: false },
  { name: "mobile", width: 390, height: 844, isMobile: true },
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function dismissOverlays(page) {
  const selectors = [
    "button:has-text(닫기)",
    "button:has-text(오늘 하루 보지 않기)",
    "button[aria-label*=닫기]",
    "button[aria-label*=close i]",
    ".popup button",
    ".modal button",
  ];
  for (const selector of selectors) {
    const locator = page.locator(selector).first();
    try {
      if (await locator.isVisible({ timeout: 500 })) {
        await locator.click({ timeout: 1000 });
        await sleep(250);
      }
    } catch {}
  }
}

async function warmLazyAssets(page) {
  await page.evaluate(async () => {
    const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const maxY = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    for (let y = 0; y <= maxY; y += 650) {
      window.scrollTo(0, y);
      await wait(120);
    }
    window.scrollTo(0, 0);
    await wait(500);
  });
}

async function stabilizeDesktopHero(page, targetName, viewport) {
  if (viewport.isMobile) return;
  try {
    if (targetName === "template") {
      await page.locator(".hero-thumbs button").first().click({ timeout: 1000 });
    } else {
      const point = await page.evaluate(() => {
        const thumbs = Array.from(document.images)
          .map((img) => ({ rect: img.getBoundingClientRect(), src: img.currentSrc || img.src }))
          .filter(({ rect, src }) => src.includes("/BbannerPC/") && rect.width >= 48 && rect.width <= 70 && rect.height >= 48 && rect.height <= 70 && rect.y > 500 && rect.y < 650 && rect.x >= 0)
          .sort((a, b) => a.rect.x - b.rect.x);
        const rect = thumbs[0]?.rect;
        return rect ? { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 } : null;
      });
      if (point) await page.mouse.click(point.x, point.y);
    }
    await page.waitForTimeout(800);
  } catch {}
}

async function stabilizeMobileHero(page, targetName, viewport) {
  if (!viewport.isMobile) return;
  try {
    if (targetName === "template") {
      await page.evaluate(() => {
        document.querySelector(".hero-dots button")?.click();
      });
    } else {
      await page.evaluate(() => {
        const swiper = document.querySelector(".Ticket_Bbanner")?.swiper;
        if (!swiper) return;
        swiper.slideToLoop(0, 0, false);
        swiper.update();
      });
    }
    await page.waitForTimeout(500);
  } catch {}
}

async function capture(browser, target, viewport) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    deviceScaleFactor: 1,
    isMobile: viewport.isMobile,
    hasTouch: viewport.isMobile,
    locale: "ko-KR",
    timezoneId: "Asia/Seoul",
  });
  const page = await context.newPage();
  await page.addInitScript(() => {
    const realSetInterval = window.setInterval;
    window.setInterval = (handler, timeout = 0, ...args) => {
      if (typeof timeout === "number" && timeout >= 1000) return 0;
      return realSetInterval(handler, timeout, ...args);
    };
  });
  await page.goto(target.url, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForLoadState("networkidle", { timeout: 20000 }).catch(() => {});
  await dismissOverlays(page);
  await warmLazyAssets(page);
  await stabilizeDesktopHero(page, target.name, viewport);
  await stabilizeMobileHero(page, target.name, viewport);
  const metrics = await page.evaluate(() => ({
    title: document.title,
    width: document.documentElement.clientWidth,
    height: Math.max(document.body.scrollHeight, document.documentElement.scrollHeight),
    firstH1: document.querySelector("h1")?.textContent?.trim() || null,
    sectionHeadings: Array.from(document.querySelectorAll("h1,h2")).slice(0, 12).map((el) => el.textContent?.trim()).filter(Boolean),
  }));
  const base = path.join(OUT_DIR, `${target.name}-${viewport.name}`);
  await page.screenshot({ path: `${base}-viewport.png`, fullPage: false, animations: "disabled" });
  await page.screenshot({ path: `${base}-full.png`, fullPage: true, animations: "disabled" });
  await context.close();
  return metrics;
}

function crop(src, width, height) {
  const out = new PNG({ width, height });
  PNG.bitblt(src, out, 0, 0, width, height, 0, 0);
  return out;
}

async function compare(viewport) {
  const livePath = path.join(OUT_DIR, `live-${viewport.name}-viewport.png`);
  const templatePath = path.join(OUT_DIR, `template-${viewport.name}-viewport.png`);
  const live = PNG.sync.read(await readFile(livePath));
  const template = PNG.sync.read(await readFile(templatePath));
  const width = Math.min(live.width, template.width);
  const height = Math.min(live.height, template.height);
  const liveCrop = crop(live, width, height);
  const templateCrop = crop(template, width, height);
  const diff = new PNG({ width, height });
  const mismatched = pixelmatch(liveCrop.data, templateCrop.data, diff.data, width, height, {
    threshold: 0.12,
    includeAA: false,
  });
  const diffPath = path.join(OUT_DIR, `diff-${viewport.name}-viewport.png`);
  await writeFile(diffPath, PNG.sync.write(diff));
  return {
    viewport: viewport.name,
    comparedWidth: width,
    comparedHeight: height,
    mismatched,
    mismatchRatio: Number((mismatched / (width * height)).toFixed(4)),
    diffPath,
  };
}

await mkdir(OUT_DIR, { recursive: true });
const browser = await chromium.launch({ headless: true });
const summary = { runAt: RUN_AT, liveUrl: LIVE_URL, templateUrl: TEMPLATE_URL, captures: {}, diffs: [] };
try {
  for (const viewport of viewports) {
    summary.captures[`live-${viewport.name}`] = await capture(browser, { name: "live", url: LIVE_URL }, viewport);
    summary.captures[`template-${viewport.name}`] = await capture(browser, { name: "template", url: TEMPLATE_URL }, viewport);
    summary.diffs.push(await compare(viewport));
  }
} finally {
  await browser.close();
}
await writeFile(path.join(OUT_DIR, "summary.json"), JSON.stringify(summary, null, 2));
console.log(JSON.stringify(summary, null, 2));
