import{test,expect, chromium} from '@playwright/test';

test("Handle authentication popup-1", async ()  => {

  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://admin:admin@the-internet.herokuapp.com/basic_auth")

  await page.waitForLoadState();

  await expect(page.locator("//p[contains(text(),'Congratulations!')]")).toContainText("Congratulations");
  await expect(page.locator("//p[contains(text(),'Congratulations!')]")).toHaveText("    Congratulations! You must have the proper credentials.");


  await page.waitForTimeout(1000);

});

test.only("Handle authentication popup-2", async ()  => {

  const browser = await chromium.launch();
  const context = await browser.newContext(
    {httpCredentials:{username:'admin',password:'admin'}}
  );
  const page = await context.newPage();

  await page.goto("https://the-internet.herokuapp.com/basic_auth")

  await page.waitForLoadState();

  await expect(page.locator("//p[contains(text(),'Congratulations!')]")).toContainText("Congratulations");
  await expect(page.locator("//p[contains(text(),'Congratulations!')]")).toHaveText("    Congratulations! You must have the proper credentials.");


  await page.waitForTimeout(1000);

});