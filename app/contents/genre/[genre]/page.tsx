import { GenrePage } from "../../../../components/TicketSubPage";

export function generateStaticParams() {
  return [
    { genre: "musical" },
    { genre: "concert" },
    { genre: "exhibition" },
    { genre: "classic" },
    { genre: "family" },
    { genre: "play" },
    { genre: "leisure" },
  ];
}

export default async function Page({ params }: { params: Promise<{ genre: string }> }) {
  const { genre } = await params;
  return <GenrePage genre={genre} />;
}

