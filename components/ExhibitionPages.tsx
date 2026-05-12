"use client";

import type { FormEvent } from "react";
import rawEventImages from "../qa/events-source/all-images.json";
import { SiteFooter, SiteHeader } from "./TicketLanding";

type RawImage = {
  index: number;
  src: string;
  alt?: string;
  natural?: number[];
  box: number[];
};

type ExhibitionConfig = {
  code: string;
  title: string;
  className: string;
  heroBackground?: { src: string; height: number };
  extraImages?: Array<{ src: string; alt?: string; left: number; top: number; width: number; height: number }>;
  backgroundBlocks?: Array<{ top: number; height: number; color: string }>;
};

const CONTENT_TOP = 125;
const ARTBOARD_LEFT_TRIM = 80;

const eventImages = rawEventImages as unknown as Record<string, RawImage[]>;

function submitSearch(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
  const query = String(new FormData(event.currentTarget).get("keyword") ?? "").trim();
  window.location.href = query ? `/contents/search?keyword=${encodeURIComponent(query)}` : "/contents/search";
}

async function shareCurrentPage() {
  const url = window.location.href;
  if (navigator.share) {
    await navigator.share({ title: document.title, url });
    return;
  }
  await navigator.clipboard?.writeText(url);
}

const exhibitions: Record<string, ExhibitionConfig> = {
  "260220002": {
    code: "260220002",
    title: "이달의 여행혜택 모음",
    className: "travel-benefits",
    heroBackground: {
      src: "https://common-media.interparkcdn.net/exhibition_view/260220002/18c9192a-6f10-42d4-8bb3-0b5a3c40330d.jpg",
      height: 940,
    },
    extraImages: [
      {
        src: "https://common-media.interparkcdn.net/exhibition_view/260220002/01836335-0884-48a7-b39c-c88b18f457a4.png",
        alt: "4 NOL 제휴·이벤트",
        left: 828,
        top: 940,
        width: 187,
        height: 124,
      },
    ],
  },
  "250908001": {
    code: "250908001",
    title: "NOLVé 혜택 모음",
    className: "ticket-benefits",
    heroBackground: {
      src: "https://common-media.interparkcdn.net/exhibition_view/250908001/73c44476-84f2-4512-bf7d-b7e9a2502ca0.png",
      height: 882,
    },
    backgroundBlocks: [
      { top: 882, height: 2220, color: "#a6ff32" },
      { top: 9468, height: 1538, color: "#a6ff32" },
    ],
  },
  "251017003": {
    code: "251017003",
    title: "NOL의 VIP, Gold Class로 초대합니다",
    className: "gold-class",
  },
};

const footerAssets = ["partner-nol", "partner-triple", "partner-nol-global"];

function isRenderableImage(item: RawImage) {
  const [x, y, width, height] = item.box;
  if (item.index === 0 || width < 80 || height < 50 || y < CONTENT_TOP) return false;
  if (item.src.includes("img_modal_wait")) return false;
  if (footerAssets.some((asset) => item.src.includes(asset))) return false;
  if (item.src.includes("swap-schedule.svg")) return false;
  if (item.src.includes("/airline/")) return false;
  if (x === 0 && y === 0) return false;
  return true;
}

function getVisibleImages(code: string) {
  return (eventImages[code] ?? [])
    .filter(isRenderableImage)
    .map((item) => ({
      ...item,
      left: item.box[0] - ARTBOARD_LEFT_TRIM,
      top: item.box[1] - CONTENT_TOP,
      width: item.box[2],
      height: item.box[3],
    }));
}

function getArtboardHeight(code: string) {
  const images = getVisibleImages(code);
  const bottom = Math.max(0, ...images.map((item) => item.top + item.height));
  return bottom + 96;
}

function SearchIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M15.5 15.5L20.5 20.5" stroke="#29292D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="10.5" cy="10.5" r="6.5" stroke="#29292D" strokeWidth="1.5" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="7.5" r="3.6" stroke="#111" strokeWidth="1.6" />
      <path d="M4.4 21c.8-4.2 3.5-6.4 7.6-6.4s6.8 2.2 7.6 6.4" stroke="#111" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function ReservationIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 4.5h9.2a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-11a2 2 0 0 1 2-2Z" stroke="#111" strokeWidth="1.6" />
      <path d="M8.5 8h6.5M8.5 12h4" stroke="#111" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M18.2 9.5h1.6M18.2 14.5h1.6" stroke="#111" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true">
      <circle cx="24" cy="8" r="4.5" stroke="#536eaf" strokeWidth="2" />
      <circle cx="9" cy="17" r="4.5" stroke="#536eaf" strokeWidth="2" />
      <circle cx="24" cy="26" r="4.5" stroke="#536eaf" strokeWidth="2" />
      <path d="M13 14.8 20 10.2M13.2 19.2 20.2 23.4" stroke="#536eaf" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function Wordmark() {
  return (
    <span className="event-wordmark" aria-label="NOL interpark">
      <span>NOL</span><b>interpark</b>
    </span>
  );
}

function EventHeader() {
  return <SiteHeader />;
}


function DesktopArtboard({ page }: { page: ExhibitionConfig }) {
  const images = getVisibleImages(page.code);
  return (
    <div className="exhibition-artboard-wrap">
      <div className="exhibition-artboard" style={{ height: getArtboardHeight(page.code) }}>
        {page.heroBackground ? (
          <span
            className="exhibition-hero-backdrop"
            style={{ height: page.heroBackground.height, backgroundImage: `url(${page.heroBackground.src})` }}
          />
        ) : null}
        {page.backgroundBlocks?.map((block) => (
          <span
            key={`${block.top}-${block.color}`}
            className="exhibition-bg-block"
            style={{ top: block.top, height: block.height, backgroundColor: block.color }}
          />
        ))}
        <button type="button" className="exhibition-share" onClick={shareCurrentPage} aria-label="Chia sẻ"><ShareIcon /></button>
        {images.map((item) => (
          <img
            key={`${item.index}-${item.src}`}
            className="exhibition-positioned-image"
            src={item.src}
            alt={item.alt ?? page.title}
            loading={item.top < 1200 ? "eager" : "lazy"}
            style={{ left: item.left, top: item.top, width: item.width, height: item.height }}
          />
        ))}
        {page.extraImages?.map((item) => (
          <img
            key={`${item.left}-${item.src}`}
            className="exhibition-positioned-image"
            src={item.src}
            alt={item.alt ?? page.title}
            loading="eager"
            style={{ left: item.left, top: item.top, width: item.width, height: item.height }}
          />
        ))}
      </div>
    </div>
  );
}

