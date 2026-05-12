"use client";

import { useState } from "react";
import { discountItems, genres, keywordItems, mdPickItems, openItems, rankingItems } from "../lib/data/ticket";
import { viCategory, viProduct, viText } from "../lib/i18n/vi";
import type { TicketItem } from "../lib/types/ticket";
import { SiteFooter, SiteHeader, useSyncedTemplateData } from "./TicketLanding";

const genreLabels: Record<string, string> = {
  musical: "Nhạc kịch",
  concert: "Hòa nhạc",
  exhibition: "Triển lãm/Sự kiện",
  classic: "Cổ điển/Múa",
  family: "Gia đình/Trẻ em",
  play: "Kịch",
  leisure: "Giải trí/Cắm trại",
};

const genreItems = [...rankingItems, ...discountItems, ...mdPickItems, ...keywordItems];
const rankingSubTabs = ["Tất cả", "Bản quyền/Quốc tế", "Sáng tạo"];
const rankingRates = ["14.6%", "10.7%", "7.5%", "6.6%", "5.6%", "5.2%", "4.8%", "4.1%", "3.5%", "3.1%"];
const openHeroItems = [
  { title: "쥬세뻬 비탈레 MONDO ANMALE", period: "05.06(수) 09:00", image: "https://ticketimage.interpark.com/Play/image/large/26/26006515_p.gif" },
  { title: "2026 PEPPERTONES CLUB TOUR - 전주", period: "05.07(목) 18:30", image: "https://ticketimage.interpark.com/Play/image/large/26/26006139_p.gif" },
  { title: "2026 Busan One Asia Festival (BOF) with NOL", period: "05.12(화) 20:00", image: "https://ticketimage.interpark.com/TicketImage/notice_poster/20/2026042709315507.jpg" },
  { title: "DxS ［소야곡］ ON STAGE - DAEGU", period: "내일 20:00", image: "https://ticketimage.interpark.com/Play/image/large/26/26005973_p.gif" },
  { title: "2026 SVT 10TH FAN MEETING 〈SEVENTEEN in CARAT LAND〉", period: "05.15(금) 20:00", image: "https://ticketimage.interpark.com/TicketImage/notice_poster/20/20260330104705.jpg" },
  { title: "2026 무명전설 전국Tour Hòa nhạc - 춘천", period: "05.07(목) 14:00", image: "https://ticketimage.interpark.com/TicketImage/notice_poster/20/2026042315471276.jpg" },
];
const openNoticeItems = [
  { title: "라스트 폴트레잇", venue: "소극장 공유", period: "내일 09:00", image: "https://ticketimage.interpark.com/TicketImage/notice_poster/20/2026041201050110.jpg", badge: "Mở bán thường" },
  { title: "Kịch 마지막소원 - 충주", venue: "충주시문화회관", period: "내일 10:00", image: "https://ticketimage.interpark.com/TicketImage/notice_poster/20/2026042915493215.jpg", badge: "Mở bán thường" },
  { title: "Kịch 마지막소원 - 단양", venue: "단양군문화예술회관", period: "내일 10:00", image: "https://ticketimage.interpark.com/TicketImage/notice_poster/20/2026042915425054.jpg", badge: "Mở bán thường" },
  { title: "Kịch 마지막소원 - 제천", venue: "제천시문화회관", period: "내일 10:00", image: "https://ticketimage.interpark.com/TicketImage/notice_poster/20/2026042915250393.jpg", badge: "Mở bán thường" },
];
const genreHeroItems = [
  { title: "신과 함께_저승편", venue: "NOL 씨어터 Daehakro 우리카드홀", period: "2026.06.13 - 2026.07.05", image: "https://ticketimage.interpark.com/TCMS3.0/GMain/Musc/2604/260424113159_26006275.gif" },
  { title: "렘피카", venue: "코엑스아티움 우리은행홀", period: "2026.03.21 - 2026.06.21", image: "https://ticketimage.interpark.com/TCMS3.0/GMain/Musc/2601/260115044119_26000685.gif" },
  { title: "유미의 세포들", venue: "예술의전당 CJ 토월극장", period: "2026.06.30 - 2026.08.23", image: "https://ticketimage.interpark.com/TCMS3.0/GMain/Musc/2604/260428095648_26006325.gif" },
  { title: "데스노트", venue: "디큐브 링크아트센터", period: "2025.10.14 - 2026.05.25", image: "https://ticketimage.interpark.com/TCMS3.0/GMain/Musc/2508/250829114242_25012652.gif" },
  { title: "슬립노모어 Seoul", venue: "매키탄 호텔 (The McKithan Hotel)", period: "2025.07.24 - 2026.06.28", image: "https://ticketimage.interpark.com/TCMS3.0/GMain/Musc/2602/260224014934_25008376.gif" },
  { title: "스윙 데이즈_암호명 A", venue: "충무아트센터 대극장", period: "2026.04.16 - 2026.07.05", image: "https://ticketimage.interpark.com/TCMS3.0/GMain/Musc/2603/260309020148_26001111.gif" },
  { title: "1만 NOL포인트", venue: "Gold Class 승급이벤트", period: "VIP 단독혜택까지", image: "https://ticketimage.interpark.com/TCMS3.0/GMain/Musc/2601/260114092513_16007528.gif" },
  { title: "나빌레라", venue: "예술의전당 CJ 토월극장", period: "2026.05.02 - 2026.05.17", image: "https://ticketimage.interpark.com/TCMS3.0/GMain/Musc/2603/260325015244_26003429.gif" },
  { title: "베토벤", venue: "세종문화회관 대극장", period: "2026.06.09 - 2026.08.11", image: "https://ticketimage.interpark.com/TCMS3.0/GMain/Musc/2604/260413115044_P0004669.gif" },
  { title: "빌리 엘리어트", venue: "블루스퀘어 우리은행홀", period: "2026.04.12 - 2026.07.26", image: "https://ticketimage.interpark.com/TCMS3.0/GMain/Musc/2601/260128010721_26001001.gif" },
  { title: "슈가데이 - 팬레터", venue: "NOLVé", period: "2026.05.22", image: "https://ticketimage.interpark.com/TCMS3.0/GMain/Musc/2604/260421010937_26006169.gif" },
  { title: "서편제", venue: "광림아트센터 BBCH홀", period: "2026.04.30 - 2026.07.19", image: "https://ticketimage.interpark.com/TCMS3.0/GMain/Musc/2603/260304100537_26003126.gif" },
  { title: "그날들", venue: "디큐브 링크아트센터", period: "2026.06.09 - 2026.08.23", image: "https://ticketimage.interpark.com/TCMS3.0/GMain/Musc/2604/260428050128_26005310.gif" },
  { title: "몽유도원", venue: "샤롯데씨어터", period: "2026.04.11 - 2026.05.10", image: "https://ticketimage.interpark.com/TCMS3.0/GMain/Musc/2512/251204094122_25017238.gif" },
  { title: "파가니니", venue: "홍익대 Daehakro 아트센터 대극장", period: "2026.06.20 - 2026.08.30", image: "https://ticketimage.interpark.com/TCMS3.0/GMain/Musc/2604/260424113641_26006228.gif" },
  { title: "팬레터", venue: "홍익대 Daehakro 아트센터 대극장", period: "2026.03.17 ~ 2026.06.07", image: "https://ticketimage.interpark.com/TCMS3.0/GMain/Musc/2510/251021010925_25015215.gif" },
];
const genreDealItems = [
  { title: "브라더스 까라마조프", venue: "NOL 씨어터 Daehakro 우리투자증권홀", period: "2026.5.12 ~ 9.6", image: "https://ticketimage.interpark.com/Play/image/large/26/26004473_p.gif", badge: "Ưu đãi học sinh", price: "30% 46,200원" },
  { title: "홍련", venue: "충무아트센터 중극장 블랙", period: "2026.2.28 ~ 5.17", image: "https://ticketimage.interpark.com/Play/image/large/26/26000419_p.gif", badge: "Ưu đãi cư dân", price: "10% 58,500원" },
  { title: "오즈", venue: "Daehakro TOM(티오엠) 2관", period: "2026.5.5 ~ 7.19", image: "https://ticketimage.interpark.com/Play/image/large/26/26004937_p.gif", badge: "Ưu đãi preview", price: "40% 39,600원" },
  { title: "빨래", venue: "NOL 유니플렉스 2관", period: "2025.10.3 ~ 2026.5.31", image: "https://ticketimage.interpark.com/Play/image/large/25/25012969_p.gif", badge: "Ưu đãi xem lại", price: "30% 53,900원" },
  { title: "어서 오세요, 휴남동 서점입니다", venue: "루미나아트홀", period: "2025.3.1 ~ 2026.6.28", image: "https://ticketimage.interpark.com/Play/image/large/26/26002729_p.gif", badge: "라스트 스프링 세일", price: "36% 42,000원" },
  { title: "오지게 재밌는 가시나들", venue: "국립극장 하늘극장", period: "2026.5.15 ~ 6.28", image: "https://ticketimage.interpark.com/Play/image/large/26/26003944_p.gif", badge: "Ưu đãi gia đình", price: "40% 46,200원" },
];
const familyHeroItems: TicketItem[] = [
  { title: "시간을 파는 상점", venue: "파랑씨어터", period: "2024.03.15 - OPEN RUN", image: "https://ticketimage.interpark.com/TCMS3.0/GMain/Faml/2602/260226102235_24002778.gif" },
  { title: "엉뚱발랄 콩순이 : 슈퍼Hòa nhạc", venue: "성균관대학교 새천년홀", period: "2026.05.01 - 2026.05.10", image: "https://ticketimage.interpark.com/TCMS3.0/GMain/Faml/2604/260402095206_26004759.gif" },
  { title: "슈퍼거북 슈퍼토끼", venue: "Seoul숲 씨어터 2관", period: "2026.03.21 - 2026.06.28", image: "https://ticketimage.interpark.com/TCMS3.0/GMain/Faml/2602/260220045528_26002054.gif" },
  { title: "숲속 100층짜리 집", venue: "성균관대학교 새천년홀", period: "2026.07.03 - 2026.08.17", image: "https://ticketimage.interpark.com/TCMS3.0/GMain/Faml/2604/260415095615_26005533.gif" },
  { title: "슈퍼윙스 : 초능력 곤충 대소동", venue: "성수아트홀", period: "2026.04.18 - 2026.05.05", image: "https://ticketimage.interpark.com/TCMS3.0/GMain/Faml/2601/260107034234_26000013.gif" },
  { title: "고래밥 - 바다 대운동회", venue: "마포아트센터 아트홀맥", period: "2026.07.24 - 2026.08.16", image: "https://ticketimage.interpark.com/TCMS3.0/GMain/Faml/2604/260428062317_26005904.gif" },
  { title: "뽀로로와 신비한 여행", venue: "용산아트홀 대극장 미르", period: "2026.05.02 - 2026.05.03", image: "https://ticketimage.interpark.com/TCMS3.0/GMain/Faml/2603/260326030503_26003146.gif" },
  { title: "블링블링 캐치! 티니핑 심포니", venue: "롯데Hòa nhạc홀", period: "2026.05.05", image: "https://ticketimage.interpark.com/TCMS3.0/GMain/Faml/2604/260430112533_26003465.gif" },
];
const familyMobileHeroItems: TicketItem[] = [
  familyHeroItems[4],
  familyHeroItems[5],
  familyHeroItems[0],
  { title: "아이들극장 개관 10주년 2026 키우피우 오브제극축제", venue: "종로 아이들극장", period: "2026.03.13 - 2026.04.29", image: "https://ticketimage.interpark.com/TCMS3.0/GMain/Faml/2603/260327093402_26003582.gif" },
  { title: "리나, 슈퍼히어로", venue: "한전아트센터", period: "2026.07.10 - 2026.08.23", image: "https://ticketimage.interpark.com/TCMS3.0/GMain/Faml/2604/260428102844_26006268.gif" },
  { title: "아주아주 배고픈 애벌레 쇼", venue: "NOL씨어터 합정 ABL생명홀", period: "2025.10.24 ~ 2026.08.30", image: "https://ticketimage.interpark.com/TCMS3.0/GMain/Faml/2509/250918100136_25013600.gif" },
  familyHeroItems[2],
  familyHeroItems[1],
];
const familyMiniBanners = [
  { title: "알파블록스", image: "https://ticketimage.interpark.com/TCMS3.0/GMain/Faml/2602/260226102408_25016249.gif" },
  { title: "에그박사", image: "https://ticketimage.interpark.com/TCMS3.0/GMain/Faml/2410/241016100158_24014227.gif" },
  { title: "프린세스 캐치!티니핑", image: "https://ticketimage.interpark.com/TCMS3.0/GMain/Faml/2601/260107041556_25018617.gif" },
];
const familyDealItems: TicketItem[] = [
  { title: "〈엉뚱발랄 콩순이〉 : 슈퍼Hòa nhạc", venue: "성균관대학교 새천년홀", period: "2026.5.1 ~ 5.10", image: "https://ticketimage.interpark.com/Play/image/large/26/26004759_p.gif", badge: "Ưu đãi preview", price: "60% 22,000원" },
  { title: "숲속 100층짜리 집", venue: "성균관대학교 새천년홀", period: "2026.7.3 ~ 8.17", image: "https://ticketimage.interpark.com/Play/image/large/26/26005533_p.gif", badge: "Ưu đãi tuần mở màn", price: "65% 23,100원" },
  { title: "고래밥 - 바다 대운동회", venue: "마포아트센터 아트홀맥", period: "2026.7.24 ~ 8.16", image: "https://ticketimage.interpark.com/Play/image/large/26/26005904_p.gif", badge: "Ưu đãi preview", price: "70% 15,000원" },
  { title: "엘리엘리팡팡", venue: "한국잡월드 나래울극장", period: "2026.6.17 ~ 7.18", image: "https://ticketimage.interpark.com/Play/image/large/26/26005124_p.gif", badge: "Ưu đãi đặt sớm", price: "65% 15,000원" },
  { title: "한글용사 아이야 달라도 친구야!", venue: "전국Tour", period: "2026.6.12 ~ 6.14", image: "https://ticketimage.interpark.com/Play/image/large/26/26003798_p.gif", badge: "Ưu đãi đặt sớm", price: "60% 28,000원" },
  { title: "설민석의 한국사 대모험 : 안중근", venue: "전국Tour", period: "2026.5.31", image: "https://ticketimage.interpark.com/Play/image/large/26/26000010_p.gif", badge: "Ưu đãi thường xuyên", price: "40% 33,000원" },
];
const familyLinks = ["Tất cả gia đình/trẻ em", "🔥 Đang hot", "Nhạc kịch", "Kịch", "Cổ điển/Múa", "Triển lãm/Sự kiện"];
const familyMobileLinks = ["Tất cả gia đình/trẻ em", "Kịch", "🔥 Đang hot", "Cổ điển/Múa", "Nhạc kịch", "Triển lãm/Sự kiện"];

