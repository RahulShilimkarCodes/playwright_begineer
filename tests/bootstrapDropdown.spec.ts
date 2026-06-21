import{test,expect,Locator} from '@playwright/test';

test("Orange HRM bootstrap dropdown", async ({page}) =>
{
  await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

  await page.getByRole("textbox", {name:'Username'}).fill("Admin");

  await page.getByRole("textbox", {name:'Password'}).fill("admin123"); 

  await page.getByRole("button", {name: 'Login' , exact:true}).click();

  const mainMenu:Locator = await page.locator("ul[class='oxd-main-menu']>li");

  const pimLocator: Locator = await mainMenu.nth(1);
  await pimLocator.click();

  // const jobTitle:Locator = await page.locator("div[class='oxd-form-row']>div>div:nth-child(6)");

  // await jobTitle.locator("div[class='oxd-select-wrapper']>div>div:last-child").click();   // Locator chaining..

  await page.locator("div[class='oxd-select-wrapper']>div>div:last-child").nth(2).click();
  await page.waitForTimeout(2000);


  const jobTitleOptions = await page.locator("div[role='listbox']>div");
  const jobTitleOptionsCount = await jobTitleOptions.count();
  console.log("Count of options is ",jobTitleOptionsCount);

  const jobOptions:string[] = (await (jobTitleOptions.allTextContents())).map(option=>option.trim());

  for(let option of jobOptions)
  {
    console.log(option);
  }

  for(let i = 0 ; i < jobTitleOptionsCount ; i++)
  {
      const text = await jobTitleOptions.nth(i).innerText();

      if(text ===  "Chief Technical Officer")
      {
        jobTitleOptions.nth(i).click();
        break;
      }
  }

  await page.waitForTimeout(2000);

})