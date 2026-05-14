import { NextRequest } from "next/server";
import { proxyTemplateData } from "./proxy";

export function GET(request: NextRequest) {
  return proxyTemplateData(request, "nol-template-data");
}
