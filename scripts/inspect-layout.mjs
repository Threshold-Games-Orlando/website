import { chromium } from '@playwright/test';
const browser = await chromium.launch({ channel:'chrome' });
const page = await browser.newPage();
for (const width of [1440,768,390,320]) {
 await page.setViewportSize({width,height:960}); await page.goto('http://127.0.0.1:4321'); await page.evaluate(()=>document.fonts.ready);
 console.log(JSON.stringify({width,layout:await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,wide:[...document.querySelectorAll('body *')].map(el=>({tag:el.tagName,class:el.className.baseVal??el.className,left:el.getBoundingClientRect().left,right:el.getBoundingClientRect().right})).filter(x=>x.right>innerWidth+1||x.left<-1)}))}));
 await page.screenshot({path:'test-results/inspect-'+width+'.png',fullPage:true});
}
await browser.close();
