import { CatalogPage } from "../../../components/TicketSubPage";
import { mdPickItems } from "../../../lib/data/ticket";

export default function Page() {
  return <CatalogPage title="Toping" active="Nhạc kịch" items={mdPickItems} />;
}

