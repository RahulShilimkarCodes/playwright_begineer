import { test, expect } from "@playwright/test";

test("CSS Locator Test", async ({ page }) => {
  await page.goto("https://demowebshop.tricentis.com/books");
  await page.locator("#small-searchterms").fill("Computing");
  await page.locator("input[value='Search']").click();
  //locator() - wont return any promise, hence await can be skipped for those..
  //however if using with fill() or click(),etc. we will need to add await..
  //await is needed for all methods which are returning promise..

  await page
    .locator("#products-orderby")
    .selectOption({ label: "Name: Z to A" });
  //const option = await page.locator("#products-orderby option").nth(2); // 3rd option

  await page.locator("#products-pagesize").selectOption({ label: "12" });
});
