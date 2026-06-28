import{test,expect,chromium,Browser, BrowserContext, Page} from '@playwright/test';

test("Handling multiple tests", async() =>
{

  const browser:Browser = await chromium.launch();
  const context:BrowserContext = await browser.newContext();

  const parentPage:Page = await context.newPage();
  await parentPage.goto("https://testautomationpractice.blogspot.com/");

  const [childPage] = await Promise.all([
    context.waitForEvent('page'),
    await parentPage.getByRole("button", {name:"New Tab"}).click()
  ]);    
  //Promise.all -this will wait till all the statements have completed the execution...
  //above is done since we need to run both the statements in sync

  // await context.waitForEvent('page');       //waits for page to be opened
  // await parentPage.getByRole("button", {name:"New Tab"}).click();     //opens new page


  //Approach - 1 --> to switch between pages...
  const pagesArray:Page[] = await context.pages();
  console.log("Number of pages being created :- ", pagesArray.length);

  const parentPageTitle = await pagesArray[0].title();
  const childPageTitle = await pagesArray[1].title();

  console.log("Parent page title is :- ",parentPageTitle);
  console.log("Child page title is :- ",childPageTitle);

  console.log("------------------------------");
  
  //Approach - 2 --> directly using the pages created..

  console.log("Parent page title is :- ", await parentPage.title());
  console.log("Child page title is :- ",await childPage.title());



})