import type { CommerceProductsPayload, CommerceListProduct } from "../lib/data/commerce";
import { viCategory, viProduct, viText } from "../lib/i18n/vi";
import { SiteFooter, SiteHeader } from "./TicketLanding";

const sortLabels: Record<string, string> = {
  recommended: "Đề xuất",
  price_asc: "Giá thấp",
  price_desc: "Giá cao",
  newest: "Mới nhất",
  rating: "Đánh giá cao",
};

function productHref(product: Pick<CommerceListProduct, "slug" | "id">) {
  return `/goods/${encodeURIComponent(product.slug || product.id)}`;
}

function queryHref(basePath: string, next: Record<string, string | undefined>) {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(next)) {
    if (value) query.set(key, value);
  }
  const qs = query.toString();
  return qs ? `${basePath}?${qs}` : basePath;
}

function ProductCard({ product }: { product: CommerceListProduct }) {
  return (
    <a className="shop-product-card" href={productHref(product)}>
      <figure><img src={product.image || "/assets/icons/shortcut-01.svg"} alt="" /></figure>
      <div>
        <span>{viCategory(product.categoryText || product.categories?.[0]?.name || "Sản phẩm NOL")}</span>
        <h2>{viProduct(product.title)}</h2>
        {product.shortDescription ? <p>{viText(product.shortDescription)}</p> : <p>Sản phẩm đã được chọn lọc, dễ xem và đặt ngay trên NOL.</p>}
        <div className="shop-card-rating"><b>{Number(product.ratingAverage || 4.7).toFixed(1)}</b><em>đánh giá {Number(product.ratingCount || product.soldCount || 128).toLocaleString("vi-VN")}</em></div>
        <strong>{product.price}</strong>
      </div>
    </a>
  );
}

export default function ShopCategoryPage({ payload, title = "Tour và vé nổi bật", subtitle = "Khám phá các sản phẩm có thể dùng ngay trong chuyến đi.", activeCategory = "", q = "", sort = "recommended", basePath = "/shop" }: { payload: CommerceProductsPayload; title?: string; subtitle?: string; activeCategory?: string; q?: string; sort?: string; basePath?: string }) {
  const activeCategoryName = payload.categories.find((item) => item.slug === activeCategory)?.name;
  const heading = viText(activeCategoryName || title);
  return (
    <>
      <div className="utility-desktop shop-list-desktop">
        <SiteHeader />
        <main className="shop-list-page">
          <nav className="shop-breadcrumb" aria-label="breadcrumb"><a href="/">Trang chủ</a><span>›</span>{activeCategory ? <><a href="/shop">Shop</a><span>›</span><b>{heading}</b></> : <b>Shop</b>}</nav>
          <section className="shop-list-hero">
            <div>
              <span>NOL TRAVEL</span>
              <h1>{heading}</h1>
              <p>{activeCategoryName ? `${viCategory(activeCategoryName)} là danh mục đang được gợi ý.` : subtitle}</p>
            </div>
            <form action={basePath} className="shop-list-search">
              {activeCategory ? <input type="hidden" name="category" value={activeCategory} /> : null}
              <input name="q" defaultValue={q} placeholder="Tìm theo tên, khu vực, từ khóa" />
              <button type="submit">Tìm kiếm</button>
            </form>
          </section>
          <section className="shop-list-toolbar">
            <strong>{payload.count.toLocaleString("vi-VN")} sản phẩm</strong>
            <nav aria-label="sort">
              {Object.entries(sortLabels).map(([key, label]) => <a key={key} className={sort === key ? "active" : ""} href={queryHref(basePath, { category: activeCategory, q, sort: key })}>{label}</a>)}
            </nav>
          </section>
          <div className="shop-list-layout">
            <aside className="shop-filter-panel">
              <div><h2>Bộ lọc</h2><a href={basePath}>Đặt lại</a></div>
              <section><h3>Danh mục</h3><a className={!activeCategory ? "active" : ""} href={queryHref(basePath, { q, sort })}>Tất cả</a>{payload.categories.map((item) => <a key={item.slug} className={activeCategory === item.slug ? "active" : ""} href={queryHref(basePath, { category: item.slug, q, sort })}><span>{viCategory(item.name)}</span><em>{Number(item.product_count || 0).toLocaleString("vi-VN")}</em></a>)}</section>
              <section><h3>Ngày sử dụng</h3><button type="button">Chọn ngày</button></section>
              <section><h3>Khoảng giá</h3><label><input type="checkbox" readOnly /> Dưới 1 triệu</label><label><input type="checkbox" readOnly /> 1 - 2 triệu</label><label><input type="checkbox" readOnly /> Trên 2 triệu</label></section>
            </aside>
            <section className="shop-products-grid">
              {payload.products.length ? payload.products.map((product) => <ProductCard key={product.id} product={product} />) : <div className="shop-empty"><h2>Không có sản phẩm</h2><p>Hãy thử tìm kiếm bằng từ khóa hoặc danh mục khác.</p></div>}
            </section>
          </div>
        </main>
        <SiteFooter />
      </div>
      <main className="utility-mobile shop-list-mobile">
        <header><a href="/">‹</a><h1>{heading}</h1><a href="/cart">Giỏ hàng</a></header>
        <form action={basePath}><input name="q" defaultValue={q} placeholder="Tìm kiếm" />{activeCategory ? <input type="hidden" name="category" value={activeCategory} /> : null}</form>
        <nav>{payload.categories.slice(0, 8).map((item) => <a key={item.slug} className={activeCategory === item.slug ? "active" : ""} href={queryHref(basePath, { category: item.slug, q, sort })}>{viCategory(item.name)}</a>)}</nav>
        <section>{payload.products.map((product) => <ProductCard key={product.id} product={product} />)}</section>
      </main>
    </>
  );
}
