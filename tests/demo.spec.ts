import { test, expect } from "@playwright/test";

test("First Playwright Test", async ({ page }) => {
  await page.goto("https://automationpractice.techwithjatin.com/");
  const pageTitle: string = await page.title();
  await expect(page).toHaveTitle("Automation Practice");
  await expect(pageTitle).toBe("Automation Practice");
  const pageURL: string = await page.url();
  await expect(page).toHaveURL(pageURL);
  await expect(page).toHaveURL(/techwithjatin.com/); //regex...
  console.log("Current URL of the webpage is :-", pageURL);
});
