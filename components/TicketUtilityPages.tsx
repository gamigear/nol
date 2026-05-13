"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from "react";
import { blogPosts as fallbackBlogPosts, rankingItems } from "../lib/data/ticket";
import { viCategory, viHtml, viProduct, viText } from "../lib/i18n/vi";
import type { BlogCategory, BlogPost, CmsPage, TicketItem } from "../lib/types/ticket";
import { SiteFooter, SiteHeader } from "./TicketLanding";

const product = {
  id: "26001001",
  title: "Nhạc kịch 〈빌리 엘리어트〉",
  venue: "블루스퀘어 우리은행홀",
  period: "2026.4.12 ~ 2026.7.26",
  badge: "Bán độc quyền",
  poster: "https://ticketimage.interpark.com/Play/image/large/26/26001001_p.gif",
  bridgeHero: "https://ticketimage.interpark.com/TCMS3.0//MProd/ProdBridge/2601/d17338b8-f9cb-410d-abfb-3d07dd7c5df4.png",
  bridgeDetail: "https://ticketimage.interpark.com/TCMS3.0//MProd/ProdBridge/2603/f2127e7f-3ad8-4dc7-b843-96b9e89581ca.jpg",
};

const notice = {
  title: "쥬세뻬 비탈레 MONDO ANMALE",
  image: "https://ticketimage.interpark.com/Play/image/large/26/26006515_p.gif",
  date: "05.06(수) 09:00",
  period: "2026.06.04 ~ 2026.08.23",
  venue: "강동아트센터, 아트랑",
  age: "Tất cả관람가",
};

const categoryIcons = [
  ["Nhạc kịch", "/assets/icons/shortcut-01.svg"],
  ["Hòa nhạc", "/assets/icons/shortcut-02.svg"],
  ["Kịch", "/assets/icons/shortcut-05.svg"],
  ["Cổ điển/Múa", "/assets/icons/shortcut-04.svg"],
  ["Thể thao", "/assets/icons/shortcut-03.svg"],
  ["Triển lãm/Sự kiện", "/assets/icons/shortcut-08.svg"],
  ["Gia đình/Trẻ em", "/assets/icons/shortcut-07.svg"],
  ["Giải trí/Cắm trại", "/assets/icons/shortcut-06.svg"],
];
const categoryHref: Record<string, string> = {
  "Nhạc kịch": "/contents/genre/musical",
  "Hòa nhạc": "/contents/genre/concert",
  "Kịch": "/contents/genre/play",
  "Cổ điển/Múa": "/contents/genre/classic",
  "Thể thao": "/Contents/Sports",
  "Triển lãm/Sự kiện": "/contents/genre/exhibition",
  "Gia đình/Trẻ em": "/contents/genre/family",
  "Giải trí/Cắm trại": "/contents/genre/leisure",
};

function goBack() {
  if (window.history.length > 1) {
    window.history.back();
    return;
  }
  window.location.href = "/";
}

function goToSearch() {
  window.location.href = "/contents/search";
}

function safeDecodeRouteKey(value?: string) {
  if (!value) return "";
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function slugifyProductTitle(title?: string) {
  return (title || "product")
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "") || "product";
}

function productRouteKey(item: Pick<TicketItem, "id" | "slug" | "title">) {
  return item.slug || item.id || slugifyProductTitle(item.title);
}

function productHref(item: Pick<TicketItem, "id" | "slug" | "title">) {
  return `/goods/${encodeURIComponent(productRouteKey(item))}`;
}

function goToCheckout() {
  window.location.href = "/checkout";
}

function addItemToCart(item?: Pick<TicketItem, "id" | "variantId">) {
  if (!item?.id) {
    window.location.href = "/cart";
    return;
  }
  const key = "nol-commerce-cart";
  const parsed = JSON.parse(localStorage.getItem(key) || "[]") as Array<{ product_id: string; variant_id?: string; quantity: number }>;
  const existing = parsed.find((entry) => entry.product_id === item.id && entry.variant_id === item.variantId);
  if (existing) existing.quantity += 1;
  else parsed.push({ product_id: item.id, variant_id: item.variantId, quantity: 1 });
  localStorage.setItem(key, JSON.stringify(parsed));
  window.location.href = "/cart";
}

async function shareCurrentPage() {
  const url = window.location.href;
  if (navigator.share) {
    await navigator.share({ title: document.title, url });
    return;
  }
  await navigator.clipboard?.writeText(url);
}

function BackIcon() {
  return <span className="mobile-back-icon" aria-hidden="true" />;
}

function MobileTopBar({ title, search = false }: { title: string; search?: boolean }) {
  return (
    <header className="utility-mobile-top">
      <button type="button" onClick={goBack} aria-label="Quay lại"><BackIcon /></button>
      <h1>{title}</h1>
      {search ? <button type="button" onClick={goToSearch} aria-label="Tìm kiếm"><span className="mobile-search-icon" /></button> : <span />}
    </header>
  );
}

function formatVndPrice(value?: number) {
  if (!value) return "Liên hệ";
  return new Intl.NumberFormat("vi-VN").format(value) + "đ";
}

function normalizeDetailItem(item?: TicketItem | null) {
  return {
    id: item?.id,
    variantId: item?.variantId,
    title: viProduct(item?.title ?? product.title),
    venue: viText(item?.venue ?? product.venue),
    period: viText(item?.period ?? product.period),
    badge: viText(item?.badge ?? product.badge),
    image: item?.image ?? product.poster,
    price: item?.price ?? formatVndPrice(item?.unitPrice),
  };
}

function ProductSummary({ item }: { item: ReturnType<typeof normalizeDetailItem> }) {
  return (
    <aside className="product-summary">
      <h2>Chi tiết sản phẩm</h2>
      <article>
        <img src={item.image} alt="" />
        <div>
          <span>{item.price}</span>
          <h3>{item.title}</h3>
          <p>{item.venue}</p>
          <p>{item.period}</p>
          {item.badge ? <b>{item.badge}</b> : null}
        </div>
      </article>
      <button type="button" onClick={() => addItemToCart(item)}>Thêm vào giỏ</button>
    </aside>
  );
}

type CommerceVariant = {
  id?: string;
  sku?: string;
  title: string;
  price?: number;
  salePrice?: number;
  unitPrice?: number;
  priceText?: string;
  currencyCode?: string;
  inventoryQuantity?: number;
  isDefault?: boolean;
};

type CommerceDetail = TicketItem & {
  slug?: string;
  description?: string;
  shortDescription?: string;
  images?: { url: string; alt_text?: string; sort_order?: number }[];
  variants?: CommerceVariant[];
  options?: { title: string; values: string[] }[];
  categories?: { name: string; slug: string }[];
  categoryText?: string;
  totalInventory?: number;
  metadata?: Record<string, unknown>;
};

function cleanProductHtml(html?: string) {
  if (!html) return "";
  return html
    .replace(/\[caption[^\]]*\]([\s\S]*?)\[\/caption\]/g, '<figure class="wp-caption">$1</figure>')
    .replace(/<script[\s\S]*?<\/script>/gi, "");
}

function isTemplateCategorySlug(slug?: string) {
  return /^(mock-|homecat-|ranking-category-|play-category-|md-pick-category-|keyword-category-)/.test(slug || "");
}

function primaryProductCategory(item?: CommerceDetail | null) {
  const categories = (item?.categories || []).filter((entry) => entry?.slug);
  const category = categories.find((entry) => !isTemplateCategorySlug(entry.slug)) ?? categories.find((entry) => entry?.name) ?? categories[0];
  if (category?.slug) {
    return { name: viCategory(category.name || item?.categoryText || "Sản phẩm"), href: `/category/${encodeURIComponent(category.slug)}` };
  }
  return { name: viCategory(item?.categoryText || "Sản phẩm"), href: "/shop" };
}

