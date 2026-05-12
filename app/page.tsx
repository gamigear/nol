import TicketLanding from "../components/TicketLanding";
import { getTemplateData } from "../lib/data/backend";

export default async function Home() {
  const data = await getTemplateData();
  return <TicketLanding data={data} />;
}
