import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.MEDUSA_BACKEND_URL || "https://nol.gamigear.com";

export async function proxyTemplateData(request: NextRequest, path: string) {
  const requestUrl = new URL(request.url);
  const baseUrl = BACKEND_URL.replace(/\/$/, "");
  const targetUrl = new URL(path.replace(/^\//, ""), `${baseUrl}/`);
  targetUrl.search = requestUrl.search;

  const headers = new Headers();
  const contentType = request.headers.get("content-type");
  if (contentType) headers.set("content-type", contentType);

  const init: RequestInit = {
    method: request.method,
    headers,
    cache: "no-store",
  };
  if (request.method !== "GET" && request.method !== "HEAD") {
    init.body = await request.text();
  }

  const response = await fetch(targetUrl, init);
  const body = await response.text();
  return new NextResponse(body, {
    status: response.status,
    headers: {
      "cache-control": "no-store",
      "content-type": response.headers.get("content-type") || "application/json; charset=utf-8",
    },
  });
}
