import { test, expect } from "@playwright/test";

test("CSS Locator Test", async ({ page }) => {
  await page.goto("https://demowebshop.tricentis.com/books");
  await page.locator("#small-searchterms").fill("Computing");
  await page.locator("input[value='Search']").click();

  await page.locator("#products-orderby").selectOption({label:"Name: Z to A"});
  //const option = await page.locator("#products-orderby option").nth(2); // 3rd option

  await page.locator("#products-pagesize").selectOption({label:"12"});
});
