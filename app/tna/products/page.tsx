import ShopCategoryPage from "../../../components/ShopCategoryPage";
import { getCommerceProducts } from "../../../lib/data/commerce";

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const category = typeof params.category === "string" ? params.category : "";
  const q = typeof params.q === "string" ? params.q : "";
  const sort = typeof params.sort === "string" ? params.sort : "recommended";
  const payload = await getCommerceProducts({ category, q, sort, limit: 48 });
  return <ShopCategoryPage payload={payload} activeCategory={category} q={q} sort={sort} basePath="/tna/products" />;
}