export function ProductDetailPage({ productId, initialProduct = null }: { productId?: string; initialProduct?: CommerceDetail | null }) {
  const [managedItem, setManagedItem] = useState<CommerceDetail | null>(initialProduct);
  const [activeImage, setActiveImage] = useState(0);
  const [galleryViewerOpen, setGalleryViewerOpen] = useState(false);
  const relatedTrackRef = useRef<HTMLDivElement>(null);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState<TicketItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let active = true;
    async function loadProduct() {
      try {
        if (productId) {
          const commerceResponse = await fetch(`/nol-template-data/commerce-products/${encodeURIComponent(productId)}`, { cache: "no-store" });
          if (commerceResponse.ok) {
            const payload = await commerceResponse.json();
            const product = payload?.product;
            if (product && active) {
              setManagedItem({
                id: product.id,
                variantId: product.variantId,
                currencyCode: product.currencyCode,
                unitPrice: product.unitPrice,
                title: product.title,
                venue: product.shortDescription || product.categoryText || "XinhBoFood",
                period: product.categoryText || "Sản phẩm",
                image: product.image,
                images: Array.isArray(product.images) ? product.images : [],
                variants: Array.isArray(product.variants) ? product.variants : [],
                options: Array.isArray(product.options) ? product.options : [],
                price: product.price,
                description: product.description || "",
                shortDescription: product.shortDescription || "",
                categories: product.categories || [],
                categoryText: product.categoryText || "",
                totalInventory: product.totalInventory,
                metadata: product.metadata || {},
              });
              setActiveImage(0);
              return;
            }
          }
        }

        const response = await fetch("/nol-template-data", { cache: "no-store" });
        const payload = await response.json();
        const sections = ["rankingItems", "discountItems", "openItems", "mdPickItems", "keywordItems", "reviewItems"];
        const items = sections.flatMap((key) => Array.isArray(payload?.data?.[key]) ? payload.data[key] : []) as TicketItem[];
        const routeKey = safeDecodeRouteKey(productId);
        const found = productId
          ? items.find((item) => item.id === routeKey || item.slug === routeKey || slugifyProductTitle(item.title) === routeKey)
          : items.find((item) => item.id);
        if (active) setManagedItem(found ? { ...found, id: found.id || productRouteKey(found), images: found.image ? [{ url: found.image }] : [] } : null);
      } catch {
        if (active) setManagedItem(null);
      } finally {
        if (active) setLoaded(true);
      }
    }
    loadProduct();
    return () => { active = false; };
  }, [productId]);

  useEffect(() => {
    const variants = managedItem?.variants ?? [];
    const defaultIndex = variants.findIndex((variant) => variant.isDefault);
    setSelectedVariantIndex(defaultIndex >= 0 ? defaultIndex : 0);
  }, [managedItem?.id, managedItem?.variants]);

  useEffect(() => {
    let active = true;
    async function loadRelatedProducts() {
      try {
        const response = await fetch("/nol-template-data", { cache: "no-store" });
        const payload = await response.json();
        const sections = ["rankingItems", "discountItems", "openItems", "mdPickItems", "keywordItems", "reviewItems"];
        const allItems = sections.flatMap((key) => Array.isArray(payload?.data?.[key]) ? payload.data[key] : []) as TicketItem[];
        const seen = new Set<string>();
        const currentKey = productId ? safeDecodeRouteKey(productId) : managedItem?.id;
        const currentCategory = viCategory(managedItem?.categoryText || "");
        const normalized = allItems.filter((item) => {
          const key = productRouteKey(item);
          if (!key || key === currentKey || seen.has(key)) return false;
          seen.add(key);
          return true;
        });
        const sameCategory = normalized.filter((item) => {
          const itemCategory = (item as TicketItem & { category?: string; categoryText?: string }).categoryText || (item as TicketItem & { category?: string; categoryText?: string }).category || item.venue || "";
          return currentCategory && viCategory(itemCategory) === currentCategory;
        });
        if (active) setRelatedProducts((sameCategory.length ? sameCategory : normalized).slice(0, 8));
      } catch {
        if (active) setRelatedProducts([]);
      }
    }
    loadRelatedProducts();
    return () => { active = false; };
  }, [managedItem?.categoryText, managedItem?.id, productId]);

  const variants = managedItem?.variants ?? [];
  const selectedVariant = variants[Math.min(selectedVariantIndex, Math.max(variants.length - 1, 0))];
  const detailItem = normalizeDetailItem(managedItem);
  const selectedPrice = selectedVariant?.priceText || formatVndPrice(selectedVariant?.salePrice ?? selectedVariant?.price ?? selectedVariant?.unitPrice) || detailItem.price;
  const selectedCartItem = { ...detailItem, variantId: selectedVariant?.id || detailItem.variantId, price: selectedPrice };
  const gallery = (managedItem?.images?.length ? managedItem.images : [{ url: detailItem.image || product.poster }]).filter((image) => image.url);
  const currentGalleryIndex = Math.min(activeImage, Math.max(gallery.length - 1, 0));
  const heroImage = gallery[currentGalleryIndex]?.url || detailItem.image || product.bridgeHero;
  const descriptionHtml = cleanProductHtml(managedItem?.description);
  const openGalleryViewer = (index: number) => {
    setActiveImage(index);
    setGalleryViewerOpen(true);
  };
  const moveGalleryViewer = (direction: 1 | -1) => {
    if (!gallery.length) return;
    setActiveImage((index) => (index + direction + gallery.length) % gallery.length);
  };

  return (
    <>
      <div className="utility-desktop">
        <SiteHeader />
        <main className="nol-stay-detail">
          <nav className="nol-stay-breadcrumb" aria-label="breadcrumb"><a href="/">Trang chủ</a><span>›</span><a href="/shop">Shop</a><span>›</span><a href={primaryProductCategory(managedItem).href}>{primaryProductCategory(managedItem).name}</a><span>›</span><b>{detailItem.title}</b></nav>
          <section className="nol-stay-gallery nol-stay-gallery-equal" aria-label="product gallery">
            {gallery.map((image, index) => (
              <button key={`${image.url}-${index}`} type="button" className="nol-stay-gallery-tile" onClick={() => openGalleryViewer(index)}>
                <img src={image.url} alt={index === 0 ? detailItem.title : ""} />
              </button>
            ))}
          </section>
          {galleryViewerOpen ? (
            <div className="nol-gallery-viewer" role="dialog" aria-modal="true" aria-label="Xem ảnh sản phẩm">
              <button type="button" className="nol-gallery-backdrop" aria-label="Đóng" onClick={() => setGalleryViewerOpen(false)} />
              <div className="nol-gallery-dialog">
                <button type="button" className="nol-gallery-close" onClick={() => setGalleryViewerOpen(false)} aria-label="Đóng">×</button>
                <button type="button" className="nol-gallery-nav prev" onClick={() => moveGalleryViewer(-1)} aria-label="Ảnh trước">‹</button>
                <figure><img src={heroImage} alt={detailItem.title} /><figcaption>{currentGalleryIndex + 1} / {gallery.length}</figcaption></figure>
                <button type="button" className="nol-gallery-nav next" onClick={() => moveGalleryViewer(1)} aria-label="Ảnh tiếp">›</button>
                <div className="nol-gallery-thumbs">{gallery.map((image, index) => <button key={`${image.url}-thumb-${index}`} type="button" className={index === currentGalleryIndex ? "active" : ""} onClick={() => setActiveImage(index)}><img src={image.url} alt="" /></button>)}</div>
              </div>
            </div>
          ) : null}
          <section className="nol-stay-headline">
            <div>
              <span className="nol-stay-grade">Nổi bật</span>
              <h1>{detailItem.title}</h1>
              <p>{managedItem?.shortDescription || detailItem.venue}</p>
              <div className="nol-stay-location">{viCategory(managedItem?.categoryText || detailItem.period)}</div>
            </div>
            <button type="button" onClick={shareCurrentPage} className="nol-stay-share">Chia sẻ</button>
          </section>
          <section className="nol-stay-body">
            <div className="nol-stay-maincol">
              <section className="nol-stay-review-card" id="reviews">
                <div><strong>4.7</strong><span>584đánh giá</span></div>
                <div className="nol-review-track">
                  {[
                    ["Chất lượng, đóng gói và giao hàng đều tốt. Tôi sẽ tiếp tục mua lần sau.", "2026.05.10 · Khách đã mua"],
                    ["Sản phẩm đúng mô tả, đóng gói gọn gàng.", "2026.05.08 · Khách gia đình"],
                    ["Ảnh thật đẹp, hương vị ổn và giao nhanh hơn dự kiến.", "2026.05.06 · Khách đã mua"],
                    ["Tư vấn rõ ràng, đóng gói chắc chắn, phù hợp làm quà.", "2026.05.03 · Thành viên NOL"],
                    ["Giá hợp lý so với chất lượng, sẽ đặt thêm khi dùng hết.", "2026.04.29 · Khách đã mua"],
                    ["Sản phẩm nhận được nguyên vẹn, tem nhãn và hạn dùng rõ.", "2026.04.26 · Khách mới"],
                  ].map(([content, meta]) => <article key={content}><b>★★★★★</b><p>{content}</p><small>{meta}</small></article>)}
                </div>
              </section>
              <section className="nol-stay-info-section">
                <h2>Thông tin sản phẩm</h2>
                <dl><dt>Danh mục</dt><dd>{viCategory(managedItem?.categoryText || "Sản phẩm")}</dd><dt>Trạng thái bán</dt><dd>{managedItem?.totalInventory === 0 ? "Cần liên hệ" : "Đang bán"}</dd><dt>Thời gian</dt><dd>{detailItem.period}</dd></dl>
              </section>
              <section className="commerce-description nol-stay-description">
                <h2>Giới thiệu sản phẩm</h2>
                {descriptionHtml ? <div className="rich-content product-rich" dangerouslySetInnerHTML={{ __html: descriptionHtml }} /> : <p>{detailItem.venue}</p>}
              </section>
              <section className="nol-related-products">
                <div className="nol-related-head">
                  <h2>Sản phẩm tương tự</h2>
                  <a href="/shop">Xem tất cả</a>
                </div>
                <div className="nol-related-slider">
                  <button type="button" aria-label="Sản phẩm trước" onClick={() => relatedTrackRef.current?.scrollBy({ left: -360, behavior: "smooth" })}>‹</button>
                  <div className="nol-related-track" ref={relatedTrackRef}>
                    {relatedProducts.map((item, index) => <a href={productHref(item)} key={`${item.id || item.title}-${index}`}><figure><img src={item.image} alt="" /></figure><span>{viCategory((item as TicketItem & { category?: string; categoryText?: string }).categoryText || (item as TicketItem & { category?: string; categoryText?: string }).category || item.venue || "Sản phẩm")}</span><h3>{viProduct(item.title)}</h3><p>{viText(item.venue)}</p><strong>{item.price || "Liên hệ"}</strong></a>)}
                  </div>
                  <button type="button" aria-label="Sản phẩm tiếp theo" onClick={() => relatedTrackRef.current?.scrollBy({ left: 360, behavior: "smooth" })}>›</button>
                </div>
              </section>
            </div>
            <aside className="nol-stay-reservation">
              <div className="nol-stay-pricebox"><span>Giá cho 1 sản phẩm</span><strong>{selectedPrice}</strong></div>
              {variants.length ? <div className="nol-stay-room-options"><h2>Chọn tùy chọn</h2>{variants.slice(0, 6).map((variant, index) => <button key={variant.id || `${variant.title}-${index}`} type="button" className={index === selectedVariantIndex ? "active" : ""} onClick={() => setSelectedVariantIndex(index)}><span>{viText(variant.title)}</span><b>{variant.priceText || formatVndPrice(variant.salePrice ?? variant.price ?? variant.unitPrice) || detailItem.price}</b></button>)}</div> : null}
              <dl><dt>Ngày bắt đầu</dt><dd>2026.05.10</dd><dt>Số lượng</dt><dd>1 sản phẩm</dd><dt>Danh mục</dt><dd>{viCategory(managedItem?.categoryText || "Sản phẩm")}</dd></dl>
              {!loaded ? <p>Đang tải thông tin sản phẩm</p> : null}
              <div className="nol-stay-actions"><button type="button" onClick={goToCheckout}>Đặt ngay</button><button type="button" onClick={() => addItemToCart(selectedCartItem)}>Giỏ hàng</button></div>
            </aside>
          </section>
        </main>
        <SiteFooter />
      </div>
      <main className="utility-mobile product-mobile commerce-product-mobile">
        <MobileTopBar title={`${detailItem.title} | NOL`} />
        <div className="commerce-main-image"><img src={heroImage} alt={detailItem.title} /></div>
        {gallery.length > 1 ? <div className="commerce-thumbs">{gallery.map((image, index) => <button key={`${image.url}-${index}`} type="button" className={index === activeImage ? "active" : ""} onClick={() => setActiveImage(index)}><img src={image.url} alt="" /></button>)}</div> : null}
        <section className="commerce-buybox">
          <div className="commerce-category-line">{viCategory(managedItem?.categoryText || detailItem.period)}</div>
          <h1>{detailItem.title}</h1>
          {managedItem?.shortDescription ? <p className="commerce-short">{managedItem.shortDescription}</p> : null}
          <strong className="commerce-price">{detailItem.price}</strong>
          <div className="commerce-actions"><button type="button" onClick={() => addItemToCart(selectedCartItem)}>Thêm vào giỏ</button><button type="button" className="secondary" onClick={goToCheckout}>Mua ngay</button></div>
        </section>
        <section className="commerce-description">
          <h2>Mô tả sản phẩm</h2>
          {descriptionHtml ? <div className="rich-content product-rich" dangerouslySetInnerHTML={{ __html: descriptionHtml }} /> : <p>{detailItem.venue}</p>}
        </section>
        <SiteFooter />
      </main>
    </>
  );
}

