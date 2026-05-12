export type HomepageSection = {
  id: string;
  title: string;
  enabled: boolean;
  actionLabel?: string;
  collectionHandle?: string;
  tabCollections?: Record<string, string>;
  categorySlug?: string;
  tabCategories?: Record<string, string>;
};

export type LandingConfig = {
  badge?: string;
  heroImage?: string;
  heroVideo?: string;
  galleryImages?: string[];
  productImage?: string;
  productTitle?: string;
  productSubtitle?: string;
  productPrice?: string;
  productComparePrice?: string;
  productHandle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  headerLogo?: string
  headerTitle?: string
  headerLinks?: string[]
  footerText?: string
  footerLinks?: string[]
  trustText?: string;
  highlights?: string[];
  reviews?: string[];
};

export type CmsPage = {
  id: string;
  path: string;
  title: string;
  heading: string;
  excerpt: string;
  bodyHtml: string;
  status: "draft" | "published";
  template?: "default" | "landing-tiktok";
  landing?: LandingConfig;
  seoTitle?: string;
  seoDescription?: string;
};

export type BlogCategory = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  sortOrder?: number;
  status: "draft" | "published";
};

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  categorySlug: string;
  date: string;
  image: string;
  excerpt: string;
  bodyHtml: string;
  status: "draft" | "published";
  seoTitle?: string;
  seoDescription?: string;
};

export type SiteInfo = {
  siteName: string;
  logoUrl: string;
  mobileLogoUrl: string;
  faviconUrl: string;
  searchPlaceholder: string;
  topBenefitImage: string;
  topBenefitAlt: string;
  footerNotice: string;
  companyName: string;
  companyAddress: string;
  businessNumber: string;
  mailOrderNumber: string;
  tourismNumber: string;
  hostingProvider: string;
  ceoName: string;
  customerTourPhone: string;
  customerTicketPhone: string;
  customerFax: string;
  customerEmail: string;
  customerFlightDomestic: string;
  customerFlightInternational: string;
  financeEmail: string;
  privacyEmail: string;
  copyright: string;
};

export type MenuItem = {
  label: string;
  href: string;
  active?: boolean;
  accent?: boolean;
  dividerBefore?: boolean;
  external?: boolean;
};

export type Banner = {
  title: string;
  image: string;
  mobileImage?: string;
  thumbnail?: string;
  backgroundColor?: string;
  href?: string;
};

export type TicketItem = {
  id?: string;
  slug?: string;
  variantId?: string;
  currencyCode?: string;
  unitPrice?: number;
  rank?: number;
  title: string;
  venue: string;
  period: string;
  image: string;
  badge?: string;
  dealLabel?: string;
  dealTimer?: string;
  saleLabel?: string;
  price?: string;
};

export type Shortcut = {
  label: string;
  icon: string;
};
