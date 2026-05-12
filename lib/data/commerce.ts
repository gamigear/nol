export type CommerceCategory = {
  id: string;
  name: string;
  slug: string;
  image_url?: string | null;
  product_count?: number;
};

export type CommerceListProduct = {
  id: string;
  slug: string;
  title: string;
  shortDescription?: string;
  image: string;
  categories?: { name: string; slug: string }[];
  categoryText?: string;
  unitPrice?: number;
  price: string;
  ratingAverage?: number;
  ratingCount?: number;
  soldCount?: number;
  variantId?: string;
};

export type CommerceProductsPayload = {
  products: CommerceListProduct[];
  categories: CommerceCategory[];
  count: number;
  limit: number;
  offset: number;
  sort: string;
  category?: string;
  collection?: string;
  q?: string;
};

export async function getCommerceProducts(params: Record<string, string | number | undefined> = {}): Promise<CommerceProductsPayload> {
  const baseUrl = process.env.MEDUSA_BACKEND_URL;
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === "") continue;
    query.set(key, String(value));
  }
  const fallback: CommerceProductsPayload = { products: [], categories: [], count: 0, limit: 48, offset: 0, sort: String(params.sort || "recommended") };
  if (!baseUrl) return fallback;
  try {
    const response = await fetch(`${baseUrl.replace(/\/$/, "")}/nol-template-data/commerce-products?${query.toString()}`, { cache: "no-store" });
    if (!response.ok) throw new Error(`Commerce API returned ${response.status}`);
    return await response.json() as CommerceProductsPayload;
  } catch (error) {
    console.warn("Falling back to empty commerce product list", error);
    return fallback;
  }
}