export function NoticeDetailPage() {
  return (
    <>
      <div className="utility-desktop">
        <SiteHeader />
        <main className="notice-detail content-width">
          <section className="notice-detail-hero" style={{ backgroundImage: `url(${notice.image})` }}>
            <img src={notice.image} alt="" />
          </section>
          <aside className="notice-side">
            <h2>Lịch mở bán</h2>
            <div className="notice-open-card"><span>Ngày mở bán thường</span><b>{notice.date}</b><em>D-3</em></div>
            <div className="notice-open-card"><span>Ưu đãi đặt sớm</span><b>{notice.date}</b><em>D-3</em></div>
            <button type="button" onClick={goToCheckout}>Đặt vé ngay</button>
            <button type="button" className="share" onClick={shareCurrentPage}>Chia sẻ</button>
          </aside>
          <section className="notice-desktop-info">
            <h1>{notice.title}</h1>
            <dl>
              <dt>Lịch diễn</dt><dd>{notice.period}</dd>
              <dt>Địa điểm</dt><dd>{notice.venue}</dd>
              <dt>Độ tuổi</dt><dd>{notice.age}</dd>
            </dl>
          </section>
          <section className="notice-body">
            <h2>Thông tin biểu diễn</h2>
            <p>- Thời gian biểu diễn: Thứ Ba - Chủ nhật, 10:00 - 18:00, ngừng nhận khách lúc 17:00</p>
            <p>- Địa điểm biểu diễn: Trung tâm nghệ thuật Gangdong, Artlang tầng 1-3</p>
            <p>- Giá vé: Người lớn 15.000đ / trẻ em 13.000đ</p>
            <h2>Thông tin ưu đãi</h2>
            <p>Ưu đãi đặt sớm 50%, ưu đãi thành viên 30%, ưu đãi cư dân 20%</p>
          </section>
        </main>
        <SiteFooter />
      </div>
      <main className="utility-mobile notice-mobile">
        <section className="notice-mobile-hero">
          <img src={notice.image} alt="" />
          <h1>{notice.title}</h1>
        </section>
        <section className="notice-mobile-info">
          <h2>{notice.title}</h2>
          <div className="notice-date-cards">
            <article><span>Ngày mở bán thường</span><b>{notice.date}</b><em>D-3</em></article>
            <article><span>Ưu đãi đặt sớm</span><b>{notice.date}</b><em>D-3</em></article>
          </div>
          <dl>
            <dt>Lịch diễn</dt><dd>{notice.period}</dd>
            <dt>Địa điểm</dt><dd>{notice.venue}</dd>
            <dt>Độ tuổi</dt><dd>{notice.age}</dd>
          </dl>
          <h3>Thông tin biểu diễn</h3>
          <p>- Thời gian biểu diễn: Thứ Ba - Chủ nhật, 10:00 - 18:00, ngừng nhận khách lúc 17:00</p>
          <p>- Giá vé: Người lớn 15.000đ / trẻ em 13.000đ</p>
        </section>
        <button type="button" onClick={goToCheckout} className="notice-mobile-cta">Đặt vé ngay</button>
        <SiteFooter />
      </main>
    </>
  );
}

