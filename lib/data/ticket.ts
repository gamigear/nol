import type { Banner, CmsPage, HomepageSection, MenuItem, SiteInfo, TicketItem } from "../types/ticket";

export const homepageSections: HomepageSection[] = [
  { id: "hero", title: "Hero banner", enabled: true },
  { id: "mobileShortcuts", title: "Mobile shortcuts", enabled: true },
  { id: "miniBanners", title: "Mini banners", enabled: true },
  { id: "ranking", title: "Xếp hạng theo thể loại", enabled: true, actionLabel: "Nhạc kịch Xem toàn bộ xếp hạng" },
  { id: "open", title: "Sắp mở bán", enabled: true, actionLabel: "Xem tất cả lịch mở bán" },
  { id: "play", title: "NOL PLAY", enabled: true },
  { id: "discount", title: "Đang giảm giá!", enabled: true },
  { id: "mdPick", title: "MD Pick!", enabled: true },
  { id: "keyword", title: "Từ khóa gợi ý", enabled: true },
  { id: "promo", title: "Review banner", enabled: true },
  { id: "review", title: "Đánh giá nổi bật", enabled: true, actionLabel: "Xem thêm đánh giá" },
  { id: "bottomPromo", title: "Bottom promo banners", enabled: true },
]

export const cmsPages: CmsPage[] = [
  { id: "about", path: "/about", title: "Giới thiệu", heading: "NOL Ticket", excerpt: "Nền tảng đặt vé cho biểu diễn, triển lãm, thể thao và giải trí.", bodyHtml: "<div><article>Giới thiệu dịch vụ</article><article>Đối tác</article><article>Thương hiệu</article></div>", status: "published", seoTitle: "Giới thiệu | NOL Ticket", seoDescription: "NOL Ticket Giới thiệu dịch vụ" },
  { id: "contact", path: "/contact", title: "Trung tâm hỗ trợ", heading: "Trung tâm hỗ trợ NOL Ticket", excerpt: "Chọn loại yêu cầu để được hỗ trợ nhanh.", bodyHtml: "<div><article>Liên hệ 1:1</article><article>Thông báo</article><article>Hướng dẫn bán</article></div>", status: "published", seoTitle: "Trung tâm hỗ trợ | NOL Ticket", seoDescription: "Trung tâm hỗ trợ NOL Ticket" },
  { id: "sales-guide", path: "/contents/guide/manual", title: "Hướng dẫn bán vé", heading: "Nếu lần đầu bán vé, bạn vẫn có thể bắt đầu dễ dàng.", excerpt: "Thông tin quy trình bán vé và người phụ trách được trình bày rõ ràng.", bodyHtml: "<p>판매 등록, 검수, 오픈, 정산까지 필요한 정보를 확인하실 수 있습니다.</p>", status: "published", seoTitle: "Hướng dẫn bán vé | NOL Ticket", seoDescription: "Vé Hướng dẫn bán" },
  { id: "special-honey", path: "/landing/mat-ong-sam-nam", title: "Mật ong ngâm Sâm Nam", heading: "Mật ong ngâm Sâm Nam", excerpt: "Landing giới thiệu sản phẩm đặc biệt theo phong cách TikTok Shop.", bodyHtml: "", status: "published", template: "landing-tiktok", seoTitle: "Mật ong ngâm Sâm Nam", seoDescription: "Landing giới thiệu sản phẩm đặc biệt", landing: { badge: "Đặc biệt hôm nay", heroImage: "https://pub-7dc36aa0ebc1408d8e9efa4d71fbc663.r2.dev/food/xinhbofood-com-NFk8Rrquem.jpg", productImage: "https://pub-7dc36aa0ebc1408d8e9efa4d71fbc663.r2.dev/food/xinhbofood-com-NFk8Rrquem.jpg", productTitle: "Mật ong ngâm Sâm Nam", productSubtitle: "Sản phẩm đặc biệt được chọn lọc, phù hợp làm quà tặng và chăm sóc sức khỏe.", productPrice: "200.000đ", productComparePrice: "320.000đ", productHandle: "mat-ong-ngam-sam-nam", ctaLabel: "Mua ngay", ctaHref: "/goods/mat-ong-ngam-sam-nam", trustText: "Cam kết chính hãng, đóng gói kỹ, hỗ trợ nhanh.", highlights: ["Hương vị tự nhiên, dễ sử dụng", "Thiết kế landing tối ưu chuyển đổi", "CTA nổi bật giống TikTok Shop"], reviews: ["Đóng gói chắc chắn, nhìn rất cao cấp.", "Tư vấn nhanh, sản phẩm đúng mô tả."] } },
]

