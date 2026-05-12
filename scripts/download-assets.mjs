import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const assets = [
  ["public/assets/logo/nol-interpark-logo-multiline.svg", "https://tour-web-assets.interparkcdn.net/assets/int-frontend/nol-header/nol-interpark-logo-multiline.svg"],
  ["public/assets/logo/partner-nol.svg", "https://tour-web-assets.interparkcdn.net/assets/int-frontend/nol-footer/partner-nol.svg"],
  ["public/assets/logo/partner-triple.svg", "https://tour-web-assets.interparkcdn.net/assets/int-frontend/nol-footer/partner-triple.svg"],
  ["public/assets/logo/partner-nol-global-small.png", "https://tour-web-assets.interparkcdn.net/assets/int-frontend/nol-footer/partner-nol-global-small.png"],
  ["public/assets/promo/best-review-banner-image.svg", "https://nol.interpark.com/ticket/images/best-review-banner-image.svg"],
  ...[
    "https://ticketimage.interpark.com/TCMS3.0/NMain/BbannerPC/2604/260427023753_26005944.gif",
    "https://ticketimage.interpark.com/TCMS3.0/NMain/BbannerPC/2604/260427090402_26005489.gif",
    "https://ticketimage.interpark.com/TCMS3.0/NMain/BbannerPC/2604/260427085818_26004473.gif",
    "https://ticketimage.interpark.com/TCMS3.0/NMain/BbannerPC/2604/260427092938_25011300.gif",
    "https://ticketimage.interpark.com/TCMS3.0/NMain/BbannerPC/2604/260403101324_16007528.gif",
    "https://ticketimage.interpark.com/TCMS3.0/NMain/BbannerPC/2601/260129081837_26001001.gif",
    "https://ticketimage.interpark.com/TCMS3.0/NMain/BbannerPC/2602/260224092754_26001111.gif",
    "https://ticketimage.interpark.com/TCMS3.0/NMain/BbannerPC/2603/260319092324_26003385.gif",
    "https://ticketimage.interpark.com/TCMS3.0/NMain/BbannerPC/2604/260413025401_25017938.gif",
    "https://ticketimage.interpark.com/TCMS3.0/NMain/BbannerPC/2604/260414092515_P0004669.gif",
    "https://ticketimage.interpark.com/TCMS3.0/NMain/BbannerPC/2604/260403095012_26000541.gif",
    "https://ticketimage.interpark.com/TCMS3.0/NMain/BbannerPC/2603/260326093738_26000685.gif",
    "https://ticketimage.interpark.com/TCMS3.0/NMain/BbannerPC/2602/260227011541_26002761.gif",
    "https://ticketimage.interpark.com/TCMS3.0/NMain/BbannerPC/2602/260213060701_26002010.gif",
    "https://ticketimage.interpark.com/TCMS3.0/NMain/BbannerPC/2603/260331111851_16007528.gif",
    "https://ticketimage.interpark.com/TCMS3.0/NMain/BbannerPC/2604/260420092026_26005143.gif",
  ].map((url, i) => [`public/assets/hero/hero-${String(i + 1).padStart(2, "0")}.gif`, url]),
  ...[
    "https://ticketimage.interpark.com/TCMS3.0/NMain/MiniBanner/2604/260424031756_26005944.gif",
    "https://ticketimage.interpark.com/TCMS3.0/NMain/MiniBanner/2604/260424031416_26001001.gif",
    "https://ticketimage.interpark.com/TCMS3.0/NMain/MiniBanner/2604/260424031621_26006169.gif",
    "https://ticketimage.interpark.com/TCMS3.0/NMain/MiniBanner/2604/260424031352_26005262.gif",
    "https://ticketimage.interpark.com/TCMS3.0/NMain/MiniBanner/2604/260424031010_26001237.gif",
    "https://ticketimage.interpark.com/TCMS3.0/NMain/MiniBanner/2602/260227045424_25013315.gif",
  ].map((url, i) => [`public/assets/mini/mini-${String(i + 1).padStart(2, "0")}.gif`, url]),
  ...[
    "https://ticketimage.interpark.com/Play/image/large/26/26006169_p.gif",
    "https://ticketimage.interpark.com/Play/image/large/26/26000685_p.gif",
    "https://ticketimage.interpark.com/Play/image/large/26/26001001_p.gif",
    "https://ticketimage.interpark.com/Play/image/large/25/25012652_p.gif",
    "https://ticketimage.interpark.com/Play/image/large/26/26001111_p.gif",
    "https://ticketimage.interpark.com/Play/image/large/26/26001565_p.gif",
    "https://ticketimage.interpark.com/Play/image/large/P0/P0004669_p.gif",
    "https://ticketimage.interpark.com/Play/image/large/26/26003126_p.gif",
    "https://ticketimage.interpark.com/Play/image/large/26/26002010_p.gif",
    "https://ticketimage.interpark.com/Play/image/large/25/25012969_p.gif",
  ].map((url, i) => [`public/assets/ranking/ranking-${String(i + 1).padStart(2, "0")}.gif`, url]),
  ...[
    "https://ticketimage.interpark.com/Play/image/large/25/25005387_p.gif",
    "https://ticketimage.interpark.com/Play/image/large/25/25014107_p.gif",
    "https://ticketimage.interpark.com/Play/image/large/26/26003126_p.gif",
    "https://ticketimage.interpark.com/Play/image/large/26/26002626_p.gif",
    "https://ticketimage.interpark.com/Play/image/large/26/26005289_p.gif",
    "https://ticketimage.interpark.com/Play/image/large/P0/P0004664_p.gif",
    "https://ticketimage.interpark.com/Play/image/large/25/25009291_p.gif",
    "https://ticketimage.interpark.com/Play/image/large/26/26005235_p.gif",
    "https://ticketimage.interpark.com/Play/image/large/26/26004473_p.gif",
    "https://ticketimage.interpark.com/Play/image/large/25/25012969_p.gif",
    "https://ticketimage.interpark.com/Play/image/large/26/26003944_p.gif",
    "https://ticketimage.interpark.com/Play/image/large/26/26000419_p.gif",
    "https://ticketimage.interpark.com/Play/image/large/26/26004457_p.gif",
    "https://ticketimage.interpark.com/Play/image/large/26/26005734_p.gif",
  ].map((url, i) => [`public/assets/discount/discount-${String(i + 1).padStart(2, "0")}.gif`, url]),
  ...[
    "https://ticketimage.interpark.com/TCMS3.0/NMain/PromBanner/2604/260403042314_22000354.gif",
    "https://ticketimage.interpark.com/TCMS3.0/NMain/PromBanner/2602/260225103234_22000354.gif",
    "https://ticketimage.interpark.com/TCMS3.0/NMain/PromBanner/2505/250526121534_16007528.gif",
    "https://ticketimage.interpark.com/TCMS3.0/NMain/PromBanner/2401/240104111216_16007528.gif",
  ].map((url, i) => [`public/assets/promo/promo-${String(i + 1).padStart(2, "0")}.gif`, url]),
];

const manifest = {};
for (const [target, url] of assets) {
  const absolute = join(root, target);
  await mkdir(dirname(absolute), { recursive: true });
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  await writeFile(absolute, buffer);
  manifest[url] = `/${target.replace(/^public\//, "")}`;
  console.log(`${target} ${buffer.length}`);
}
await writeFile(join(root, "public/assets/asset-manifest.json"), JSON.stringify(manifest, null, 2));