export function CategoryIndexPage() {
  return <UtilityShell title="Danh mục"><CategoryGrid /></UtilityShell>;
}

function CategoryGrid() {
  return (
    <section className="category-index-grid">
      {categoryIcons.map(([label, icon]) => (
        <a key={label} href={categoryHref[label] ?? "/contents/category"}>
          <img src={icon} alt="" />
          <span>{label}</span>
        </a>
      ))}
    </section>
  );
}

export function SearchPage() {
  const [keyword, setKeyword] = useState("");
  useEffect(() => {
    setKeyword(new URLSearchParams(window.location.search).get("keyword") ?? "");
  }, []);
  const results = useMemo(() => {
    const query = keyword.trim().toLowerCase();
    if (!query) return rankingItems;
    return rankingItems.filter((item) => `${item.title} ${item.venue} ${item.period}`.toLowerCase().includes(query));
  }, [keyword]);
  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = String(new FormData(event.currentTarget).get("keyword") ?? "").trim();
    setKeyword(query);
    window.history.pushState(null, "", query ? `/contents/search?keyword=${encodeURIComponent(query)}` : "/contents/search");
  }
  return (
    <UtilityShell title="Tìm kiếm">
      <section className="search-template">
        <form className="search-field" onSubmit={submitSearch}><input name="keyword" aria-label="Từ khóa" placeholder="Nhập từ khóa tìm kiếm" value={keyword} onChange={(event) => setKeyword(event.currentTarget.value)} /><button type="submit">Tìm kiếm</button></form>
        {keyword && results.length === 0 ? <p className="empty-copy">Không có sản phẩm đang bán hoặc sắp mở cho "{keyword}".</p> : null}
        <h2>Thông tin nổi bật</h2>
        <div className="search-popular">{results.slice(0, 10).map((item) => <ProductTile key={item.title} item={item} />)}</div>
      </section>
    </UtilityShell>
  );
}

function ProductTile({ item }: { item: typeof rankingItems[number] }) {
  return <article className="utility-product-tile"><img src={item.image} alt="" /><h3>{item.title}</h3><p>{item.venue}</p></article>;
}

export function GuideManualPage() {
  return (
    <UtilityShell title="Hướng dẫn bán vé">
      <section className="guide-page">
        <h2>Nếu lần đầu bán vé, bạn vẫn có thể bắt đầu dễ dàng.</h2>
        <p>Thông tin quy trình bán vé và người phụ trách được trình bày rõ ràng.</p>
        {["Tư vấn bán hàng", "Ký hợp đồng", "Đăng sản phẩm", "Bắt đầu bán"].map((step, index) => (
          <article key={step}><b>{index + 1}</b><div><h3>{step}</h3><p>Chúng tôi kiểm tra thông tin sản phẩm và hướng dẫn quy trình đăng bán.</p></div></article>
        ))}
      </section>
    </UtilityShell>
  );
}

export function MyPage() {
  return (
    <UtilityShell title="Tài khoản">
      <section className="mypage-template">
        <div className="login-panel"><h2>Cần đăng nhập</h2><p>Đăng nhập để xem đơn hàng, mục yêu thích và thông tin vé.</p><button>Đăng nhập</button></div>
        <div className="mypage-menu"><a href="/order-lookup">Tra cứu đơn hàng</a>{["Yêu thích", "Tin vé", "Mã giảm giá"].map((item) => <a key={item}>{item}</a>)}</div>
      </section>
    </UtilityShell>
  );
}

type StoredCartItem = { product_id: string; variant_id?: string; quantity: number };
type NormalizedCartItem = StoredCartItem & { title: string; variant_title?: string; image_url?: string; unit_price: number; line_total: number; currency_code: string };
const CART_KEY = "nol-commerce-cart";

function formatVnd(value: number) {
  return `${Math.round(value).toLocaleString("vi-VN")}đ`;
}

function readStoredCart(): StoredCartItem[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    return Array.isArray(parsed) ? parsed.filter((item) => item.product_id) : [];
  } catch {
    return [];
  }
}

function writeStoredCart(items: StoredCartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

async function normalizeCart(items: StoredCartItem[]) {
  const response = await fetch("/nol-template-data/commerce-cart", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items }),
  });
  if (!response.ok) throw new Error("Không tải được giỏ hàng");
  return response.json() as Promise<{ items: NormalizedCartItem[]; total: number; currency_code: string }>;
}