const travelMobileSections = [
  "https://common-media.interparkcdn.net/exhibition_view/260220002/9c2a304b-640a-4a53-ad30-a73e35cba78d.jpg",
  "https://common-media.interparkcdn.net/exhibition_view/260220002/d5bb3d06-a27a-4f6e-9ce3-db2e95c02259.png",
  "https://common-media.interparkcdn.net/exhibition_view/260220002/6f511e0c-a2f3-4c48-b785-1b596bc35896.png",
  "https://common-media.interparkcdn.net/exhibition_view/260220002/57e7e2e6-6147-4c14-8317-ca4db70b9bb1.png",
  "https://common-media.interparkcdn.net/exhibition_view/260220002/3f4c37d3-bbb9-4ebe-8ba2-3ed05bc55b2a.png",
  "https://common-media.interparkcdn.net/exhibition_view/260220002/59625aa7-13ff-4df0-b6a7-61c13dd07f0e.png",
  "https://common-media.interparkcdn.net/exhibition_view/260220002/fce2f558-a06f-4ac6-a584-ff795fa21dc8.png",
  "https://common-media.interparkcdn.net/exhibition_view/260220002/91df51d8-8fd7-46e8-9c54-258d6d421eb1.png",
  "https://common-media.interparkcdn.net/exhibition_view/260220002/10cbcf64-bbb5-4e8b-acde-a6dfc6a3bc57.png",
  "https://common-media.interparkcdn.net/exhibition_view/260220002/9dafd5e1-6032-4945-b044-260dad828237.png",
  "https://common-media.interparkcdn.net/exhibition_view/260220002/33fbaee6-f3bf-4a1b-bf09-3a4dbeafa4c3.png",
  "https://common-media.interparkcdn.net/exhibition_view/260220002/57a84085-aea1-4fe7-a233-4f562e0da3f2.png",
  "https://common-media.interparkcdn.net/exhibition_view/260220002/4ae6f4eb-db1f-4326-8d42-cc1401568498.png",
  "https://common-media.interparkcdn.net/exhibition_view/260220002/aab0cf2f-38d1-4933-9891-58129a6caa1f.png",
  "https://common-media.interparkcdn.net/exhibition_view/260220002/575966d6-684a-4ac8-808c-8a4691c2f792.png",
  "https://common-media.interparkcdn.net/exhibition_view/260220002/3af3cb15-26ce-426f-8f82-192ca0453e78.png",
  "https://common-media.interparkcdn.net/exhibition_view/260220002/053d648e-a683-4bb7-aba9-9e00532e2d7d.png",
  "https://common-media.interparkcdn.net/exhibition_view/260220002/de1b277c-5329-48ac-a306-0185a1d3b778.png",
  "https://common-media.interparkcdn.net/exhibition_view/260220002/6943362a-e455-4961-913e-ea821bb08f72.png",
  "https://common-media.interparkcdn.net/exhibition_view/260220002/69717b14-e676-4e1a-b96a-5df4803e37a7.png",
  "https://common-media.interparkcdn.net/exhibition_view/260220002/19d292d0-7dbb-4c93-8fc4-7cb991bdba7d.png",
  "https://common-media.interparkcdn.net/exhibition_view/260220002/d0d4e5d4-b25c-4a55-8252-83707d51f3ce.png",
  "https://openimage.interpark.com/event/2025/250220_benefit/250528/M_Section_05_title.png",
  "https://openimage.interpark.com/event/2025/250220_benefit/250828/event_2_123.png",
  "https://openimage.interpark.com/event/2025/250220_benefit/250724/event_2_btn.png",
  "https://openimage.interpark.com/event/2025/250220_benefit/250828/event_Gold%20Class.png",
  "https://openimage.interpark.com/event/2025/250220_benefit/250828/event_Gold%20Class_btn.png",
  "https://openimage.interpark.com/event/2025/250220_benefit/250828/event_money_251231.png",
  "https://openimage.interpark.com/event/2025/250220_benefit/250828/event_money_btn.png",
  "https://openimage.interpark.com/event/2025/250220_benefit/250828/event_1.png",
  "https://openimage.interpark.com/event/2025/250220_benefit/250724/event_1_btn.png",
];

const travelMobileTabs = [
  "https://common-media.interparkcdn.net/exhibition_view/260220002/469f2cc1-ecc9-4638-bf46-58b931907f3e.png",
  "https://common-media.interparkcdn.net/exhibition_view/260220002/92fd5bb1-d580-45bd-a8a2-1fd94bc1ab90.png",
  "https://common-media.interparkcdn.net/exhibition_view/260220002/f7373d1d-436a-47ca-8bf2-4b160145edc7.png",
  "https://common-media.interparkcdn.net/exhibition_view/260220002/01836335-0884-48a7-b39c-c88b18f457a4.png",
];

function TravelMobileStack() {
  const [hero, ...sections] = travelMobileSections;
  return (
    <div className="travel-mobile-stack">
      <div className="travel-mobile-hero">
        <img src={hero} alt="이달의 여행혜택 모음" />
        <button type="button" className="travel-mobile-share" onClick={shareCurrentPage} aria-label="Chia sẻ"><ShareIcon /></button>
      </div>
      <div className="travel-mobile-tabs">{travelMobileTabs.map((src) => <img key={src} src={src} alt="" />)}</div>
      {sections.map((src) => <img key={src} src={src} alt="" loading="lazy" />)}
    </div>
  );
}

export function ExhibitionPage({ code }: { code?: string }) {
  const page = exhibitions[code ?? ""] ?? exhibitions["250908001"];
  return (
    <main className={`exhibition-page ${page.className}`}>
      <EventHeader />
      <section className="exhibition-body" aria-label={page.title}>
        <DesktopArtboard page={page} />
        {page.code === "260220002" ? <TravelMobileStack /> : null}
      </section>
      <SiteFooter />
    </main>
  );
}
