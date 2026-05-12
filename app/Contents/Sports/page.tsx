import { CatalogPage } from "../../../components/TicketSubPage";
import { rankingItems } from "../../../lib/data/ticket";

export default function Page() {
  return <CatalogPage title="Thể thao" active="Thể thao" items={rankingItems} />;
}

