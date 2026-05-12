import { CmsContentPage, GuideManualPage } from "../../../../components/TicketUtilityPages";
import { getTemplateData } from "../../../../lib/data/backend";

export default async function Page() {
  const data = await getTemplateData();
  const page = data.cmsPages.find((item) => item.path === "/contents/guide/manual" && item.status === "published");
  return page ? <CmsContentPage page={page} /> : <GuideManualPage />;
}
