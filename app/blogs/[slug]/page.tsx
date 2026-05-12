import { BlogDetailPage } from "../../../components/TicketUtilityPages";
import { getTemplateData } from "../../../lib/data/backend";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getTemplateData();
  return <BlogDetailPage slug={slug} posts={data.blogPosts} categories={data.blogCategories} />;
}
