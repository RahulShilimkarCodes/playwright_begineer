import {test,expect,Locator} from '@playwright/test';

test("Handling Input Date Picker", async({page})  =>
{

  await page.goto("https://testautomationpractice.blogspot.com/");

  const dateInput: Locator = await page.locator("input#datepicker");
  await expect(dateInput).toBeVisible();

  dateInput.fill("05/06/2024");

  await page.waitForTimeout(2000);
});

test.only("Handling Normal Date Picker", async({page})  =>
{

  await page.goto("https://testautomationpractice.blogspot.com/");

  const dateInput: Locator = await page.locator("input#datepicker");
  await expect(dateInput).toBeVisible();

  dateInput.fill("05/06/2024");

  await page.waitForTimeout(2000);
});