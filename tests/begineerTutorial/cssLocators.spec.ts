import { test, expect, Locator } from "@playwright/test";

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

  await page.locator("input[value='Add to cart']").click();

  await page.locator("input[value='Search store']").click();

  await page.locator("a.ico-cart>span.cart-label").click();

  await page.locator("input[name='removefromcart']").check();

  await page.locator("#CountryId").selectOption("41");

  await page.locator("input[name='estimateshipping']").click();

  //        body > div > *:first-child
  //        body > div > *:last-child
  //        body > div > *:nth-child(3)   -> index starts from 1

  //        Class starts with "ma"  --->  p[class^='ma'] 
  //        Class ends with "ub"  --->   p[class$='ub'] 
  //        Class contains "ai"  --->   p[class*='ai']

  await page
    .locator("div[class='terms-of-service']>input#termsofservice")
    .click();

  await page.locator("button#checkout").click();

  await page.locator("input[value='Checkout as Guest']").click();

  //Playwright only allows .fill() on editable elements like <input>, <textarea>, <select>, or [contenteditable]
  await page.locator("div[class='edit-address']>div:first-child>input").fill("Virat");
  await page.locator("div[class='edit-address']>div:nth-child(2)>input").fill("Kohli");
  await page.locator("div[class='edit-address']>div:last-child>input").fill("fax number");
  await page.locator("div[class='edit-address']>div[class^=in]:nth-child(3)>input").fill("virat@rcb.com");
  await page.locator("div[class='edit-address']>div[class^=in]:nth-child(7)>input").fill("Bangalore");
  await page.locator("div[class='edit-address']>div[class$=ts]:nth-child(8)>input").fill("Chinasswamy");
  await page.locator("div[class='edit-address']>div[class$=ts]:nth-child(10)>input").fill("01556");
  await page.locator("div[class='edit-address']>div[class*=put]:nth-child(11)>input").fill("12356889954");



  await page.waitForTimeout(2000);
});
