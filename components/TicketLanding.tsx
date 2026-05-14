"use client";

import { createContext, Fragment, useContext, useEffect, useMemo, useState, type CSSProperties, type FormEvent } from "react";
import { fallbackTemplateData, type TemplateData } from "../lib/data/template-data";
import { viCategory, viProduct, viText } from "../lib/i18n/vi";
import type { Banner, HomepageSection, MenuItem, TicketItem } from "../lib/types/ticket";

const TemplateDataContext = createContext<TemplateData>(fallbackTemplateData);

function useTemplateData() {
  return useContext(TemplateDataContext);
}

export function useSyncedTemplateData() {
  const contextData = useTemplateData();
  const hasProviderData = contextData !== fallbackTemplateData;
  const [data, setData] = useState<TemplateData>(contextData);

  useEffect(() => {
    setData(contextData);
  }, [contextData, hasProviderData]);

  useEffect(() => {
    if (hasProviderData) return;
    let active = true;
    fetch("/nol-template-data", { cache: "no-store" })
      .then((response) => response.ok ? response.json() : null)
      .then((payload) => {
        if (!active) return;
        setData(payload?.data ? payload.data as TemplateData : fallbackTemplateData);
      })
      .catch(() => {
        if (active) setData(fallbackTemplateData);
      });
    return () => { active = false; };
  }, [hasProviderData]);

  return data;
}
const shortcutLinks: Record<string, string> = {
  "Nhạc kịch": "/contents/genre/musical",
  "Hòa nhạc": "/contents/genre/concert",
  "Thể thao": "/Contents/Sports",
  "Cổ điển/Múa": "/contents/genre/classic",
  "Kịch": "/contents/genre/play",
  "Giải trí/Cắm trại": "/contents/genre/leisure",
  "Gia đình/Trẻ em": "/contents/genre/family",
  "Triển lãm/Sự kiện": "/contents/genre/exhibition",
  "toping": "/Contents/Toping",
  "Ưu đãi tháng này": "/exhibition?exhibitionCode=250908001",
};

function menuTarget(item: MenuItem) {
  return item.external || /^https?:\/\//.test(item.href) ? "_blank" : undefined;
}

function menuRel(item: MenuItem) {
  return menuTarget(item) ? "noreferrer" : undefined;
}