export const blogCategories = [
  { id: "open", name: "Open", slug: "open", description: "Sắp mở bán 소식", image: "https://ticketimage.interpark.com/Play/image/large/26/26006515_p.gif", sortOrder: 1, status: "published" },
  { id: "musical", name: "Musical", slug: "musical", description: "Nhạc kịch 소식", image: "https://ticketimage.interpark.com/Play/image/large/26/26001001_p.gif", sortOrder: 2, status: "published" },
  { id: "ranking", name: "Ranking", slug: "ranking", description: "Xếp hạng과 추천", image: "https://ticketimage.interpark.com/Play/image/large/25/25012652_p.gif", sortOrder: 3, status: "published" },
]

export const blogPosts = [
  { id: "mondo-animale", slug: "mondo-animale", title: "쥬세뻬 비탈레 MONDO ANMALE", categorySlug: "open", date: "05.06(수) 09:00", image: "https://ticketimage.interpark.com/Play/image/large/26/26006515_p.gif", excerpt: "강동아트센터에서 만나는 쥬세뻬 비탈레 전시 Sắp mở bán 소식입니다.", bodyHtml: "<p>강동아트센터에서 만나는 전시 Sắp mở bán 소식을 정리했습니다.</p>", status: "published" },
  { id: "billy-elliot", slug: "billy-elliot", title: "Nhạc kịch 〈빌리 엘리어트〉", categorySlug: "musical", date: "2026.04.12", image: "https://ticketimage.interpark.com/Play/image/large/26/26001001_p.gif", excerpt: "블루스퀘어 우리은행홀에서 이어지는 빌리 엘리어트 공연 안내입니다.", bodyHtml: "<p>공연 일정, 장소, 예매 정보를 한눈에 볼 수 있도록 정리했습니다.</p>", status: "published" },
  { id: "death-note", slug: "death-note", title: "Nhạc kịch 데스노트", categorySlug: "ranking", date: "2025.10.14", image: "https://ticketimage.interpark.com/Play/image/large/25/25012652_p.gif", excerpt: "Xếp hạng 상위권을 유지 중인 데스노트 공연 정보를 정리했습니다.", bodyHtml: "<p>Xếp hạng 상위 공연의 주요 정보를 정리했습니다.</p>", status: "published" },
]

export const siteInfo: SiteInfo = {
  siteName: "NOL Ticket",
  logoUrl: "",
  mobileLogoUrl: "/assets/logo/nol-interpark-logo-multiline.svg",
  faviconUrl: "",
  searchPlaceholder: "Tìm tour, vé và sự kiện",
  topBenefitImage: "/assets/header/top-benefit.png",
  topBenefitAlt: "이달의 여행 혜택",
  footerNotice: "(Nol Universe Co., Ltd. 는 일부 Sản phẩm의 통신Đang bán개자로서 통신판매의 당사자가 아니므로, Sản phẩm의 예약, 이용 및 환불 등 거래와 관련된 의무와 책임은 판매자에게 있으며 (Nol Universe Co., Ltd. 는 일체 책임을 지지 않습니다.",
  companyName: "(Nol Universe Co., Ltd.",
  companyAddress: "주소 경기도 성남시 수정구 금토로 70 (금토동, 텐엑스타워)",
  businessNumber: "사업자등록번호 824-81-02515 사업자정보확인",
  mailOrderNumber: "통신판매업신고 2024-성남수정-0912",
  tourismNumber: "관광사업증 등록번호 : 제2024-000024호",
  hostingProvider: "Nhà cung cấp hosting (Nol Universe Co., Ltd.",
  ceoName: "Đại diện 이철웅",
  customerTourPhone: "Tour 1588-3443",
  customerTicketPhone: "Vé 1544-1555",
  customerFax: "Fax 02-6919-1586",
  customerEmail: "Email help.interpark@nol-universe.com",
  customerFlightInternational: "Bay quốc tế 02-3479-4399",
  customerFlightDomestic: "Bay nội địa 02-3479-4340",
  financeEmail: "Email interpark_ef@nol-universe.com",
  privacyEmail: "Phụ trách bảo mật dữ liệu privacy_i@nol-universe.com",
  copyright: "ⓒ Nol Universe Co., Ltd. All rights reserved.",
}

