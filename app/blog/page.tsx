import { BlogListPage } from "../../components/TicketUtilityPages";
import { getTemplateData } from "../../lib/data/backend";

export default async function Page() {
  const data = await getTemplateData();
  return <BlogListPage posts={data.blogPosts} categories={data.blogCategories} />;
}