function getCircularItems<T>(items: T[], start: number, count: number) {
  const visibleCount = Math.min(count, items.length);
  return Array.from({ length: visibleCount }, (_, index) => items[(start + index) % items.length]);
}

function moveCircularIndex(current: number, length: number, step: number) {
  if (length <= 0) return 0;
  return (current + step + length) % length;
}

function SubTabs({ tabs, active }: { tabs: string[]; active: string }) {
  return (
    <nav className="sub-tabs" aria-label="category">
      {tabs.map((tab) => <a key={tab} className={tab === active ? "active" : ""}>{tab}</a>)}
    </nav>
  );
}

function CatalogCard({ item, ranked = false }: { item: TicketItem; ranked?: boolean }) {
  return (
    <article className="catalog-card">
      <div className="poster-wrap">
        <img src={item.image} alt="" />
        {ranked && item.rank ? <span className="poster-rank">{item.rank}</span> : null}
      </div>
      <h3>{viProduct(item.title)}</h3>
      <p>{viText(item.venue)}</p>
      <p>{viText(item.period)}</p>
      {item.badge ? <span className={item.badge === "Ưu tiên chỗ ngồi" ? "badge muted" : "badge"}>{viText(item.badge)}</span> : null}
    </article>
  );
}

function OpenListCard({ item }: { item: TicketItem }) {
  return (
    <article className="sub-open-card">
      <img src={item.image} alt="" />
      <div>
        <strong>{viText(item.period)}</strong>
        <h3>{viProduct(item.title)}</h3>
        <p>{viText(item.venue)}</p>
        {item.badge ? <span>{viText(item.badge)}</span> : null}
      </div>
    </article>
  );
}

