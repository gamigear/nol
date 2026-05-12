import { blogCategories, blogPosts, cmsPages, discountItems, homepageSections, genres, heroBanners, keywordItems, keywordTabs, mdPickItems, mdPickTabs, miniBanners, mobileHeroBanners, mobileShortcuts, openItems, playItems, playTabs, promoBanners, rankingItems, reviewItems, serviceNavItems, siteInfo, ticketNavItems } from "./ticket";
import type { Banner, BlogCategory, BlogPost, CmsPage, HomepageSection, MenuItem, Shortcut, SiteInfo, TicketItem } from "../types/ticket";

export type TemplateData = {
  homepageSections: HomepageSection[];
  cmsPages: CmsPage[];
  blogCategories: BlogCategory[];
  blogPosts: BlogPost[];
  siteInfo: SiteInfo;
  serviceNavItems: MenuItem[];
  ticketNavItems: MenuItem[];
  heroBanners: Banner[];
  mobileHeroBanners: Banner[];
  miniBanners: Banner[];
  rankingItems: TicketItem[];
  discountItems: TicketItem[];
  promoBanners: Banner[];
  openItems: TicketItem[];
  playItems: TicketItem[];
  mdPickItems: TicketItem[];
  keywordItems: TicketItem[];
  reviewItems: TicketItem[];
  mobileShortcuts: Shortcut[];
  genres: string[];
  playTabs: string[];
  mdPickTabs: string[];
  keywordTabs: string[];
  homepageCollectionItems?: Record<string, TicketItem[]>;
  homepageTabItems?: Record<string, Record<string, TicketItem[]>>;
};

export const fallbackTemplateData: TemplateData = {
  homepageSections,
  cmsPages,
  blogCategories: blogCategories as BlogCategory[],
  blogPosts: blogPosts as BlogPost[],
  siteInfo,
  serviceNavItems,
  ticketNavItems,
  heroBanners,
  mobileHeroBanners,
  miniBanners,
  rankingItems,
  discountItems,
  promoBanners,
  openItems,
  playItems,
  mdPickItems,
  keywordItems,
  reviewItems,
  mobileShortcuts,
  genres,
  playTabs,
  mdPickTabs,
  keywordTabs,
};