export function CartPage() {
  const [cart, setCart] = useState<{ items: NormalizedCartItem[]; total: number } | null>(null);
  const [message, setMessage] = useState("");

  async function loadCart() {
    try {
      const normalized = await normalizeCart(readStoredCart());
      setCart({ items: normalized.items, total: normalized.total });
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Không tải được giỏ hàng");
    }
  }

  useEffect(() => { loadCart(); }, []);

  function updateQuantity(item: NormalizedCartItem, quantity: number) {
    const next = readStoredCart().map((stored) => stored.product_id === item.product_id && stored.variant_id === item.variant_id ? { ...stored, quantity: Math.max(1, quantity) } : stored);
    writeStoredCart(next);
    loadCart();
  }

  function removeItem(item: NormalizedCartItem) {
    const next = readStoredCart().filter((stored) => !(stored.product_id === item.product_id && stored.variant_id === item.variant_id));
    writeStoredCart(next);
    loadCart();
  }

  const itemCount = cart?.items.reduce((sum, item) => sum + item.quantity, 0) ?? 0;

  return (
    <UtilityShell title="Giỏ hàng">
      <section className="yanolja-cart-page">
        <div className="cart-heading"><h2>Giỏ hàng</h2><p>{itemCount ? `${itemCount} sản phẩm đã chọn` : "Lưu sản phẩm muốn mua và thanh toán khi sẵn sàng."}</p></div>
        {message ? <p className="empty-copy">{message}</p> : null}
        <div className="cart-layout">
          <div className="cart-list-panel">
            {!cart ? <p className="cart-loading">Đang tải giỏ hàng...</p> : cart.items.length === 0 ? <div className="cart-empty"><strong>Giỏ hàng trống</strong><p>Hãy thêm sản phẩm yêu thích để tiếp tục đặt hàng.</p><a href="/shop">Tiếp tục mua sắm</a></div> : cart.items.map((item) => (
              <article className="cart-line" key={`${item.product_id}-${item.variant_id ?? "default"}`}>
                <label><input type="checkbox" defaultChecked aria-label="Chọn sản phẩm" /></label>
                <img src={item.image_url || product.poster} alt="" />
                <div className="cart-line-info"><h3>{viProduct(item.title)}</h3><p>{viText(item.variant_title || "Tùy chọn mặc định")}</p><strong>{formatVnd(item.unit_price)}</strong></div>
                <div className="cart-qty"><button type="button" onClick={() => updateQuantity(item, item.quantity - 1)} aria-label="Giảm">-</button><span>{item.quantity}</span><button type="button" onClick={() => updateQuantity(item, item.quantity + 1)} aria-label="Tăng">+</button></div>
                <b>{formatVnd(item.line_total)}</b>
                <button className="cart-remove" type="button" onClick={() => removeItem(item)}>Xóa</button>
              </article>
            ))}
          </div>
          <aside className="cart-summary-panel"><h3>Tóm tắt đơn hàng</h3><dl><dt>Sản phẩm</dt><dd>{itemCount}</dd><dt>Tạm tính</dt><dd>{formatVnd(cart?.total ?? 0)}</dd><dt>Phí vận chuyển</dt><dd>Miễn phí</dd></dl><div><span>Tổng thanh toán</span><strong>{formatVnd(cart?.total ?? 0)}</strong></div><a className={cart?.items.length ? "" : "disabled"} href={cart?.items.length ? "/checkout" : "#"}>Tiến hành đặt hàng</a></aside>
        </div>
      </section>
    </UtilityShell>
  );
}

export function CheckoutPage() {
  const [cart, setCart] = useState<{ items: NormalizedCartItem[]; total: number } | null>(null);
  const [customer, setCustomer] = useState({ name: "", phone: "", email: "" });
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "bank_transfer" | "mock_success">("cod");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    normalizeCart(readStoredCart()).then((normalized) => setCart({ items: normalized.items, total: normalized.total })).catch((error) => setMessage(error instanceof Error ? error.message : "Không tải được checkout"));
  }, []);

  async function submitOrder() {
    setLoading(true);
    setMessage("");
    try {
      const items = readStoredCart();
      const response = await fetch("/nol-template-data/commerce-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, customer, payment_method: paymentMethod }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.message || "Checkout failed");
      writeStoredCart([]);
      setMessage(`Đặt hàng thành công: ${payload.order.order_number}`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Checkout failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <UtilityShell title="Thanh toán">
      <section className="checkout-page">
        <div><h2>Thông tin người đặt</h2><input placeholder="Họ tên" value={customer.name} onChange={(event) => setCustomer({ ...customer, name: event.currentTarget.value })} /><input placeholder="Số điện thoại" value={customer.phone} onChange={(event) => setCustomer({ ...customer, phone: event.currentTarget.value })} /><input placeholder="Email" value={customer.email} onChange={(event) => setCustomer({ ...customer, email: event.currentTarget.value })} /></div>
        <div><h2>Phương thức thanh toán</h2><button type="button" className={paymentMethod === "cod" ? "active" : ""} onClick={() => setPaymentMethod("cod")}>COD</button><button type="button" className={paymentMethod === "bank_transfer" ? "active" : ""} onClick={() => setPaymentMethod("bank_transfer")}>Bank transfer</button><button type="button" className={paymentMethod === "mock_success" ? "active" : ""} onClick={() => setPaymentMethod("mock_success")}>Mock success</button></div>
        <aside><span>Tổng thanh toán</span><b>{formatVnd(cart?.total ?? 0)}</b><button type="button" disabled={loading || !cart?.items.length} onClick={submitOrder}>{loading ? "Processing..." : "Thanh toán"}</button>{message ? <p>{message}</p> : null}</aside>
      </section>
    </UtilityShell>
  );
}


type LookupOrderItem = {
  id?: string;
  title?: string;
  variant_title?: string;
  image_url?: string;
  quantity?: number;
  unit_price?: number;
  line_total?: number;
};

type LookupOrder = {
  order_number: string;
  status?: string;
  payment_status?: string;
  fulfillment_status?: string;
  customer_name?: string;
  customer_phone?: string;
  customer_email?: string;
  currency_code?: string;
  subtotal?: number;
  total?: number;
  created_at?: string;
  items?: LookupOrderItem[];
};

function viOrderStatus(status?: string) {
  const map: Record<string, string> = {
    confirmed: "Đã xác nhận",
    pending: "Chờ xử lý",
    paid: "Đã thanh toán",
    awaiting_transfer: "Chờ chuyển khoản",
    canceled: "Đã hủy",
    not_fulfilled: "Chưa giao hàng",
    fulfilled: "Đã giao hàng",
  };
  return map[String(status || "")] || viText(status || "Đang xử lý");
}

export function OrderLookupPage() {
  const [form, setForm] = useState({ orderNumber: "", identity: "" });
  const [order, setOrder] = useState<LookupOrder | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function lookupOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    setOrder(null);
    const identity = form.identity.trim();
    try {
      const response = await fetch("/nol-template-data/commerce-orders/lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          order_number: form.orderNumber,
          phone: identity.includes("@") ? "" : identity,
          email: identity.includes("@") ? identity : "",
        }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.message || "Không tra cứu được đơn hàng");
      setOrder(payload.order as LookupOrder);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Không tra cứu được đơn hàng");
    } finally {
      setLoading(false);
    }
  }

  return (
    <UtilityShell title="Tra cứu đơn hàng">
      <section className="order-lookup-page">
        <header>
          <p>Tra cứu nhanh</p>
          <h1>Thông tin đơn hàng</h1>
          <span>Nhập mã đơn hàng và số điện thoại hoặc email đã dùng khi đặt hàng.</span>
        </header>
        <form className="order-lookup-form" onSubmit={lookupOrder}>
          <label><span>Mã đơn hàng</span><input value={form.orderNumber} onChange={(event) => setForm({ ...form, orderNumber: event.currentTarget.value })} placeholder="Ví dụ: NOL00000001" /></label>
          <label><span>Số điện thoại hoặc email</span><input value={form.identity} onChange={(event) => setForm({ ...form, identity: event.currentTarget.value })} placeholder="SĐT hoặc email đặt hàng" /></label>
          <button type="submit" disabled={loading}>{loading ? "Đang tra cứu..." : "Tra cứu"}</button>
        </form>
        {message ? <p className="order-lookup-message">{message}</p> : null}
        {order ? <article className="order-lookup-result">
          <div className="order-lookup-summary">
            <div><span>Mã đơn</span><strong>{order.order_number}</strong></div>
            <div><span>Trạng thái</span><strong>{viOrderStatus(order.status)}</strong></div>
            <div><span>Thanh toán</span><strong>{viOrderStatus(order.payment_status)}</strong></div>
            <div><span>Giao hàng</span><strong>{viOrderStatus(order.fulfillment_status)}</strong></div>
          </div>
          <div className="order-lookup-customer">
            <h2>Người nhận</h2>
            <p>{order.customer_name || "Khách hàng"}</p>
            <p>{order.customer_phone || order.customer_email || "-"}</p>
            {order.created_at ? <time>Ngày đặt: {new Date(order.created_at).toLocaleString("vi-VN")}</time> : null}
          </div>
          <div className="order-lookup-items">
            <h2>Sản phẩm</h2>
            {(order.items || []).map((item, index) => <section key={item.id || `${item.title}-${index}`}>
              <img src={item.image_url || "/assets/ranking/ranking-01.gif"} alt="" />
              <div><h3>{viProduct(item.title || "Sản phẩm")}</h3><p>{viText(item.variant_title || "Tùy chọn mặc định")}</p><span>Số lượng: {item.quantity || 1}</span></div>
              <strong>{formatVnd(Number(item.line_total ?? item.unit_price ?? 0))}</strong>
            </section>)}
          </div>
          <footer><span>Tổng thanh toán</span><strong>{formatVnd(Number(order.total ?? order.subtotal ?? 0))}</strong></footer>
        </article> : null}
      </section>
    </UtilityShell>
  );
}