function submitSearch(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
  const query = String(new FormData(event.currentTarget).get("keyword") ?? "").trim();
  window.location.href = query ? `/contents/search?keyword=${encodeURIComponent(query)}` : "/contents/search";
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

function HeaderHeartIcon() {
  return <svg width="32" height="32" fill="none" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M20.523 8.902a4.403 4.403 0 0 0-7.924-2.641l-.44.585a.2.2 0 0 1-.32 0l-.44-.585a4.403 4.403 0 0 0-7.923 2.642c0 1.208.553 2.285 1.373 3.193l.016.018c.447.528 2.143 2.238 3.865 3.937 1.297 1.28 2.568 2.51 3.274 3.178.705-.668 1.973-1.898 3.269-3.177 1.72-1.7 3.414-3.41 3.86-3.938l.016-.018c.82-.908 1.373-1.985 1.374-3.194m1.5 0c0 1.693-.778 3.112-1.76 4.2-.522.61-2.259 2.36-3.936 4.017-1.698 1.677-3.407 3.333-3.83 3.7a.75.75 0 0 1-.983 0c-.424-.367-2.136-2.021-3.836-3.699-1.696-1.673-3.455-3.443-3.957-4.036-.975-1.085-1.743-2.498-1.743-4.18A5.903 5.903 0 0 1 7.879 3c1.604 0 3.057.642 4.12 1.68A5.88 5.88 0 0 1 16.12 3a5.903 5.903 0 0 1 5.903 5.902" /></svg>;
}

function HeaderCartIcon() {
  return <svg width="32" height="32" fill="none" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M9.515 19.505a.75.75 0 1 0-1.502 0 .75.75 0 0 0 1.502 0m1.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0M17.519 19.505a.75.75 0 1 0-1.502 0 .75.75 0 0 0 1.502 0m1.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0M3.457 2.26a1.75 1.75 0 0 1 1.714 1.352l.387 1.656h13.76a1.75 1.75 0 0 1 1.707 2.13l-1.553 6.992a1.75 1.75 0 0 1-1.71 1.371H7.86a1.75 1.75 0 0 1-1.703-1.351l-.864-3.691-.01-.034-1.05-4.496-.003-.014-.52-2.223a.25.25 0 0 0-.244-.192l-1.894.01a.75.75 0 0 1-.008-1.5zm4.16 11.808a.25.25 0 0 0 .243.193h9.903a.25.25 0 0 0 .244-.196l1.554-6.992a.25.25 0 0 0-.244-.305H5.91z" /></svg>;
}

function HeaderClockIcon() {
  return <svg width="32" height="32" fill="none" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M20.25 12a8.25 8.25 0 1 0-16.5 0 8.25 8.25 0 0 0 16.5 0m1.5 0c0 5.385-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12 6.615 2.25 12 2.25s9.75 4.365 9.75 9.75" /><path fill="currentColor" d="M11.25 11.586V7a.75.75 0 0 1 1.5 0v4.586c0 .066.026.13.073.177l2.707 2.707a.75.75 0 1 1-1.06 1.06l-2.707-2.707a1.75 1.75 0 0 1-.513-1.237" /></svg>;
}

function HeaderActions() {
  const items = [
    { label: "Đăng nhập", href: "/login", icon: <UserIcon /> },
    { label: "Giỏ hàng", href: "/cart", icon: <HeaderCartIcon /> },
  ];
  return <div className="header-actions">{items.map((item) => <a key={item.label} href={item.href}><span>{item.icon}</span><b>{item.label}</b></a>)}</div>;
}

function Arrow({ direction = "next" }: { direction?: "prev" | "next" }) {
  return <span className={direction === "prev" ? "arrow arrow-prev" : "arrow"} aria-hidden="true" />;
}

function getCircularItems<T>(items: T[], start: number, count: number) {
  if (items.length === 0) return [];
  return Array.from({ length: count }, (_, index) => items[(start + index) % items.length]);
}

function moveCircularIndex(current: number, length: number, step: number) {
  if (length <= 0) return 0;
  return (current + step + length) % length;
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(max-width: 1023px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  return isMobile;
}

function Wordmark() {
  return (
    <span className="wordmark" aria-label="NOL interpark">
      <span>NOL</span><b>interpark</b>
    </span>
  );
}

function BrandLogo({ src, mobile = false, alt = "NOL Interpark" }: { src?: string; mobile?: boolean; alt?: string }) {
  if (src) return <img className={mobile ? "brand-logo mobile" : "brand-logo"} src={src} alt={alt} />;
  return <Wordmark />;
}

export function SiteHeader() {
  const data = useSyncedTemplateData();
  const { serviceNavItems, siteInfo, ticketNavItems } = data;
  const desktopLogo = siteInfo.logoUrl;
  const mobileLogo = siteInfo.mobileLogoUrl || siteInfo.logoUrl || "/assets/logo/nol-interpark-logo-multiline.svg";
  const brandName = viText(siteInfo.siteName || "NOL Interpark");

  return (
    <>
      <header className="mobile-header">
        <a className="mobile-brand" href="/" aria-label={brandName}><BrandLogo src={mobileLogo} mobile alt={brandName} /></a>
        <button aria-label="Tìm kiếm"><SearchIcon /></button>
      </header>
      <header className="desktop-header">
        <div className="header-inner">
          <div className="header-search-row">
            <a className="brand" href="/" aria-label={brandName}><BrandLogo src={desktopLogo} alt={brandName} /></a>
            <form className="search-box" onSubmit={submitSearch}>
              <input name="keyword" aria-label="Nhập từ khóa" placeholder={viText(siteInfo.searchPlaceholder)} />
              <button type="submit" aria-label="Tìm kiếm"><SearchIcon /></button>
            </form>
            {siteInfo.topBenefitImage ? <a className="top-benefit"><img src={siteInfo.topBenefitImage} alt={viText(siteInfo.topBenefitAlt)} /></a> : null}
            <HeaderActions />
          </div>
          <nav className="ticket-tabs">
            {ticketNavItems.map((item) => (
              <Fragment key={viText(item.label)}>
                {item.dividerBefore ? <span className="nav-divider" /> : null}
                <a href={item.href} target={menuTarget(item)} rel={menuRel(item)} className={item.accent ? "blue" : ""}>{viText(item.label)}</a>
              </Fragment>
            ))}
          </nav>
        </div>
      </header>
    </>
  );
}

function HeroCarousel() {
  const { heroBanners, mobileHeroBanners } = useTemplateData();
  const isMobile = useIsMobile();
  const banners = isMobile ? mobileHeroBanners : heroBanners;
  const [active, setActive] = useState(0);
  useEffect(() => {
    setActive(0);
  }, [isMobile]);
  useEffect(() => {
    const id = window.setInterval(() => setActive((v) => (v + 1) % banners.length), 5000);
    return () => window.clearInterval(id);
  }, [banners.length]);
  const current = banners[active] ?? banners[0];
  const isProductBanner = current.layout === "product" || Boolean(current.productImage);
  const heroStyle = {
    backgroundColor: current.backgroundColor,
  } as CSSProperties;
  const counterText = `${active + 1} / ${banners.length}`;
  return (
    <section className="hero-wrap" aria-label="main banners">
      <div className="hero-frame" style={heroStyle}>
        <button className="round-control left" onClick={() => setActive((active - 1 + banners.length) % banners.length)} aria-label="Quay lại"><Arrow direction="prev" /></button>
        {isProductBanner ? (
          <a className="hero-designed content-width" href={current.href ?? "#"} key={`${current.title}-${current.productImage ?? current.image}`}>
            <div className="hero-designed-copy">
              {current.kicker ? <span>{viText(current.kicker)}</span> : null}
              <h1>{viProduct(current.title)}</h1>
              {current.subtitle ? <p>{viText(current.subtitle)}</p> : null}
              <div className="hero-designed-meta">
                {current.productPrice ? <strong>{current.productPrice}</strong> : null}
                <em>{viText(current.ctaLabel ?? "Xem sản phẩm")}</em>
              </div>
            </div>
            <div className="hero-designed-media">
              <img src={current.productImage ?? current.image} alt={viText(current.productTitle ?? current.title)} />
            </div>
          </a>
        ) : (
          <picture key={current.image}>
            <source media="(max-width: 1023px)" srcSet={current.mobileImage ?? current.image} />
            <img src={current.image} alt={viText(current.title)} className="hero-image" />
          </picture>
        )}
        <button className="round-control right" onClick={() => setActive((active + 1) % banners.length)} aria-label="Tiếp"><Arrow /></button>
        <div className="hero-counter">{counterText}</div>
        <div className="hero-thumbs" aria-hidden="true">
          {banners.map((item, index) => (
            <button key={item.title} className={index === active ? "active" : ""} onClick={() => setActive(index)} onFocus={() => setActive(index)} onMouseEnter={() => setActive(index)} tabIndex={-1}>
              <img src={item.thumbnail ?? item.productImage ?? item.image} alt="" />
            </button>
          ))}
        </div>
      </div>
      <div className="hero-dots">
        {banners.map((item, index) => (
          <button key={item.title} className={index === active ? "active" : ""} onClick={() => setActive(index)} aria-label={viText(item.title)} />
        ))}
      </div>
    </section>
  );
}

function MobileShortcutGrid() {
  const { mobileShortcuts } = useTemplateData();
  return (
    <section className="mobile-shortcuts" aria-label="ticket shortcuts">
      {mobileShortcuts.map((item) => <a href={item.href ?? shortcutLinks[item.label] ?? "/contents/category"} key={viText(item.label)}><img src={item.icon} alt="" /><span>{viText(item.label)}</span></a>)}
    </section>
  );
}

function MiniBanners() {
  const { miniBanners } = useTemplateData();
  return (
    <section className="mini-section content-width" aria-label="promotion banners">
      {miniBanners.map((item) => item.layout === "product" || item.productImage ? (
        <a className="mini-card mini-designed-card" href={item.href ?? "#"} key={item.title} style={{ backgroundColor: item.backgroundColor }}>
          <div>
            {item.kicker ? <span>{viText(item.kicker)}</span> : null}
            <strong>{viProduct(item.title)}</strong>
            {item.subtitle ? <p>{viText(item.subtitle)}</p> : null}
          </div>
          <img src={item.productImage ?? item.image} alt={viText(item.title)} />
        </a>
      ) : <a className="mini-card" key={item.title}><img src={item.image} alt={viText(item.title)} /></a>)}
    </section>
  );
}

function SectionTitle({ title, action }: { title: string; action?: string }) {
  return <div className="section-title content-width"><h2>{viText(title)}</h2>{action ? <button>{viText(action)}</button> : null}</div>;
}

function ProductTabs({ tabs, active, compact = false, onChange }: { tabs: string[]; active: string; compact?: boolean; onChange: (tab: string) => void }) {
  return (
    <div className={compact ? "genre-tabs content-width compact-tabs" : "genre-tabs content-width"}>
      {tabs.map((item) => <button key={item} type="button" onClick={(event) => { onChange(item); event.currentTarget.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" }); }} className={item === active ? "active" : ""}>{viText(item)}</button>)}
    </div>
  );
}

function tabOffset(tabs: string[] | undefined, active: string) {
  const index = Math.max(0, tabs?.indexOf(active) ?? 0);
  return index * 2;
}

function getTabbedItems<T>(items: T[], tabs: string[] | undefined, active: string) {
  if (!tabs?.length || active === tabs[0]) return items;
  return getCircularItems(items, tabOffset(tabs, active), items.length);
}

function useCollectionItems(sectionId: string, fallback: TicketItem[]) {
  const { homepageCollectionItems } = useTemplateData();
  return homepageCollectionItems?.[sectionId]?.length ? homepageCollectionItems[sectionId] : fallback;
}

function useTabItems(sectionId: string, activeTab: string, fallback: TicketItem[]) {
  const { homepageTabItems } = useTemplateData();
  return homepageTabItems?.[sectionId]?.[activeTab]?.length ? homepageTabItems[sectionId][activeTab] : fallback;
}

function slugifyProductTitle(title?: string) {
  return (title || "product")
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "") || "product";
}

function productRouteKey(item: TicketItem) {
  return item.slug || item.id || slugifyProductTitle(item.title);
}

function productHref(item: TicketItem) {
  return `/goods/${encodeURIComponent(productRouteKey(item))}`;
}

function RankingCard({ item }: { item: TicketItem }) {
  return (
    <article className="ranking-card">
      <a href={productHref(item)} className="poster-wrap"><img src={item.image} alt="" /><span className="poster-rank">{item.rank}</span></a>
      <dl><dt><a href={productHref(item)}>{viProduct(item.title)}</a></dt><dd>{viText(item.venue)}</dd><dd>{viText(item.period)}</dd></dl>
      {item.badge ? <span className={item.badge === "Ưu tiên chỗ ngồi" ? "badge muted" : "badge"}>{viText(item.badge)}</span> : <span className="badge-spacer" />}
    </article>
  );
}

function RankingSection({ section }: { section: HomepageSection }) {
  const { genres, rankingItems } = useTemplateData();
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState(genres[0] ?? "");
  const [start, setStart] = useState(0);
  const baseItems = useCollectionItems(section.id, rankingItems);
  const fallbackItems = getTabbedItems(baseItems, genres, activeTab);
  const tabbedItems = useTabItems(section.id, activeTab, fallbackItems).map((item, index) => ({ ...item, rank: index + 1 }));
  const items = isMobile ? tabbedItems : getCircularItems(tabbedItems, start, 5);
  return (
    <section className="ranking-section">
      <SectionTitle title={section.title} />
      <ProductTabs tabs={genres} active={activeTab} onChange={(tab) => { setActiveTab(tab); setStart(0); }} />
      <div className="poster-slider-wrap"><button className="slider-control slider-left" onClick={() => setStart((value) => moveCircularIndex(value, tabbedItems.length, -1))} aria-label="Quay lại"><Arrow direction="prev" /></button><div key={activeTab} className="ranking-grid content-width">{items.map((item, index) => <RankingCard key={`${activeTab}-${item.title}-${start}-${index}`} item={item} />)}</div><button className="slider-control slider-right" onClick={() => setStart((value) => moveCircularIndex(value, tabbedItems.length, 1))} aria-label="Tiếp"><Arrow /></button></div>
      <button className="section-more ranking-more">{viText(section.actionLabel || `${activeTab || "Nhạc kịch"} Xem toàn bộ xếp hạng`)}</button>
    </section>
  );
}

function DiscountCard({ item }: { item: TicketItem }) {
  const [percent, rest] = useMemo(() => {
    if (!item.price) return ["", ""];
    const [p, ...tail] = item.price.split(" ");
    return [p, tail.join(" ")];
  }, [item.price]);
  return (
    <article className="discount-card">
      <a href={productHref(item)} className="poster-wrap discount-poster"><img src={item.image} alt="" /></a>
      <div className="deal-line"><span>{viText(item.dealLabel)}</span>{item.dealTimer ? <b>{item.dealTimer}</b> : item.dealLabel === "Deal giờ vàng" ? <b>00:00:00</b> : null}</div>
      <h3><a href={productHref(item)}>{viProduct(item.title)}</a></h3><p>{viText(item.venue)}</p><p>{viText(item.period)}</p>{item.saleLabel ? <p className="sale-label">{viText(item.saleLabel)}</p> : null}
      <div className="price"><strong>{percent}</strong>{rest}</div>
    </article>
  );
}

function DiscountSection({ section }: { section: HomepageSection }) {
  const { discountItems } = useTemplateData();
  const sectionItems = useCollectionItems(section.id, discountItems);
  const isMobile = useIsMobile();
  const [start, setStart] = useState(0);
  const items = isMobile ? sectionItems : getCircularItems(sectionItems, start, 7);
  return <section className="discount-section"><SectionTitle title={section.title} /><div className="poster-slider-wrap"><button className="slider-control slider-left" onClick={() => setStart((value) => moveCircularIndex(value, sectionItems.length, -1))} aria-label="Quay lại"><Arrow direction="prev" /></button><div className="discount-grid content-width">{items.map((item, index) => <DiscountCard key={`${item.title}-${start}-${index}`} item={item} />)}</div><button className="slider-control slider-right" onClick={() => setStart((value) => moveCircularIndex(value, sectionItems.length, 1))} aria-label="Tiếp"><Arrow /></button></div></section>;
}


function OpenCard({ item }: { item: TicketItem }) {
  const badges = item.badge?.split(" ").filter(Boolean) ?? [];

  return (
    <article className="open-card">
      <a href={productHref(item)} className="open-poster"><img src={item.image} alt="" /></a>
      <div className="open-info">
        <p className="open-date">{viText(item.period)}</p>
        <h3><a href={productHref(item)}>{viProduct(item.title)}</a></h3>
        <p>{viText(item.venue)}</p>
        {badges.length > 0 ? <div className="open-badges">{badges.map((badge) => <span key={badge}>{viText(badge)}</span>)}</div> : null}
      </div>
    </article>
  );
}

function OpenSection({ section }: { section: HomepageSection }) {
  const { openItems } = useTemplateData();
  const sectionItems = useCollectionItems(section.id, openItems);
  return <section className="open-section"><SectionTitle title={section.title} /><div className="open-grid content-width">{sectionItems.map((item) => <OpenCard key={item.title} item={item} />)}</div><button className="section-more">{viText(section.actionLabel || "Xem tất cả lịch mở bán")}</button></section>;
}

function PlaySection({ section }: { section: HomepageSection }) {
  const { playItems, playTabs } = useTemplateData();
  const [activeTab, setActiveTab] = useState(playTabs[0] ?? "");
  const baseItems = useCollectionItems(section.id, playItems);
  const visibleItems = useTabItems(section.id, activeTab, getTabbedItems(baseItems, playTabs, activeTab));
  return (
    <section className="play-section">
      <SectionTitle title={section.title} />
      <ProductTabs tabs={playTabs} active={activeTab} onChange={setActiveTab} compact />
      <div key={activeTab} className="play-grid content-width">{visibleItems.map((item) => <article className="play-card" key={`${activeTab}-${item.title}`}><div className="video-box"><span className="play-triangle" /><span className="video-time">{viText(item.period)}</span></div><div className="play-caption"><img src={item.image} alt="" /><p>{viProduct(item.title)}</p></div></article>)}</div>
    </section>
  );
}

function ShowcaseCard({ item }: { item: TicketItem }) {
  return <article className="showcase-card"><a href={productHref(item)} className="poster-wrap"><img src={item.image} alt="" /></a><h3><a href={productHref(item)}>{viProduct(item.title)}</a></h3><p>{viText(item.venue)}</p><p>{viText(item.period)}</p></article>;
}

function ShowcaseSection({ section, items, tabs }: { section: HomepageSection; items: TicketItem[]; tabs?: string[] }) {
  const title = section.title;
  const isMobile = useIsMobile();
  const isKeyword = section.id === "keyword";
  const [activeTab, setActiveTab] = useState(tabs?.[0] ?? "");
  const [start, setStart] = useState(0);
  const sectionClass = isKeyword ? "showcase-section keyword-section" : "showcase-section md-section";
  const baseItems = useCollectionItems(section.id, items);
  const tabbedItems = useTabItems(section.id, activeTab, getTabbedItems(baseItems, tabs, activeTab));
  const visibleItems = isMobile ? tabbedItems : getCircularItems(tabbedItems, start, 5);
  return <section className={sectionClass}><SectionTitle title={title} />{tabs ? <ProductTabs tabs={tabs} active={activeTab} onChange={(tab) => { setActiveTab(tab); setStart(0); }} compact /> : null}<div className="poster-slider-wrap"><button className="slider-control slider-left" onClick={() => setStart((value) => moveCircularIndex(value, tabbedItems.length, -1))} aria-label="Quay lại"><Arrow direction="prev" /></button><div key={activeTab} className="showcase-grid content-width">{visibleItems.map((item, index) => <ShowcaseCard key={`${activeTab}-${item.title}-${start}-${index}`} item={item} />)}</div><button className="slider-control slider-right" onClick={() => setStart((value) => moveCircularIndex(value, tabbedItems.length, 1))} aria-label="Tiếp"><Arrow /></button></div></section>;
}

function ReviewSection({ section }: { section: HomepageSection }) {
  const { reviewItems } = useTemplateData();
  const sectionItems = useCollectionItems(section.id, reviewItems);
  return (
    <section className="review-section content-width">
      <SectionTitle title={section.title} />
      <div className="review-grid">{sectionItems.map((item) => <article className="review-card" key={item.title}><div><h3>{viProduct(item.title)}</h3><p>Tổng hợp đánh giá thực tế từ khách hàng. Khu vực đánh giá giúp khách xem nhanh trước khi chọn sản phẩm.</p><span>★ ★ ★ ★ ★ {viText(item.period)}</span></div><img src={item.image} alt="" /></article>)}</div>
      <button className="section-more">{viText(section.actionLabel || "Xem thêm đánh giá")}</button>
    </section>
  );
}

function PromoSection() {
  const { promoBanners } = useTemplateData();
  const [review] = promoBanners;
  return <section className="promo-section content-width"><div className="review-banner"><img src={review.image} alt={viText(review.title)} /></div></section>;
}

function BottomPromoSection() {
  const { promoBanners } = useTemplateData();
  const [, ...promos] = promoBanners;
  return <section className="bottom-promo-section content-width"><div className="promo-grid">{promos.map((item: Banner) => <a key={item.title}><img src={item.image} alt={viText(item.title)} /></a>)}</div></section>;
}

export function SiteFooter() {
  const data = useSyncedTemplateData();
  if (!data) return null;
  const { siteInfo } = data;

  return (
    <footer className="site-footer">
      <div className="footer-inner content-width">
        <nav className="footer-links"><a>Điều khoản sử dụng</a><a>Điều khoản dịch vụ vị trí</a><a>Chính sách riêng tư</a><a>Điều khoản du lịch</a><a>Hướng dẫn bán vé</a><a>Thông báo</a><a>Trung tâm hỗ trợ</a><a>Language</a></nav>
        <div className="partner-row"><img src="/assets/logo/partner-nol.svg" alt="NOL" /><img src="/assets/logo/partner-triple.svg" alt="Triple" /><img src="/assets/logo/partner-nol-global-small.png" alt="Interpark Global" /></div>
        <p className="notice">{viText(siteInfo.footerNotice)}</p>
        <div className="company-grid">
          <div><h2>{viText(siteInfo.companyName)}</h2><p>{viText(siteInfo.companyAddress)}</p><p>{viText(siteInfo.businessNumber)}</p><p>{viText(siteInfo.mailOrderNumber)}</p><p>{viText(siteInfo.tourismNumber)}</p><p>{viText(siteInfo.hostingProvider)}｜ {viText(siteInfo.ceoName)}</p></div>
          <div><h2>Trung tâm hỗ trợ</h2><p>{viText(siteInfo.customerTourPhone)} {viText(siteInfo.customerTicketPhone)}</p><p>{viText(siteInfo.customerFax)} {viText(siteInfo.customerEmail)}</p><p>{viText(siteInfo.customerFlightInternational)} {viText(siteInfo.customerFlightDomestic)}</p></div>
          <div><h2>Thông tin xử lý tranh chấp thanh toán</h2><p>{viText(siteInfo.customerTourPhone)} {viText(siteInfo.customerTicketPhone)}</p><p>{viText(siteInfo.financeEmail)}</p><p>{viText(siteInfo.privacyEmail)}</p></div>
        </div>
        <p className="copyright">{siteInfo.copyright}</p>
      </div>
    </footer>
  );
}

export default function TicketLanding({ data }: { data?: TemplateData }) {
  const templateData = data ?? fallbackTemplateData;
  const sections = templateData.homepageSections?.length ? templateData.homepageSections : fallbackTemplateData.homepageSections;
  const renderSection = (section: HomepageSection) => {
    if (!section.enabled) return null;
    switch (section.id) {
      case "hero": return <HeroCarousel key={section.id} />;
      case "mobileShortcuts": return <MobileShortcutGrid key={section.id} />;
      case "miniBanners": return <MiniBanners key={section.id} />;
      case "ranking": return <RankingSection key={section.id} section={section} />;
      case "open": return <OpenSection key={section.id} section={section} />;
      case "play": return <PlaySection key={section.id} section={section} />;
      case "discount": return <DiscountSection key={section.id} section={section} />;
      case "mdPick": return <ShowcaseSection key={section.id} section={section} items={templateData.mdPickItems} tabs={templateData.mdPickTabs} />;
      case "keyword": return <ShowcaseSection key={section.id} section={section} items={templateData.keywordItems} tabs={templateData.keywordTabs} />;
      case "promo": return <PromoSection key={section.id} />;
      case "review": return <ReviewSection key={section.id} section={section} />;
      case "bottomPromo": return <BottomPromoSection key={section.id} />;
      default: return null;
    }
  };
  return <TemplateDataContext.Provider value={templateData}><main><SiteHeader />{sections.map(renderSection)}<SiteFooter /></main></TemplateDataContext.Provider>;
}
