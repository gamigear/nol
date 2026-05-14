import { ProductDetailPage } from "../../../components/TicketUtilityPages";

async function getInitialProduct(id: string) {
  const baseUrl = process.env.MEDUSA_BACKEND_URL || "https://nol.gamigear.com";
  try {
    const response = await fetch(`${baseUrl.replace(/\/$/, "")}/nol-template-data/commerce-products/${encodeURIComponent(id)}`, { cache: "no-store" });
    if (!response.ok) return null;
    const payload = await response.json();
    return payload?.product || null;
  } catch {
    return null;
  }
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const initialProduct = await getInitialProduct(id);
  return <ProductDetailPage productId={id} initialProduct={initialProduct} />;
}