export const serviceNavItems: MenuItem[] = [
  { label: "Trang chủ", href: "/" },
  { label: "Tour", href: "#" },
  { label: "Vé", href: "/", active: true },
]

export const ticketNavItems: MenuItem[] = [
  { label: "Nhạc kịch", href: "/contents/genre/musical" },
  { label: "Hòa nhạc", href: "/contents/genre/concert" },
  { label: "Thể thao", href: "/Contents/Sports" },
  { label: "Triển lãm/Sự kiện", href: "/contents/genre/exhibition" },
  { label: "Cổ điển/Múa", href: "/contents/genre/classic" },
  { label: "Gia đình/Trẻ em", href: "/contents/genre/family" },
  { label: "Kịch", href: "/contents/genre/play" },
  { label: "Giải trí/Cắm trại", href: "/contents/genre/leisure" },
  { label: "토핑", href: "/Contents/Toping" },
  { label: "MD shop", href: "https://nolmdshop.com/", external: true },
  { label: "Xếp hạng", href: "/contents/ranking?genre=MUSICAL", accent: true, dividerBefore: true },
  { label: "Sắp mở bán", href: "/contents/notice", accent: true },
  { label: "Theo khu vực", href: "/tiki/Special/TPRegionMain.asp", accent: true },
  { label: "Địa điểm", href: "/place", accent: true },
]

export const heroBanners: Banner[] = [
  { title: "Nhạc kịch 〈스윙 데이즈_암호명 A〉- 인물버전", image: "/assets/hero/hero-01.gif", thumbnail: "/assets/hero/thumb-01.jpg", backgroundColor: "#101d2e" },
  { title: "5월 Vé 마더페이지", image: "/assets/hero/hero-02.gif", thumbnail: "/assets/hero/thumb-02.png", backgroundColor: "#0e0e0e" },
  { title: "2026 Weverse Con Festival", image: "/assets/hero/hero-03.gif", thumbnail: "/assets/hero/thumb-03.jpg", backgroundColor: "#dda6b7" },
  { title: "2026 I.O.I Concert Tour: LOOP in SEOUL", image: "/assets/hero/hero-04.gif", thumbnail: "/assets/hero/thumb-04.jpg", backgroundColor: "#ebe9e8" },
  { title: "Nhạc kịch 〈베토벤〉", image: "/assets/hero/hero-05.gif", thumbnail: "/assets/hero/thumb-05.jpg", backgroundColor: "#f9f9f9" },
  { title: "Nhạc kịch 〈빌리 엘리어트〉", image: "/assets/hero/hero-06.gif", thumbnail: "/assets/hero/thumb-06.jpg", backgroundColor: "#f7f7f7" },
  { title: "2026 무명전설 전국Tour Hòa nhạc", image: "/assets/hero/hero-07.gif", thumbnail: "/assets/hero/thumb-07.png", backgroundColor: "#000000" },
  { title: "골드클래스 NOL 로열티 프로모션", image: "/assets/hero/hero-08.gif", thumbnail: "/assets/hero/thumb-08.png", backgroundColor: "#00001e" },
  { title: "2026 (제33회) 연천 구석기 축제", image: "/assets/hero/hero-09.gif", thumbnail: "/assets/hero/thumb-09.png", backgroundColor: "#051338" },
  { title: "［얼리버드］ 키크니 특별전 : 그렸고 그런사이", image: "/assets/hero/hero-10.gif", thumbnail: "/assets/hero/thumb-10.jpg", backgroundColor: "#ffb41b" },
  { title: "2026 안신애 소극장 Hòa nhạc［SCENE A］", image: "/assets/hero/hero-11.gif", thumbnail: "/assets/hero/thumb-11.jpg", backgroundColor: "#afafaf" },
  { title: "Nhạc kịch 〈몽유도원〉- 샤롯데씨어터", image: "/assets/hero/hero-12.gif", thumbnail: "/assets/hero/thumb-12.jpg", backgroundColor: "#f8f7f2" },
  { title: "Nhạc kịch 〈렘피카〉", image: "/assets/hero/hero-13.gif", thumbnail: "/assets/hero/thumb-13.png", backgroundColor: "#272828" },
  { title: "Nhạc kịch 서편제", image: "/assets/hero/hero-14.gif", thumbnail: "/assets/hero/thumb-14.png", backgroundColor: "#876f68" },
  { title: "NOL카드 특가딜 (4/28~6/22)", image: "/assets/hero/hero-15.gif", thumbnail: "/assets/hero/thumb-15.png", backgroundColor: "#383f48" },
  { title: "〈2026 슬립노모어 서울〉 (2026 Sleep No More Seoul)", image: "/assets/hero/hero-16.gif", thumbnail: "/assets/hero/thumb-16.jpg", backgroundColor: "#000000" },
];

