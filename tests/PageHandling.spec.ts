import{test,expect,BrowserContext,Page, chromium, Browser} from '@playwright/test'

test("Handling multiple pages", async ()  =>
{
  const browser:Browser = await chromium.launch();

  const context:BrowserContext = await browser.newContext();

  const page1:Page = await context.newPage();
  const page2:Page = await context.newPage();
  // we created 2 pages with same context..


  //number of pages created using same context...
   const pages:Page[] = await context.pages();
   
   console.log("Number of pages created using same context is :- ", pages.length);

   await page1.goto("https://testautomationpractice.blogspot.com/");    //open on page/tab 1 
   await expect(page1).toHaveTitle("Automation Testing Practice");

   await page2.goto("https://www.saucedemo.com/");    //open on page/tab 2
   await expect(page2).toHaveTitle("Swag Labs");

   await page1.waitForTimeout(2000);
   await page2.waitForTimeout(2000);

})