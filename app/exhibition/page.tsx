import { ExhibitionPage } from "../../components/ExhibitionPages";

type ExhibitionSearchParams = Promise<{ exhibitionCode?: string }>;

export default async function Page({ searchParams }: { searchParams: ExhibitionSearchParams }) {
  const { exhibitionCode } = await searchParams;
  return <ExhibitionPage code={exhibitionCode} />;
}
