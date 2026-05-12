import { InfoPage } from "../../components/TicketUtilityPages";
import { getTemplateData } from "../../lib/data/backend";

export default async function Page() {
  const data = await getTemplateData();
  const page = data.cmsPages.find((item) => item.path === "/about" && item.status === "published");
  return <InfoPage type="about" page={page} />;
}
