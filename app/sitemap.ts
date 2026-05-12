import type { MetadataRoute } from "next";

const baseUrl = "https://nol.gamigear.com";
const staticRoutes = [
  "/",
  "/contents/category",
  "/contents/ranking",
  "/contents/notice",
  "/contents/search",
  "/contents/guide/manual",
  "/contents/myPage",
  "/contents/genre/musical",
  "/contents/genre/concert",
  "/contents/genre/exhibition",
  "/contents/genre/classic",
  "/contents/genre/family",
  "/contents/genre/play",
  "/contents/genre/leisure",
  "/Contents/Sports",
  "/Contents/Toping",
  "/place",
  "/cart",
  "/checkout",
  "/about",
  "/contact",
  "/blog",
  "/blogs",
];
const campaignCodes = ["260220002", "250908001", "251017003"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: route === "/" ? 1 : 0.7,
    })),
    ...campaignCodes.map((code) => ({
      url: `${baseUrl}/exhibition?exhibitionCode=${code}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
