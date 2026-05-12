import ShopCategoryPage from "../../../components/ShopCategoryPage";
import { getCommerceProducts } from "../../../lib/data/commerce";

export default async function Page({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const { slug } = await params;
  const query = await searchParams;
  const q = typeof query.q === "string" ? query.q : "";
  const sort = typeof query.sort === "string" ? query.sort : "recommended";
  const payload = await getCommerceProducts({ category: slug, q, sort, limit: 48 });
  return <ShopCategoryPage payload={payload} activeCategory={slug} q={q} sort={sort} basePath={`/category/${slug}`} />;
}
