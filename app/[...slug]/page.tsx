import { notFound } from "next/navigation";
import { CmsContentPage } from "../../components/TicketUtilityPages";
import { getTemplateData } from "../../lib/data/backend";

function normalizePath(parts: string[]) {
  return `/${parts.filter(Boolean).join("/")}`.replace(/\/$/, "") || "/";
}

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const path = normalizePath(slug);
  const data = await getTemplateData();
  const page = data.cmsPages.find((item) => item.status !== "draft" && item.path.replace(/\/$/, "") === path);
  if (!page) notFound();
  return <CmsContentPage page={page} />;
}