export const mobileHeroBanners: Banner[] = [
  { title: "Nhạc kịch 〈스윙 데이즈_암호명 A〉- 인물버전", image: "/assets/hero-mobile/mobile-01.gif", backgroundColor: "transparent" },
  { title: "5월 Vé 마더페이지", image: "/assets/hero-mobile/mobile-02.gif", backgroundColor: "transparent" },
  { title: "2026 Weverse Con Festival", image: "/assets/hero-mobile/mobile-03.gif", backgroundColor: "transparent" },
  { title: "2026 I.O.I Concert Tour: LOOP in SEOUL", image: "/assets/hero-mobile/mobile-04.gif", backgroundColor: "transparent" },
  { title: "Nhạc kịch 〈베토벤〉", image: "/assets/hero-mobile/mobile-05.gif", backgroundColor: "transparent" },
  { title: "Nhạc kịch 〈빌리 엘리어트〉", image: "/assets/hero-mobile/mobile-06.gif", backgroundColor: "transparent" },
  { title: "2026 무명전설 전국Tour Hòa nhạc", image: "/assets/hero-mobile/mobile-07.gif", backgroundColor: "transparent" },
  { title: "골드클래스 NOL 로열티 프로모션", image: "/assets/hero-mobile/mobile-08.gif", backgroundColor: "transparent" },
  { title: "2026 (제33회) 연천 구석기 축제", image: "/assets/hero-mobile/mobile-09.gif", backgroundColor: "transparent" },
  { title: "2026 안신애 소극장 Hòa nhạc［SCENE A］", image: "/assets/hero-mobile/mobile-10.gif", backgroundColor: "transparent" },
  { title: "［얼리버드］ 키크니 특별전 : 그렸고 그런사이", image: "/assets/hero-mobile/mobile-11.gif", backgroundColor: "transparent" },
  { title: "Nhạc kịch 〈렘피카〉", image: "/assets/hero-mobile/mobile-12.gif", backgroundColor: "transparent" },
  { title: "Nhạc kịch 〈몽유도원〉- 샤롯데씨어터", image: "/assets/hero-mobile/mobile-13.gif", backgroundColor: "transparent" },
  { title: "Nhạc kịch 서편제", image: "/assets/hero-mobile/mobile-14.gif", backgroundColor: "transparent" },
  { title: "NOL카드 특가딜 (4/28~6/22)", image: "/assets/hero-mobile/mobile-15.gif", backgroundColor: "transparent" },
  { title: "〈2026 슬립노모어 서울〉 (2026 Sleep No More Seoul)", image: "/assets/hero-mobile/mobile-16.gif", backgroundColor: "transparent" },
];

export const miniBanners: Banner[] = [
  { title: "TREASURE THE STAGE 2026 IN SEOUL", image: "/assets/mini/mini-01.gif" },
  { title: "Nhạc kịch 〈빌리 엘리어트〉- 오픈", image: "/assets/mini/mini-02.gif" },
  { title: "［슈가데이#3］ Nhạc kịch 〈팬레터〉", image: "/assets/mini/mini-03.gif" },
  { title: "엘렌 메르시에 ＆ 다니엘 로자코비치", image: "/assets/mini/mini-04.gif" },
  { title: "Kịch 〈마우스피스〉", image: "/assets/mini/mini-05.gif" },
  { title: "청년문화패스", image: "/assets/mini/mini-06.gif" },
];

