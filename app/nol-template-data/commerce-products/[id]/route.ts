import { NextRequest } from "next/server";
import { proxyTemplateData } from "../../proxy";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return proxyTemplateData(request, `nol-template-data/commerce-products/${encodeURIComponent(id)}`);
}