function BackIcon() {
  return <span className="mobile-back-icon" aria-hidden="true" />;
}

function MobilePlainHeader({ title }: { title: string }) {
  return <header className="mobile-plain-header"><button aria-label="Quay lại"><BackIcon /></button><h1>{viText(title)}</h1></header>;
}

function MobileGenreHeader({ title }: { title: string }) {
  const data = useSyncedTemplateData();
  const siteInfo = data?.siteInfo;
  const logo = siteInfo?.mobileLogoUrl || siteInfo?.logoUrl || "/assets/logo/nol-interpark-logo-multiline.svg";
  const siteName = viText(siteInfo?.siteName || "NOL Interpark");
  return (
    <header className="mobile-genre-header">
      <a className="mobile-brand" href="/" aria-label={siteName}><img src={logo} alt={siteName} /></a>
      <h1>{viText(title)}</h1>
      <button aria-label="Tìm kiếm"><span className="mobile-search-icon" /></button>
    </header>
  );
}

function MobileRankingCard({ item, index }: { item: TicketItem; index: number }) {
  const trend = index === 0 || index === 2 ? "up" : index < 4 ? "down" : "";
  return (
    <article className="mobile-ranking-item">
      <div className={`mobile-rank-flag ${index === 0 ? "top" : ""}`}>{item.rank}</div>
      {trend ? <span className={`mobile-rank-trend ${trend}`}>{trend === "up" ? "▲1" : "▼1"}</span> : null}
      <img className="mobile-ranking-poster" src={item.image} alt="" />
      <div className="mobile-ranking-info">
        {item.badge ? <span className={item.badge === "Ưu tiên chỗ ngồi" ? "mobile-badge muted" : "mobile-badge"}>{viText(item.badge)}</span> : null}
        <h2>{viProduct(item.title)}</h2>
        <p>{viText(item.venue)}</p>
        <p>{item.period.replace(/\s~\s/g, "~")}</p>
        <div className="mobile-rate">Tỷ lệ đặt <b>{rankingRates[index] ?? "2.8%"}</b><button>Thống kê ›</button></div>
      </div>
    </article>
  );
}

