import { SiteFooter, SiteHeader } from "../components/TicketLanding";

export default function NotFound() {
  return (
    <main>
      <SiteHeader />
      <section className="not-found-template content-width">
        <span>404</span>
        <h1>Không tìm thấy trang</h1>
        <p>Địa chỉ đã thay đổi hoặc chưa được chuẩn bị trong template.</p>
        <a href="/">Về trang chủ</a>
      </section>
      <SiteFooter />
    </main>
  );
}
