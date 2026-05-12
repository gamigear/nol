const { chromium } = require("playwright");
(async()=>{
 const browser = await chromium.launch({headless:true});
 const page = await browser.newPage({viewport:{width:1920,height:2600}, deviceScaleFactor:1});
 await page.goto("https://nol.interpark.com/ticket", {waitUntil:"networkidle", timeout:90000});
 await page.waitForTimeout(4000);
 const data = await page.evaluate(() => {
   function clean(s){return (s||"").replace(/\s+/g," ").trim();}
   function cardFor(img){
     let n=img;
     for(let i=0;i<12 && n;i++,n=n.parentElement){
       const r=n.getBoundingClientRect();
       const text=clean(n.innerText || n.textContent || "");
       if(text.length>8 && r.width>=145 && r.width<=420 && r.height>=230 && r.height<=760){
         return {tag:n.tagName, cls:String(n.className || ""), w:Math.round(r.width), h:Math.round(r.height), text};
       }
     }
     return null;
   }
   return [...document.images].map((img,idx)=>{
     const r=img.getBoundingClientRect();
     if(r.width < 100 || r.height < 120) return null;
     return {idx, y:Math.round(r.y), x:Math.round(r.x), w:Math.round(r.width), h:Math.round(r.height), src:img.src, card:cardFor(img)};
   }).filter(Boolean).filter(x=>x.y>450 && x.y<4600).slice(0,120);
 });
 console.log(JSON.stringify(data,null,2));
 await browser.close();
})();
