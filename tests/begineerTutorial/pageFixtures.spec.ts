//Browser -> Context -> Page

//context -> we can have multiple context for multiple user/apps on the same browser,
          // this allows user to test/open multiple independent browser session..

//page -> new tab/window/popup

import{test,expect,Locator, Page, BrowserContext, chromium} from '@playwright/test'

//till now we used to directly create a page without creating any browser context session..now we will create it

test("Demo without any page fixture", async () =>      //no fixture being passed, hence we will use all manually..
{
  const browser = await chromium.launch();                            // we are creating our own browser..chromium,firefox,webkit..
  const context:BrowserContext = await browser.newContext();    // passed browser and created a new context
  const page:Page =  await context.newPage();                   // from context, we created a new page

  await page.goto("https://testautomationpractice.blogspot.com/");      // we used page for steps..
});

test("Browser demo", async ({browser}) =>
{
  const context:BrowserContext = await browser.newContext();    // passed browser and created a new context
  const page:Page =  await context.newPage();                   // from context, we created a new page

  await page.goto("https://testautomationpractice.blogspot.com/");      // we used page for steps..
});

test("Context demo", async ({context}) =>
{
  const page:Page =  await context.newPage();                 //passed context, creating page alone

  await page.goto("https://testautomationpractice.blogspot.com/");
});

test.only("Page demo", async ({page}) =>
{
  await page.goto("https://testautomationpractice.blogspot.com/");
});