export function InfoPage({ page, type }: { page?: CmsPage; type: "about" | "contact" }) {
  const isContact = type === "contact";
  const title = viText(page?.title ?? (isContact ? "Trung tâm hỗ trợ" : "Giới thiệu"));
  const heading = viText(page?.heading ?? (isContact ? "Trung tâm hỗ trợ NOL Ticket" : "NOL Ticket"));
  const excerpt = viText(page?.excerpt ?? (isContact ? "Chọn loại yêu cầu để được hỗ trợ nhanh." : "Nền tảng đặt vé cho biểu diễn, triển lãm, thể thao và giải trí."));
  const bodyHtml = page?.bodyHtml;

  return (
    <UtilityShell title={title}>
      <section className="info-page">
        <h2>{heading}</h2>
        <p>{excerpt}</p>
        {bodyHtml ? <div dangerouslySetInnerHTML={{ __html: viHtml(bodyHtml) }} /> : <div>{(isContact ? ["Liên hệ 1:1", "Thông báo", "Hướng dẫn bán"] : ["Giới thiệu dịch vụ", "Đối tác", "Thương hiệu"]).map((item) => <article key={item}>{item}</article>)}</div>}
      </section>
    </UtilityShell>
  );
}


function TikTokLandingPage({ page }: { page: CmsPage }) {
  const landing = page.landing ?? {};
  const ctaHref = landing.ctaHref || (landing.productHandle ? `/goods/${landing.productHandle}` : "/cart");
  const productLookup = landing.productHandle || ctaHref.match(/\/goods\/([^/?#]+)/)?.[1] || "";
  const [landingProduct, setLandingProduct] = useState<CommerceDetail | null>(null);
  const [activeHeroImage, setActiveHeroImage] = useState(0);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [dragOffsetX, setDragOffsetX] = useState(0);

  useEffect(() => {
    if (!productLookup) return;
    let active = true;
    async function loadLandingProduct() {
      try {
        const response = await fetch(`/nol-template-data/commerce-products/${encodeURIComponent(productLookup)}`, { cache: "no-store" });
        if (!response.ok) return;
        const payload = await response.json();
        const product = payload?.product;
        if (!product || !active) return;
        setLandingProduct({
          id: product.id,
          variantId: product.variantId,
          currencyCode: product.currencyCode,
          unitPrice: product.unitPrice,
          title: product.title,
          venue: product.shortDescription || product.categoryText || "TikTok Shop",
          period: product.categoryText || "Sản phẩm",
          image: product.image,
          images: Array.isArray(product.images) ? product.images : [],
          variants: Array.isArray(product.variants) ? product.variants : [],
          options: Array.isArray(product.options) ? product.options : [],
          price: product.price,
          description: product.description || "",
          shortDescription: product.shortDescription || "",
          categories: product.categories || [],
          categoryText: product.categoryText || "",
          totalInventory: product.totalInventory,
          metadata: product.metadata || {},
        });
        setActiveHeroImage(0);
        setSelectedVariantIndex(0);
      } catch {
        if (active) setLandingProduct(null);
      }
    }
    loadLandingProduct();
    return () => { active = false; };
  }, [productLookup]);

  const fallbackImage = landing.productImage || landing.heroImage || landingProduct?.image || product.poster;
  const landingGallery = Array.isArray(landing.galleryImages) ? landing.galleryImages.filter(Boolean).map((url) => ({ url })) : [];
  const productGallery = (landingGallery.length ? landingGallery : landingProduct?.images?.length ? landingProduct.images : [{ url: fallbackImage }]).filter((item) => item.url);
  const gallery = productGallery.length ? productGallery : [{ url: fallbackImage }];
  const gallerySlides = [
    ...gallery.map((item) => ({ type: "image" as const, url: item.url, poster: undefined as string | undefined })),
    ...(landing.heroVideo ? [{ type: "video" as const, url: landing.heroVideo, poster: gallery[0]?.url || fallbackImage }] : []),
  ];
  const currentHeroIndex = Math.min(activeHeroImage, Math.max(gallerySlides.length - 1, 0));
  const image = gallerySlides[currentHeroIndex]?.type === "image" ? gallerySlides[currentHeroIndex]?.url : gallery[0]?.url || fallbackImage;
  const highlights = landing.highlights?.length ? landing.highlights : ["Luồng gió mạnh", "Góc gập lên đến 100 độ", "100 mức tốc độ gió", "Dây đeo có rảnh tay"];
  const reviews = landing.reviews?.length ? landing.reviews : ["Thanh toán bảo mật", "Quyền riêng tư về dữ liệu", "Đảm bảo hoàn tiền", "Cam kết giao hàng", "Hỗ trợ 24/7 trong ứng dụng"];
  const headerTitle = landing.headerTitle || "TikTok Shop";
  const footerText = landing.footerText || "© Special Shop. Landing page bán hàng độc lập.";
  const variants = landingProduct?.variants?.filter((variant) => variant.title) ?? [];
  const selectedVariant = variants[Math.min(selectedVariantIndex, Math.max(variants.length - 1, 0))];
  const optionTitle = viText(landingProduct?.options?.[0]?.title || "Lựa chọn");
  const selectedVariantTitle = viText(selectedVariant?.title || "Màu Hồng");
  const displayTitle = viProduct(landing.productTitle || landingProduct?.title || page.heading);
  const displaySubtitle = viText(landing.productSubtitle || landingProduct?.shortDescription || page.excerpt);
  const displayPrice = selectedVariant?.priceText || landing.productPrice || landingProduct?.price || "đ299.000";
  const recommended = rankingItems.concat(rankingItems).slice(0, 18);
  const moveHero = (direction: 1 | -1) => {
    if (!gallerySlides.length) return;
    setActiveHeroImage((current) => (current + direction + gallerySlides.length) % gallerySlides.length);
  };
  const finishHeroDrag = () => {
    if (dragStartX === null) return;
    const offset = dragOffsetX;
    if (offset > 36) moveHero(-1);
    else if (offset < -36) moveHero(1);
    else moveHero(1);
    setDragStartX(null);
    setDragOffsetX(0);
  };
  return (
    <main className="tt-shop-shell">
      <header className="tt-shop-topbar">
        <button type="button" className="tt-shop-back" aria-label="Quay lại" onClick={goBack}><svg fill="currentColor" viewBox="0 0 48 48" aria-hidden="true"><path d="m20.24 24 13.17-13.17a1 1 0 0 0 0-1.42L30.6 6.6a1 1 0 0 0-1.42 0L12.82 22.94a1.5 1.5 0 0 0 0 2.12l16.35 16.35a1 1 0 0 0 1.42 0l2.82-2.82a1 1 0 0 0 0-1.42L20.24 24Z" /></svg></button>
        <a href="/" className="tt-shop-logo" aria-label={headerTitle}>{landing.headerLogo ? <img src={landing.headerLogo} alt="" /> : <img src="https://sf16-website.neutral.ttwstatic.com/obj/tiktok_web_static/i18n_ecom_fe/tiktok_shop_web_mono/packages/apps/pdp_h5/static/image/tts-logo-light.28ce4ad8.png" alt="TikTok Shop Vietnam" />}</a>
        <form className="tt-shop-search" action="/contents/search"><div><svg fill="currentColor" viewBox="0 0 48 48" aria-hidden="true"><path fillRule="evenodd" clipRule="evenodd" d="M21.83 7.5a14.34 14.34 0 1 1 0 28.68 14.34 14.34 0 0 1 0-28.68Zm0-4a18.33 18.33 0 1 0 11.48 32.64l8.9 8.9a1 1 0 0 0 1.42 0l1.4-1.41a1 1 0 0 0 0-1.42l-8.89-8.9A18.34 18.34 0 0 0 21.83 3.5Z" /></svg><input name="q" type="search" aria-label="Tìm kiếm" /></div><button type="submit">Tìm kiếm</button></form>
        <a className="tt-shop-cart" href="/cart" aria-label="Giỏ hàng"><svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="M14 14h27l-3 16H17L14 14Z" stroke="currentColor" strokeWidth="4" strokeLinejoin="round"/><path d="M14 14 12 7H5" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/><circle cx="19" cy="39" r="3" fill="currentColor"/><circle cx="35" cy="39" r="3" fill="currentColor"/></svg><i /></a>
      </header>

      <section className="tt-shop-hero">
        <div className="slick-slider slick-initialized" dir="ltr">
          <div className="slick-list" onPointerDown={(event) => { setDragStartX(event.clientX); setDragOffsetX(0); }} onPointerMove={(event) => { if (dragStartX !== null) setDragOffsetX(event.clientX - dragStartX); }} onPointerUp={finishHeroDrag} onPointerCancel={finishHeroDrag}>
            <div className="slick-track" style={{ width: `${gallerySlides.length * 100}%`, opacity: 1, transform: `translate3d(calc(-${currentHeroIndex * (100 / gallerySlides.length)}% + ${dragOffsetX}px), 0px, 0px)`, transition: dragStartX === null ? undefined : "none" }}>
              {gallerySlides.map((slide, index) => <div key={`${slide.url}-${index}`} data-index={index} className={index === currentHeroIndex ? "slick-slide slick-active slick-current" : "slick-slide"} tabIndex={-1} aria-hidden={index !== currentHeroIndex} style={{ outline: "none", width: `${100 / gallerySlides.length}%` }}><div><div className="w-full" tabIndex={-1} style={{ width: "100%", display: "inline-block" }}><div className={slide.type === "video" ? "relative flex w-full items-center justify-center" : "relative"}>{slide.type === "video" ? <><video className="flex-none object-contain w-full max-h-full" style={{ aspectRatio: 16 / 9 }} controls preload="none" src={slide.url} poster={slide.poster} muted autoPlay /><div className="tt-gallery-play" aria-hidden="true"><svg fill="currentColor" viewBox="0 0 48 48"><path d="M45.08 25.84a4.5 4.5 0 0 0 0-3.67 4.82 4.82 0 0 0-1.75-1.91c-.7-.5-1.64-1.04-2.78-1.69L18.87 6.14c-1.12-.65-2.06-1.19-2.83-1.54a4.82 4.82 0 0 0-2.52-.55 4.5 4.5 0 0 0-3.16 1.84c-.53.73-.7 1.6-.78 2.45-.08.85-.08 1.93-.08 3.22v24.88c0 1.3 0 2.37.08 3.22.08.86.25 1.73.78 2.45a4.5 4.5 0 0 0 3.16 1.84c.9.1 1.74-.2 2.52-.55.77-.35 1.7-.89 2.83-1.53l21.68-12.44c1.14-.65 2.08-1.2 2.78-1.69.7-.5 1.38-1.08 1.75-1.9Z" /></svg></div></> : <img className="flex-none object-contain aspect-square items-center justify-center w-full" src={slide.url} alt={displayTitle} title={displayTitle} loading={index === 0 ? "eager" : "lazy"} width="100%" height="100%" />}<div className="tt-gallery-count"><span>{index + 1} / {gallerySlides.length}</span></div></div></div></div></div>)}
            </div>
          </div>
          <div className="tt-gallery-current" aria-live="polite"><span>{currentHeroIndex + 1} / {gallerySlides.length}</span></div>
          <div className="tt-gallery-dots" aria-label="Chọn ảnh sản phẩm">{gallerySlides.map((slide, index) => <button key={`gallery-dot-${slide.url}-${index}`} type="button" className={index === currentHeroIndex ? "active" : ""} aria-label={`Ảnh ${index + 1}`} onClick={() => setActiveHeroImage(index)} />)}</div>
        </div>
      </section>

      <section className="tt-shop-product">
        <div className="tt-shop-price"><span>-50%</span><strong>{displayPrice}</strong>{landing.productComparePrice ? <del>{landing.productComparePrice}</del> : <del>599.000đ</del>}</div>
        <h1>{displayTitle}</h1>
        <p className="tt-shop-seller">Sold by {headerTitle}</p>
        <div className="tt-shop-rating"><b>4.7★</b><span>682</span><span>7.5K đã được bán</span><em>Free shipping</em></div>
      </section>

      <section className="tt-shop-variant"><div><b>{optionTitle}</b><span>{selectedVariantTitle} ›</span></div>{variants.length > 1 ? <div className="tt-shop-variant-list">{variants.map((variant, index) => <button key={variant.id || `${variant.title}-${index}`} type="button" className={index === selectedVariantIndex ? "active" : ""} onClick={() => setSelectedVariantIndex(index)}>{viText(variant.title)}</button>)}</div> : null}</section>
      <section className="tt-shop-deals"><div><b>Deals</b><a href="#">See all</a></div><article><strong>No Coupons Available</strong><p>Sorry, none of your coupons apply to this specific product. You can tap “See All” to view all available coupons in TikTok Shop.</p></article></section>
      <section className="tt-shop-cta-note"><p>{landing.trustText || "kiện khi đáp ứng ngưỡng đơn hàng."}</p></section>

      <section className="tt-shop-return"><h2>▣ Dễ dàng trả hàng <span>›</span></h2><p>Hầu hết sản phẩm đều đủ điều kiện <b>trả hàng miễn phí trong 30 ngày kể từ khi giao</b> để được hoàn tiền. Không thể trả lại một số sản phẩm, bao gồm đồ ăn thức uống, sản phẩm vệ sinh và hàng hóa đã qua sử dụng.</p></section>

      <section className="tt-shop-protect"><h2>Gói bảo vệ của TikTok Shop <span>›</span></h2><div>{reviews.map((item, index) => <article key={`${item}-${index}`}><i className={`tt-protect-icon icon-${index % 5}`} aria-hidden="true" /><p>{item}</p></article>)}</div></section>

      <section className="tt-shop-info"><h2>Thông tin về sản phẩm này</h2><h3>Mô tả sản phẩm <span>⌃</span></h3><div className="tt-shop-desc">{highlights.map((item, index) => <p key={`${item}-${index}`}>·{item}: {index === 0 ? "Sản phẩm lý tưởng cho những ngày nắng nóng." : index === 1 ? "Thiết kế linh hoạt, giúp bạn điều chỉnh theo ý muốn." : index === 2 ? "Chọn mức độ gió phù hợp nhu cầu, từ nhẹ nhàng đến mạnh mẽ." : "Thiết kế tiện lợi, dễ mang theo mọi lúc."}</p>)}</div>{page.bodyHtml ? <div className="rich-content" dangerouslySetInnerHTML={{ __html: viHtml(page.bodyHtml) }} /> : null}</section>

      <section className="tt-shop-media">{gallery[0]?.url ? <img src={gallery[0].url} alt="" /> : null}{landing.heroVideo ? <video src={landing.heroVideo} poster={gallery[0]?.url || image} controls playsInline /> : <div className="tt-shop-video"><img src={image} alt="" /><button type="button">▶</button><span>0:00 / 0:19</span></div>}</section>

      <section className="tt-shop-recs"><h2>Bạn cũng có thể thích</h2><div>{recommended.map((item, index) => <a href={productHref(item)} key={`${item.title}-${index}`}><figure><img src={item.image} alt="" /><figcaption>Free shipping</figcaption></figure><p>{viProduct(item.title)}</p><small>{index % 3 === 0 ? "⚡ Flash sale" : "🔥 Deal"}</small><span>{(4.1 + (index % 8) / 10).toFixed(1)} ★ {((index + 3) * 17843).toLocaleString("vi-VN")} sold</span><strong>{item.price || `đ${[67999, 329000, 99000, 69900, 24995, 92650][index % 6].toLocaleString("vi-VN")}`}</strong></a>)}</div></section>

      <footer className="tt-shop-footer"><b>{headerTitle}</b><p>{footerText}</p></footer>
      <a className="tt-shop-buy" href={ctaHref}>{landing.ctaLabel || "Mua ngay"}</a>
    </main>
  );
}

export function CmsContentPage({ page }: { page: CmsPage }) {
  if (page.template === "landing-tiktok") return <TikTokLandingPage page={page} />;
  return (
    <UtilityShell title={viText(page.title)}>
      <article className="cms-content-page">
        <header className="cms-hero">
          <span>NOL CONTENTS</span>
          <h2>{viText(page.heading)}</h2>
          {page.excerpt ? <p>{viText(page.excerpt)}</p> : null}
        </header>
        <div className="rich-content" dangerouslySetInnerHTML={{ __html: viHtml(page.bodyHtml) }} />
      </article>
    </UtilityShell>
  );
}

function categoryName(categories: BlogCategory[] | undefined, slug: string) {
  return categories?.find((item) => item.slug === slug)?.name ?? slug;
}

export function BlogListPage({ category, posts = fallbackBlogPosts as BlogPost[], categories = [] }: { category?: string; posts?: BlogPost[]; categories?: BlogCategory[] }) {
  const published = posts.filter((post) => post.status !== "draft");
  const visiblePosts = category ? published.filter((post) => post.categorySlug === category) : published;
  const featured = visiblePosts[0];
  const categoryLabel = category ? viText(categoryName(categories, category)) : "Bài viết blog";
  return (
    <UtilityShell title={category ? categoryLabel : "Blog"}>
      <section className="blog-page-shell">
        <header className="blog-hero-panel">
          <div>
            <span>NOL MAGAZINE</span>
            <h2>{viText(category ? categoryLabel : "Bài viết blog")}</h2>
            <p>Tin mới, hướng dẫn mua vé, lịch mở bán và nội dung SEO được biên tập cho khách hàng của website.</p>
          </div>
          <nav aria-label="Blog categories">
            <a className={!category ? "active" : ""} href="/blog">Tất cả</a>
            {categories.filter((item) => item.status !== "draft").map((item) => <a key={item.slug} className={category === item.slug ? "active" : ""} href={`/blog/category/${item.slug}`}>{viText(item.name)}</a>)}
          </nav>
        </header>
        {featured ? <a className="blog-featured" href={`/blog/${featured.slug}`}><img src={featured.image} alt="" /><div><span>{viText(categoryName(categories, featured.categorySlug))}</span><h2>{viProduct(featured.title)}</h2><p>{viText(featured.excerpt)}</p><time>{viText(featured.date)}</time></div></a> : <p className="empty-copy">Chưa có bài viết đã xuất bản.</p>}
        <div className="blog-list">
          {visiblePosts.slice(featured ? 1 : 0).map((post) => <a href={`/blog/${post.slug}`} key={post.slug}><img src={post.image} alt="" /><div><span>{viText(categoryName(categories, post.categorySlug))}</span><h2>{viProduct(post.title)}</h2><p>{viText(post.excerpt)}</p><time>{viText(post.date)}</time></div></a>)}
        </div>
      </section>
    </UtilityShell>
  );
}

export function BlogDetailPage({ slug, posts = fallbackBlogPosts as BlogPost[], categories = [] }: { slug: string; posts?: BlogPost[]; categories?: BlogCategory[] }) {
  const published = posts.filter((post) => post.status !== "draft");
  const post = published.find((item) => item.slug === slug) ?? published[0];
  const related = published.filter((item) => item.slug !== post?.slug).slice(0, 3);
  return (
    <UtilityShell title="Blog">
      <article className="blog-detail">
        <header className="blog-detail-head">
          <span>{viText(categoryName(categories, post.categorySlug))}</span>
          <h1>{viProduct(post.title)}</h1>
          <p>{viText(post.excerpt)}</p>
          <time>{viText(post.date)}</time>
        </header>
        <img src={post.image} alt="" />
        <div className="rich-content" dangerouslySetInnerHTML={{ __html: viHtml(post.bodyHtml || "<p>Tổng hợp thông tin sản phẩm, lịch mở bán và ưu đãi trên một màn hình.</p>") }} />
        {related.length ? <aside className="related-posts"><h2>Bài viết liên quan</h2><div>{related.map((item) => <a href={`/blog/${item.slug}`} key={item.slug}><img src={item.image} alt="" /><span>{viProduct(item.title)}</span></a>)}</div></aside> : null}
      </article>
    </UtilityShell>
  );
}


export function LoginPage() {
  return (
    <main className="auth-shell interpark-auth">
      <section className="auth-card">
        <a className="auth-brand" href="/">NOL <b>interpark</b></a>
        <h1>Đăng nhập</h1>
        <form className="auth-form"><label><span>ID hoặc email</span><input autoComplete="username" placeholder="Nhập ID hoặc email" /></label><label><span>Mật khẩu</span><input type="password" autoComplete="current-password" placeholder="Nhập mật khẩu" /></label><label className="auth-check"><input type="checkbox" /> Duy trì đăng nhập</label><button type="button">Đăng nhập</button></form>
        <nav className="auth-links"><a href="/register">Đăng ký</a><a href="#">Tìm ID</a><a href="#">Tìm mật khẩu</a></nav>
        <div className="auth-divider"><span>Hoặc đăng nhập bằng</span></div>
        <div className="auth-social"><button type="button">Kakao</button><button type="button">Naver</button><button type="button">Apple</button></div>
        <a className="guest-order" href="/order-lookup">Tra cứu đơn không cần tài khoản</a>
      </section>
    </main>
  );
}

export function RegisterPage() {
  return (
    <main className="auth-shell yanolja-auth">
      <section className="auth-card register-card">
        <a className="auth-brand" href="/">NOL <b>interpark</b></a>
        <div className="members-badge">NOL Members</div>
        <h1>Bắt đầu với NOL</h1>
        <p>NOL Interpark và các dịch vụ NOL có thể dùng chung một tài khoản.</p>
        <div className="register-social"><button type="button" className="kakao">Tiếp tục với Kakao</button><button type="button" className="naver">Tiếp tục với Naver</button><button type="button">Tiếp tục với Google</button><button type="button">Tiếp tục với Apple</button></div>
        <a className="email-start" href="/login">Bắt đầu bằng email</a>
        <div className="auth-divider"><span>hoặc</span></div>
        <a className="interpark-login" href="/login">Đăng nhập tài khoản Interpark hiện có</a>
        <nav className="auth-links"><a href="#">Tìm ID</a><a href="#">Chính sách riêng tư</a></nav>
      </section>
    </main>
  );
}

function UtilityShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <>
      <div className="utility-desktop"><SiteHeader /><main className="utility-shell content-width"><h1>{title}</h1>{children}</main><SiteFooter /></div>
      <main className="utility-mobile"><MobileTopBar title={viText(title)} search={title === "Danh mục" || title === "Tìm kiếm"} /><div className="utility-mobile-body">{children}</div><SiteFooter /></main>
    </>
  );
}