export const rankingItems: TicketItem[] = [
  { rank: 1, title: "Nhạc kịch 〈렘피카〉", venue: "코엑스아티움 우리은행홀", period: "2026.3.21 ~ 6.20", image: "https://ticketimage.interpark.com/Play/image/large/26/26000685_p.gif", badge: "Bán độc quyền" },
  { rank: 2, title: "Nhạc kịch 〈빌리 엘리어트〉", venue: "블루스퀘어 우리은행홀", period: "2026.4.12 ~ 7.26", image: "https://ticketimage.interpark.com/Play/image/large/26/26001001_p.gif", badge: "Bán độc quyền" },
  { rank: 3, title: "Nhạc kịch 데스노트(The Musical Death Note)", venue: "디큐브 링크아트센터", period: "2025.10.14 ~ 2026.5.25", image: "https://ticketimage.interpark.com/Play/image/large/25/25012652_p.gif" },
  { rank: 4, title: "Nhạc kịch 〈스윙 데이즈_암호명 A〉", venue: "충무아트센터 대극장", period: "2026.4.16 ~ 7.5", image: "https://ticketimage.interpark.com/Play/image/large/26/26001111_p.gif", badge: "Bán độc quyền" },
  { rank: 5, title: "Nhạc kịch 〈베토벤〉", venue: "세종문화회관 대극장", period: "2026.6.9 ~ 8.11", image: "https://ticketimage.interpark.com/Play/image/large/P0/P0004669_p.gif" },
  { rank: 6, title: "Nhạc kịch 〈몽유도원〉", venue: "샤롯데씨어터", period: "2026.4.11 ~ 5.10", image: "https://ticketimage.interpark.com/Play/image/large/26/26002010_p.gif", badge: "Ưu tiên chỗ ngồi" },
  { rank: 7, title: "Nhạc kịch 〈로미오와 줄리엣〉", venue: "한전아트센터", period: "2026.3.24 ~ 5.31", image: "https://ticketimage.interpark.com/Play/image/large/26/26000541_p.gif", badge: "Ưu tiên chỗ ngồi" },
  { rank: 8, title: "Nhạc kịch 서편제", venue: "광림아트센터 BBCH홀", period: "2026.4.30 ~ 7.19", image: "https://ticketimage.interpark.com/Play/image/large/26/26003126_p.gif", badge: "Ưu tiên chỗ ngồi" },
  { rank: 9, title: "Nhạc kịch 〈ROGER〉", venue: "NOL 서경스퀘어 스콘 2관", period: "2026.3.5 ~ 5.31", image: "https://ticketimage.interpark.com/Play/image/large/26/26001087_p.gif", badge: "Ưu tiên chỗ ngồi" },
  { rank: 10, title: "Nhạc kịch 〈그날들〉", venue: "디큐브 링크아트센터", period: "2026.6.9 ~ 8.23", image: "https://ticketimage.interpark.com/Play/image/large/26/26005310_p.gif", badge: "Ưu tiên chỗ ngồi" },
];

