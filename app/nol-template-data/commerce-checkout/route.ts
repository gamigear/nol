import { NextRequest } from "next/server";
import { proxyTemplateData } from "../proxy";

export function POST(request: NextRequest) {
  return proxyTemplateData(request, "nol-template-data/commerce-checkout");
}
