import { BlogListPage } from "../../../../components/TicketUtilityPages";
import { getTemplateData } from "../../../../lib/data/backend";

export default async function Page({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const data = await getTemplateData();
  return <BlogListPage category={category} posts={data.blogPosts} categories={data.blogCategories} />;
}