export const discountItems: TicketItem[] = [
  { title: "Nhạc kịch 〈알사탕〉 - 서울숲", venue: "서울숲 씨어터 1관", period: "2025.3.29 ~ 2026.8.30", image: "https://ticketimage.interpark.com/Play/image/large/25/25002679_p.gif", dealLabel: "Deal giờ vàng", dealTimer: "D-6 11:37:29", saleLabel: "Giảm mọi hạng vé", price: "52% 31,680원" },
  { title: "Kịch 〈빵야〉", venue: "두산아트센터 연강홀", period: "2026.3.3 ~ 5.24", image: "https://ticketimage.interpark.com/Play/image/large/26/26000641_p.gif", dealLabel: "Deal giờ vàng", dealTimer: "11:37:29", saleLabel: "Giảm mọi hạng vé", price: "50% 30,000원" },
  { title: "Kịch〈늘근도둑이야기〉", venue: "Daehakro 아트포레스트 1관", period: "2025.7.1 ~ 2026.5.10", image: "https://ticketimage.interpark.com/Play/image/large/25/25009291_p.gif", dealLabel: "Ưu đãi cuối", dealTimer: "D-5", saleLabel: "Ưu đãi cận ngày", price: "76% 12,000원" },
  { title: "난감,한가족", venue: "소극장 창덕궁", period: "2026.5.4 ~ 5.17", image: "https://ticketimage.interpark.com/Play/image/large/26/26006696_p.gif", dealLabel: "Ưu đãi cuối", dealTimer: "D-5", saleLabel: "Ưu đãi cận ngày", price: "40% 30,000원" },
  { title: "Nhạc kịch 〈오지게 재밌는 가시나들〉", venue: "국립극장 하늘극장", period: "2026.5.15 ~ 6.28", image: "https://ticketimage.interpark.com/Play/image/large/26/26003944_p.gif", dealLabel: "Ưu đãi gia đình", price: "40% 46,200원" },
  { title: "Nhạc kịch 〈더 트라이브〉", venue: "세종문화회관 M씨어터", period: "2026.6.9 ~ 6.27", image: "https://ticketimage.interpark.com/Play/image/large/P0/P0004517_p.gif", dealLabel: "Ưu đãi xem lại", price: "30% 42,000원" },
  { title: "［얼리버드］ 워너 브롱크호스트 부산전", venue: "그랜드 조선 부산", period: "2026.5.22 ~ 8.31", image: "https://ticketimage.interpark.com/Play/image/large/26/26005851_p.gif", dealLabel: "Ưu đãi sớm", price: "45% 9,900원" },
  { title: "Nhạc kịch 〈피리 부는 사나이〉", venue: "국립정동극장", period: "2026.6.12 ~ 8.2", image: "https://ticketimage.interpark.com/Play/image/large/26/26006201_p.gif", dealLabel: "Ưu đãi preview", price: "30% 49,000원" },
  { title: "Nhạc kịch 〈더 테일 에이프릴 풀스〉", venue: "예스24스테이지 2관", period: "2026.3.24 ~ 6.7", image: "https://ticketimage.interpark.com/Play/image/large/26/26001142_p.gif", dealLabel: "Ưu đãi xem lại", price: "15% 42,500원" },
  { title: "2026 Nhạc kịch 〈Mad Hatter〉", venue: "Daehakro TOM(티오엠) 1관", period: "2026.6.9 ~ 8.30", image: "https://ticketimage.interpark.com/Play/image/large/26/26006189_p.gif", dealLabel: "Ưu đãi xem lại", price: "30% 35,000원" },
];

export const promoBanners: Banner[] = [
  { title: "Đánh giá/기대평 작성하고 공연 초대권 받아가세요!", image: "/assets/promo/best-review-banner-image.svg" },
  { title: "NOL 로열티 프로모션", image: "/assets/promo/promo-01.gif" },
  { title: "2026 청년문화예술패스", image: "/assets/promo/promo-02.gif" },
  { title: "Vé 마더페이지", image: "/assets/promo/promo-03.gif" },
  { title: "혜화역 5번 출구", image: "/assets/promo/promo-04.gif" },
];

