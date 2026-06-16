import { test, expect } from "@playwright/test";

test("Playwright built in locators demo", async ({ page }) => {
  await page.goto("https://automationpractice.techwithjatin.com/");
  await expect(page).toHaveTitle("Automation Practice");

  await page.getByPlaceholder("Search").fill("T-shirt");
  await page.locator('button[name="submit_search"]').click();

  await page.locator("#selectProductSort").selectOption("price:desc");

  await page
    .getByRole("link", { name: "Faded Short Sleeves T-shirt" })
    .first()
    .click();

  await page.getByRole("button", { name: "Add to cart" }).click();

  await page.getByRole("link", { name: "Proceed to checkout" }).click();

  await page.getByRole("link", { name: "Proceed to checkout" }).click();

  await page.getByRole("link", { name: "Women" }).first().click();

  await page.getByRole("link", { name: "Dresses" }).first().click();

  await page.getByRole("link", { name: "Summer Dresses" }).last().click();

  await page.getByRole("link", { name: "Printed Summer Dress" }).nth(1).click();

  await page.getByRole("button", { name: "Add to cart" }).click();

  await page.getByRole("link", { name: "Proceed to checkout" }).click();

  await page.getByRole("link", { name: "Proceed to checkout" }).click();

  await page.goto("https://testautomationpractice.blogspot.com/");

  await page.getByPlaceholder("Enter Name").fill("Virat Kohli");

  await page.getByPlaceholder("Enter EMail").fill("virat@rcb.com");

  await page.getByPlaceholder("Enter Phone").fill("213233212");

  await page.getByLabel("Male", { exact: true }).check();
  await expect(page.getByLabel("Male", { exact: true })).toBeChecked();

  await page.getByLabel("Sunday").click();
  await page.getByLabel("Monday").click();
  await page.getByLabel("Friday").click();
  await page.getByLabel("Wednesday").click();

  await page.locator("#country").selectOption("australia"); //value will be shared here

  await page.locator("#colors").selectOption("green");

  await page.locator("#animals").selectOption("giraffe");

  await page.getByRole("link", { name: "Home", exact: true }).last().click();

  await page.getByRole("button", { name: "START" }).click();

  await page.getByRole("button", { name: "Copy Text" }).dblclick();

  await page.getByRole("link", { name: "Apple", exact: true }).click();

  //await page.getByRole("link", { name: "iPhone" }).click();
  await page.getByLabel("iPhone", { exact: true }).click();

  await page.getByRole("link", { name: "iphone 17 pro" }).first().click();

  //await page.getByRole("link", { name: "Buy" }).last().click();
  await page.getByLabel("Buy, iPhone 17 Pro").last().click();
});
