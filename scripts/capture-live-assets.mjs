import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const LIVE_URL = "https://nol.interpark.com/ticket";
const assetRoot = "public/assets";

async function download(url, file) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed ${res.status} ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, buf);
}

function extFromUrl(url, fallback = ".gif") {
  const clean = url.split("?")[0];
  const ext = path.extname(clean).toLowerCase();
  return ext || fallback;
}

function normalizeAlt(value) {
  return value.trim().replace(/\s+/g, " ");
}

function uniqueByAltOrSrc(images) {
  const seen = new Set();
  const out = [];
  for (const image of images) {
    const key = normalizeAlt(image.alt) || image.src;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(image);
  }
  return out;
}

function sortedMobileBanners(images) {
  const byIndex = new Map();
  for (const image of images) {
    const match = image.id.match(/^thumnail-(\d+)$/);
    if (!match || !image.src.includes("/BbannerMO/")) continue;
    byIndex.set(Number(match[1]), image);
  }
  return [...byIndex.entries()].sort((a, b) => a[0] - b[0]).map(([, image]) => image);
}

const browser = await chromium.launch({ headless: true });
try {
  const desktop = await browser.newPage({ viewport: { width: 1440, height: 1200 }, locale: "ko-KR" });
  await desktop.goto(LIVE_URL, { waitUntil: "domcontentloaded", timeout: 60000 });
  await desktop.waitForLoadState("networkidle", { timeout: 20000 }).catch(() => {});
  const desktopImages = await desktop.evaluate(() => Array.from(document.images).map((img) => {
    const r = img.getBoundingClientRect();
    return { src: img.currentSrc || img.src, alt: img.alt || "", x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) };
  }));

  const headerPromo = desktopImages.find((img) => img.y <= 15 && img.w >= 150 && img.h >= 40);
  if (headerPromo) await download(headerPromo.src, `${assetRoot}/header/top-benefit${extFromUrl(headerPromo.src, ".png")}`);

  const desktopBanners = uniqueByAltOrSrc(
    desktopImages
      .filter((img) => img.w >= 1000 && img.h >= 300 && img.src.includes("/BbannerPC/"))
      .sort((a, b) => a.x - b.x),
  );
  const thumbs = uniqueByAltOrSrc(
    desktopImages
      .filter((img) => img.y >= 540 && img.y <= 620 && img.w >= 48 && img.w <= 62 && img.src.includes("/BbannerPC/"))
      .sort((a, b) => a.x - b.x),
  );
  const fullByAlt = new Map(desktopBanners.map((img) => [normalizeAlt(img.alt), img]));
  const heroOrder = [
    ...thumbs.map((thumb) => ({ ...thumb, src: fullByAlt.get(normalizeAlt(thumb.alt))?.src ?? thumb.src })),
    ...desktopBanners.filter((img) => !thumbs.some((thumb) => normalizeAlt(thumb.alt) === normalizeAlt(img.alt))),
  ];
  for (const [index, img] of heroOrder.slice(0, 17).entries()) {
    await download(img.src, `${assetRoot}/hero/hero-${String(index + 1).padStart(2, "0")}.gif`);
  }

  for (const [index, img] of thumbs.slice(0, 17).entries()) {
    await download(img.src, `${assetRoot}/hero/thumb-${String(index + 1).padStart(2, "0")}${extFromUrl(img.src, ".jpg")}`);
  }

  const miniBanners = [...new Map(
    desktopImages
      .filter((img) => img.w >= 300 && img.h >= 80 && img.src.includes("/MiniBanner/"))
      .map((img) => [img.src, img]),
  ).values()];
  for (const [index, img] of miniBanners.slice(0, 6).entries()) {
    await download(img.src, `${assetRoot}/mini/mini-${String(index + 1).padStart(2, "0")}.gif`);
  }
  await desktop.close();

  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, locale: "ko-KR" });
  await mobile.goto(LIVE_URL, { waitUntil: "domcontentloaded", timeout: 60000 });
  await mobile.waitForLoadState("networkidle", { timeout: 20000 }).catch(() => {});
  const mobileImages = await mobile.evaluate(() => Array.from(document.images).map((img) => {
    const r = img.getBoundingClientRect();
    return { id: img.id || "", src: img.currentSrc || img.src, alt: img.alt || "", x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) };
  }));
  const mobileBanners = sortedMobileBanners(mobileImages);
  for (const [index, img] of mobileBanners.entries()) {
    await download(img.src, `${assetRoot}/hero-mobile/mobile-${String(index + 1).padStart(2, "0")}${extFromUrl(img.src, ".gif")}`);
  }

  const shortcuts = await mobile.$$eval(".GenreMenu_link__8b994", (links) => links.slice(0, 10).map((link) => {
    const svg = link.querySelector("svg");
    const img = link.querySelector("img");
    return { label: link.textContent?.trim() || "", svg: svg?.outerHTML || null, img: img?.currentSrc || img?.src || null };
  }));
  await mkdir(`${assetRoot}/icons`, { recursive: true });
  for (const [index, item] of shortcuts.entries()) {
    const name = `shortcut-${String(index + 1).padStart(2, "0")}`;
    if (item.svg) {
      await writeFile(`${assetRoot}/icons/${name}.svg`, item.svg);
    } else if (item.img) {
      await download(item.img, `${assetRoot}/icons/${name}${extFromUrl(item.img, ".gif")}`);
    }
  }
  await mobile.close();

  const manifest = {
    capturedAt: new Date().toISOString(),
    desktopBanners: heroOrder.slice(0, 17).map(({ alt, src }) => ({ alt: normalizeAlt(alt), src })),
    thumbs: thumbs.slice(0, 17).map(({ alt, src }) => ({ alt: normalizeAlt(alt), src })),
    miniBanners: miniBanners.slice(0, 6).map(({ alt, src }) => ({ alt: normalizeAlt(alt), src })),
    mobileBanners: mobileBanners.map(({ id, alt, src }) => ({ id, alt: normalizeAlt(alt), src })),
    shortcuts: shortcuts.map(({ label, img, svg }) => ({ label, img, hasSvg: Boolean(svg) })),
  };
  await writeFile(`${assetRoot}/capture-manifest.json`, JSON.stringify(manifest, null, 2));

  console.log(JSON.stringify({ headerPromo: Boolean(headerPromo), desktopBanners: heroOrder.length, thumbs: thumbs.length, miniBanners: miniBanners.length, mobileBanners: mobileBanners.length, shortcuts: shortcuts.length }, null, 2));
} finally {
  await browser.close();
}