export const openItems: TicketItem[] = [
  { title: "고영배의 슴슴한 도파민 중독 치료 Hòa nhạc 〈고슴도치콘〉", venue: "Mở bán thường", period: "05.07(목) 19:00", image: "https://ticketimage.interpark.com/Play/image/large/26/26006619_p.gif", badge: "Hot độc quyền" },
  { title: "［Play＆Stay］2026 ALPHA DRIVE ONE FAN-CON TOUR ［STAR ROAD］ in INCHEON + Hotels", venue: "Mua trước thành viên", period: "05.07(목) 20:00", image: "https://ticketimage.interpark.com/Play/image/large/26/26006251_p.gif", badge: "Bán độc quyền" },
  { title: "2026 무명전설 전국Tour Hòa nhạc - 대전", venue: "Mở bán thường", period: "05.14(목) 15:00", image: "https://ticketimage.interpark.com/TicketImage/notice_poster/20/2026042810544432.jpg", badge: "Hot độc quyền" },
  { title: "2026 PEPPERTONES CLUB TOUR - 부산", venue: "Mở bán thường", period: "내일 19:30", image: "https://ticketimage.interpark.com/Play/image/large/26/26006152_p.gif", badge: "Hot độc quyền" },
  { title: "2026 Busan One Asia Festival (BOF) with NOL", venue: "Mở bán thường", period: "05.12(화) 20:00", image: "https://ticketimage.interpark.com/TicketImage/notice_poster/20/2026042709315507.jpg", badge: "Hot độc quyền" },
  { title: "2026 무명전설 전국Tour Hòa nhạc - 대구", venue: "Mở bán thường", period: "05.14(목) 13:00", image: "https://ticketimage.interpark.com/TicketImage/notice_poster/20/2026050410374777.jpg", badge: "Hot độc quyền" },
];

export const playItems: TicketItem[] = [
  { title: "[월요라이브 S5] EP.10. Nhạc kịch 렘피카", venue: "인터파크 LIVE", period: "10:51", image: "/assets/extra/play-01.gif" },
  { title: "[월요라이브 S5] EP.9. Nhạc kịch 몽유도원", venue: "인터파크 LIVE", period: "11:16", image: "/assets/extra/play-02.gif" },
  { title: "[월요라이브 S5] EP.8 THE LAST", venue: "인터파크 LIVE", period: "12:38", image: "/assets/extra/play-03.gif" },
];

export const mdPickItems: TicketItem[] = [
  { title: "2026 The Mixtage ［3 Fingers : 정성하x영소x김진산］", venue: "NOL씨어터 합정 동양생명홀", period: "2026.5.30 ~ 5.31", image: "https://ticketimage.interpark.com/Play/image/large/26/26005565_p.gif" },
  { title: "2026Kịch 사랑해엄마", venue: "Daehakro 아트하우스", period: "2026.5.1 ~ 7.26", image: "https://ticketimage.interpark.com/Play/image/large/26/26005154_p.gif" },
  { title: "Trang chủ존의 집들이vol.5 〈Art Room〉", venue: "서보아트스페이스 보이드홀", period: "2026.5.23 ~ 5.23", image: "https://ticketimage.interpark.com/Play/image/large/26/26005902_p.gif" },
  { title: "창작가무극 〈신과 함께_저승편〉", venue: "NOL 씨어터 Daehakro 우리카드홀", period: "2026.6.13 ~ 7.5", image: "https://ticketimage.interpark.com/Play/image/large/26/26006275_p.gif" },
  { title: "Nhạc kịch 〈피리 부는 사나이〉", venue: "국립정동극장", period: "2026.6.12 ~ 8.2", image: "https://ticketimage.interpark.com/Play/image/large/26/26006201_p.gif" },
  { title: "Nhạc kịch 〈렘피카〉", venue: "코엑스아티움 우리은행홀", period: "2026.3.21 ~ 6.20", image: "https://ticketimage.interpark.com/Play/image/large/26/26000685_p.gif" },
  { title: "Kịch 〈불란서 금고 - 북벽에 오를 자 누구더냐〉", venue: "NOL 서경스퀘어 스콘 1관", period: "2026.3.7 ~ 6.7", image: "https://ticketimage.interpark.com/Play/image/large/26/26000405_p.gif" },
  { title: "2026 서울파크뮤직페스티벌", venue: "올림픽공원 88잔디마당, Vé링크 라이브 아레나", period: "2026.6.20 ~ 6.21", image: "https://ticketimage.interpark.com/Play/image/large/26/26003322_p.gif" },
  { title: "Kịch 〈쉬어매드니스〉-오늘의 목격자는 바로 당신, 당신이 완성할 결말!", venue: "콘텐츠박스(KONTENTZ BOX)", period: "2015.11.12 ~ 2026.5.31", image: "https://ticketimage.interpark.com/Play/image/large/24/24006928_p.gif" },
  { title: "블랙코미디 최강자! Kịch 〈죽여주는 이야기〉- 18주년", venue: "지인시어터(구.알과핵소극장)", period: "2008.5.15 ~ 2026.9.30", image: "https://ticketimage.interpark.com/Play/image/large/26/26003518_p.gif" },
];

