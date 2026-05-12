import { chromium } from "@playwright/test";

const baseUrl = process.env.SMOKE_BASE_URL ?? "http://127.0.0.1:3000";
const routes = [
  "/",
  "/contents/genre/family",
  "/contents/ranking",
  "/contents/notice",
  "/contents/category",
  "/contents/search?keyword=%EB%AE%A4%EC%A7%80%EC%BB%AC",
  "/cart",
  "/checkout",
  "/exhibition?exhibitionCode=250908001",
];

const browser = await chromium.launch({ headless: true });
const failures = [];

for (const route of routes) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
  const errors = [];
  const failedRequests = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("requestfailed", (request) => {
    failedRequests.push(`${request.failure()?.errorText ?? "failed"} ${request.url()}`);
  });
  const response = await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle", timeout: 60000 });
  if (!response?.ok()) failures.push(`${route}: HTTP ${response?.status() ?? "no response"}`);
  if (errors.length > 0) failures.push(`${route}: console errors\n${errors.slice(0, 5).join("\n")}`);
  if (failedRequests.length > 0) failures.push(`${route}: request failures\n${failedRequests.slice(0, 5).join("\n")}`);
  await page.close();
}

await browser.close();

if (failures.length > 0) {
  console.error(failures.join("\n\n"));
  process.exit(1);
}

console.log(`Smoke audit passed for ${routes.length} routes at ${baseUrl}`);