function MobileRankingPage() {
  return (
    <main className="subpage-mobile mobile-ranking-page">
      <MobilePlainHeader title="Xếp hạng theo thể loại" />
      <section className="mobile-ranking-tabs">
        <div className="mobile-pill-row">{genres.map((tab) => <button key={tab} className={tab === "Nhạc kịch" ? "active" : ""}>{viText(tab)}</button>)}</div>
        <div className="mobile-subtab-row">{rankingSubTabs.map((tab) => <button key={tab} className={tab === "Tất cả" ? "active" : ""}>{viText(tab)}</button>)}</div>
      </section>
      <section className="mobile-ranking-stats"><span>Cập nhật 2026.05.03 02:30</span><button>Theo ngày⌄</button></section>
      <section className="mobile-ranking-list">{rankingItems.map((item, index) => <MobileRankingCard key={item.rank} item={item} index={index} />)}</section>
    </main>
  );
}

function MobileOpenPage() {
  return (
    <main className="subpage-mobile mobile-open-page">
      <MobilePlainHeader title="Sắp mở bán" />
      <section className="mobile-open-hero">
        <div className="mobile-open-hero-track">
          {openHeroItems.map((item) => (
            <article className="mobile-open-hero-card" key={item.title}>
              <div className="open-hero-image" style={{ backgroundImage: `url(${item.image})` }}><img src={item.image} alt="" /></div>
              <strong>{viText(item.period)}</strong>
              <h2>{viProduct(item.title)}</h2>
            </article>
          ))}
        </div>
        <div className="mobile-open-dots"><span className="active" /><span /><span /><span /><span /><span /></div>
      </section>
      <section className="mobile-open-list-section">
        <div className="mobile-filter-row"><button>↕ Mở bán</button><button>Thể loại⌄</button><button>Khu vực⌄</button></div>
        <div className="mobile-open-list">
          {openNoticeItems.map((item) => (
            <article className="mobile-open-item" key={item.title}>
              <img src={item.image} alt="" />
              <div><strong>{viText(item.period)}</strong><h2>{viProduct(item.title)}</h2><p>{viText(item.venue)}</p><span>{viText(item.badge)}</span></div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function MobileGenrePage({ title, heroItems = genreHeroItems, dealItems = genreDealItems, links = ["Tất cả nhạc kịch", "Bản quyền", "🔥 Đang hot", "Nhạc kịch sáng tạo", "Original/Quốc tế", "Biểu diễn không lời"] }: { title: string; heroItems?: TicketItem[]; dealItems?: TicketItem[]; links?: string[] }) {
  return (
    <main className="subpage-mobile mobile-genre-page">
      <MobileGenreHeader title={title} />
      <section className="mobile-genre-hero">
        <div className="mobile-genre-track">
          {heroItems.map((item) => (
            <article className="mobile-genre-card" key={item.title}>
              <img src={item.image} alt="" />
              <div><h2>{viProduct(item.title)}</h2><p>{viText(item.venue)}</p><p>{viText(item.period)}</p></div>
            </article>
          ))}
        </div>
      </section>
      <section className="mobile-genre-links">
        {links.map((item) => <button key={item}>{viText(item)} ›</button>)}
      </section>
      <section className="mobile-genre-discount">
        <h2>Đang giảm giá!</h2>
        <div className="mobile-deal-list">
          {dealItems.map((item) => (
            <article className="mobile-deal-item" key={item.title}>
              <img src={item.image} alt="" />
              <div><span>{viText(item.badge)}</span><h3>{viProduct(item.title)}</h3><p>{viText(item.venue)}</p><p>{viText(item.period)}</p><strong>{viText(item.price)}</strong></div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function DesktopGenreVisualPage() {
  const [heroStart, setHeroStart] = useState(0);
  const heroItems = getCircularItems(familyHeroItems, heroStart, 4);
  return (
    <main>
      <SiteHeader />
      <section className="family-visual-page">
        <div className="family-hero-wrap">
          <button className="family-arrow left" onClick={() => setHeroStart((value) => moveCircularIndex(value, familyHeroItems.length, -1))} aria-label="Quay lại"><span className="arrow arrow-prev" /></button>
          <div className="family-hero-track content-width">
            {heroItems.map((item, index) => (
              <article className="family-hero-card" key={`${item.title}-${heroStart}-${index}`}>
                <img src={item.image} alt="" />
                <div><h2>{viProduct(item.title)}</h2><p>{viText(item.venue)}</p><p>{viText(item.period)}</p></div>
              </article>
            ))}
          </div>
          <button className="family-arrow right" onClick={() => setHeroStart((value) => moveCircularIndex(value, familyHeroItems.length, 1))} aria-label="Tiếp"><span className="arrow" /></button>
        </div>
        <nav className="family-link-row" aria-label="family subcategories">
          {familyLinks.map((item) => <button key={item}>{viText(item)} ›</button>)}
        </nav>
        <section className="family-mini-row content-width">
          {familyMiniBanners.map((item) => <a key={item.title}><img src={item.image} alt="" /></a>)}
        </section>
        <section className="family-deals content-width">
          <h2>Đang giảm giá!</h2>
          <div className="family-deal-grid">
            {familyDealItems.map((item) => (
              <article className="family-deal-card" key={item.title}>
                <img src={item.image} alt="" />
                <span>{viText(item.badge)}</span>
                <h3>{viProduct(item.title)}</h3>
                <p>{viText(item.venue)}</p>
                <p>{viText(item.period)}</p>
                <strong>{viText(item.price)}</strong>
              </article>
            ))}
          </div>
        </section>
      </section>
      <SiteFooter />
    </main>
  );
}

function FamilyGenrePage() {
  return (
    <>
      <div className="subpage-desktop"><DesktopGenreVisualPage /></div>
      <MobileGenrePage title="Gia đình/Trẻ em" heroItems={familyMobileHeroItems} dealItems={familyDealItems} links={familyMobileLinks} />
    </>
  );
}

export function CatalogPage({ title, active = "Nhạc kịch", items = genreItems, ranked = false }: { title: string; active?: string; items?: TicketItem[]; ranked?: boolean }) {
  return (
    <main>
      <SiteHeader />
      <section className="sub-hero">
        <div className="content-width">
          <h1>{viText(title)}</h1>
          <SubTabs tabs={genres} active={active} />
        </div>
      </section>
      <section className="sub-content content-width">
        <div className="catalog-grid">
          {items.map((item, index) => <CatalogCard key={`${item.title}-${index}`} item={item} ranked={ranked} />)}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}

export function GenrePage({ genre }: { genre: string }) {
  const active = genreLabels[genre] ?? "Nhạc kịch";
  if (genre === "family") return <FamilyGenrePage />;
  return <><div className="subpage-desktop"><CatalogPage title={active} active={active} items={genreItems} /></div><MobileGenrePage title={active} /></>;
}

export function RankingPage() {
  return <><div className="subpage-desktop"><CatalogPage title="Xếp hạng" active="Nhạc kịch" items={rankingItems} ranked /></div><MobileRankingPage /></>;
}

export function NoticePage() {
  return (
    <>
      <div className="subpage-desktop">
        <main>
          <SiteHeader />
          <section className="sub-hero">
            <div className="content-width">
              <h1>Sắp mở bán</h1>
              <SubTabs tabs={genres} active="Nhạc kịch" />
            </div>
          </section>
          <section className="sub-content content-width">
            <div className="sub-open-list">
              {openItems.map((item) => <OpenListCard key={item.title} item={item} />)}
            </div>
          </section>
          <SiteFooter />
        </main>
      </div>
      <MobileOpenPage />
    </>
  );
}

export function SimpleDirectoryPage({ title, subtitle }: { title: string; subtitle: string }) {
  const cards = [
    { title: "Seoul", venue: subtitle, period: "Địa điểm nổi bật và chương trình đang diễn ra", image: rankingItems[0].image },
    { title: "Gyeonggi/Incheon", venue: subtitle, period: "Gợi ý theo khu vực", image: rankingItems[1].image },
    { title: "Busan", venue: subtitle, period: "Sắp mở bán và xếp hạng", image: rankingItems[2].image },
    { title: "Daegu", venue: subtitle, period: "Triển lãm/Sự kiện và hòa nhạc", image: rankingItems[3].image },
  ];
  return <CatalogPage title={title} active="Nhạc kịch" items={cards} />;
}