export const keywordItems: TicketItem[] = [
  { title: "용인어린이상상의숲 요리조리스튜디오 〈상상파티시엘1〉", venue: "용인어린이상상의숲 요리조리스튜디오", period: "2026.3.13 ~ 7.19", image: "https://ticketimage.interpark.com/Play/image/large/26/26002657_p.gif" },
  { title: "Nhạc kịch 〈더 테일 에이프릴 풀스〉", venue: "예스24스테이지 2관", period: "2026.3.24 ~ 6.7", image: "https://ticketimage.interpark.com/Play/image/large/26/26001142_p.gif" },
  { title: "Nhạc kịch 〈디아길레프〉", venue: "예스24아트원 1관", period: "2026.3.31 ~ 6.14", image: "https://ticketimage.interpark.com/Play/image/large/26/26001248_p.gif" },
  { title: "Nhạc kịch 〈걸프렌드〉", venue: "백암아트홀", period: "2026.3.31 ~ 6.7", image: "https://ticketimage.interpark.com/Play/image/large/26/26002556_p.gif" },
  { title: "Nhạc kịch 〈ROGER〉", venue: "NOL 서경스퀘어 스콘 2관", period: "2026.3.5 ~ 5.31", image: "https://ticketimage.interpark.com/Play/image/large/26/26001087_p.gif" },
  { title: "Nhạc kịch 〈홍련〉", venue: "충무아트센터 중극장 블랙", period: "2026.2.28 ~ 5.17", image: "https://ticketimage.interpark.com/Play/image/large/26/26000419_p.gif" },
  { title: "2026년 〈토요키즈클래식〉 (상반기) - 용인", venue: "용인포은아트홀", period: "2026.2.28 ~ 6.27", image: "https://ticketimage.interpark.com/Play/image/large/26/26000450_p.gif" },
];

export const reviewItems: TicketItem[] = [
  { title: "Nhạc kịch 불편한 편의점", venue: "Đánh giá", period: "9.9", image: "/assets/extra/review-01.gif" },
  { title: "Daehakro Kịch 한뼘사이", venue: "Đánh giá", period: "9.9", image: "/assets/extra/review-02.gif" },
  { title: "Nhạc kịch gợi ý", venue: "Đánh giá", period: "9.8", image: "/assets/extra/review-03.gif" },
  { title: "Biểu diễn cổ điển", venue: "Đánh giá", period: "9.7", image: "/assets/extra/review-04.gif" },
];

export const mobileShortcuts = [
  { label: "Nhạc kịch", icon: "/assets/icons/shortcut-01.svg" },
  { label: "Hòa nhạc", icon: "/assets/icons/shortcut-02.svg" },
  { label: "Thể thao", icon: "/assets/icons/shortcut-03.svg" },
  { label: "Cổ điển/Múa", icon: "/assets/icons/shortcut-04.svg" },
  { label: "Kịch", icon: "/assets/icons/shortcut-05.svg" },
  { label: "Giải trí/Cắm trại", icon: "/assets/icons/shortcut-06.svg" },
  { label: "Gia đình/Trẻ em", icon: "/assets/icons/shortcut-07.svg" },
  { label: "Triển lãm/Sự kiện", icon: "/assets/icons/shortcut-08.svg" },
  { label: "toping", icon: "/assets/icons/shortcut-09.gif" },
  { label: "Ưu đãi tháng này", icon: "/assets/icons/shortcut-10.gif" },
];

export const genres = ["Nhạc kịch", "Hòa nhạc", "Thể thao", "Triển lãm/Sự kiện", "Cổ điển/Múa", "Gia đình/Trẻ em", "Kịch", "Giải trí/Cắm trại"];
export const playTabs = ["추천영상", "Nhạc kịch", "Hòa nhạc", "Triển lãm/Sự kiện", "Cổ điển/Múa", "Kịch"];
export const mdPickTabs = ["오직 NOL Ticket에서만", "핫이슈 클래식&무용", "화제의 전시"];
export const keywordTabs = ["재관람률 높은", "아이와 함께", "Daehakro Kịch 추천"];
