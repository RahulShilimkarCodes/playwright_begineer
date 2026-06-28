import {test,expect,chromium, Browser, BrowserContext, Page} from '@playwright/test'

test("Handling pop ups", async()  =>
{

  const browser:Browser = await chromium.launch();
  const context:BrowserContext = await browser.newContext();
  const parentPage:Page = await context.newPage();


  await parentPage.goto("https://testautomationpractice.blogspot.com/");
  await expect(parentPage).toHaveTitle("Automation Testing Practice");

  const [childPopups] = await Promise.all([
    parentPage.waitForEvent('popup'),
    await parentPage.getByRole("button",{name: "Popup Windows"}).click()
  ]);
  //these is going to create 2 popups...

  await parentPage.waitForTimeout(2000);

  //getting number of window/tabs/popup opened..
  const pageCount:Page[] = await context.pages();
  console.log("Number of pages opened is :- ",pageCount.length);

  console.log("URL of Parent window is :- ", await pageCount[0].url());
  console.log("URL of 1st pop-up window is :- ", await pageCount[1].url());
  console.log("URL of 2nd pop-up window is :- ", await pageCount[2].url());

  //to close all the pop-ups
  for(let i = 1 ; i < pageCount.length; i++)
  {
    const popupTitle:string = await pageCount[i].title();
    console.log(`Title of popup at position ${i} is ${popupTitle}`);

    if(popupTitle.includes('Playwright'))
    {
      await pageCount[i].locator(".DocSearch-Button-Placeholder").click();
      await parentPage.waitForTimeout(1000);
      await pageCount[i].locator("#docsearch-input").fill("Windows");
      await parentPage.waitForTimeout(1000);
      await pageCount[i].getByLabel("Clear the query", {exact: true}).click();
      await pageCount[i].waitForTimeout(1000);


      await pageCount[i].close();
      await parentPage.waitForTimeout(2000);      //since child already closed..
    }
  }



})