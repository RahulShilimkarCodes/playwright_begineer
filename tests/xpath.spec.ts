import { test, expect, Locator } from "@playwright/test";

test("Xpath demo", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");

  await expect(page.locator("//button[@class='start']")).toBeVisible;

  const daysCount = await page.locator("//label[@for='days']/parent::div/div").count();
  console.log("Number of days in the week is :- ", daysCount);
  await expect(daysCount).toBeGreaterThanOrEqual(7);

  const days: Locator = await page.locator(
    "//label[@for='days']/parent::div/div",
  );

  let dayValue: string | null = await days.nth(3).textContent();
  console.log("Day on 4th position is :- ", dayValue);

  dayValue = await days.first().textContent();
  console.log("Day on First position is :- ", dayValue);

  dayValue = await days.last().textContent();
  await expect(await days.last()).toHaveText("Saturday");
  console.log("Day on Last position is :- ", dayValue);

  const allDays: string[] = await days.allTextContents();

  for (let day of allDays) {
    console.log(day);
  }

  for (let day in allDays) {
    console.log("Day at position ", day, " is now given as :- ", allDays[day]);
  }

  for (let day in allDays) {
    console.log(
      "Day at position ",
      day,
      " is now given as :- ",
      allDays[day].trim(),
    );
  }

  const obj: any = { a: 1, b: 2, c: 3 };

  for (let key in obj) {
    console.log(key); // a, b, c
    console.log(obj[key]); // 1, 2, 3
  }

  const daysArray: (string | number)[] = ["Mon", "Tue", "Wed"];
  for (let index in daysArray) {
    console.log(index); // 0, 1, 2
    console.log(daysArray[index]); // Mon, Tue, Wed
  }

  const weekdays: string[] = ["Mon", "Tue", "Wed"];
  for (let day of weekdays) {
    console.log(day); // Mon, Tue, Wed
  }

  //      Key Differences...
  //    for...in → indexes/keys
  //    for...of → values/elements

  for (let i = 0; i < 5; i++) {
    const dynamicButton: Locator = await page.locator(
      "//button[starts-with(@name,'st')]",
    );
    await dynamicButton.click();
  }

  await page.waitForTimeout(2000);

  for (let i = 0; i < 5; i++) {
    const dynamicButton: Locator = await page.getByRole("button", {
      name: /START|STOP/,
    });
    await dynamicButton.click();
  }

  const confirmationAlert: Locator = await page.locator(
    "//button[@id='confirmBtn']",
  );
  await expect(confirmationAlert).toContainText("Confirmation");
  console.log(await confirmationAlert.textContent());

  const promptAlert: Locator = await page.locator("//button[@id='promptBtn']");
  await expect(promptAlert).toContainText("Prompt");
  console.log(await promptAlert.textContent());

  const button = page.locator("//button[@class='start' or @class='stop']");    //no await - Creating a Locator is synchronous — it’s just a handle to the element(s), not an action.
  await expect(button).toBeVisible(); // ✅ needs await
  const text = await button.textContent(); // ✅ needs await
  await button.click(); // ✅ needs await

  //⚡ Rule of thumb
  //  No await → when you’re just defining the locator (page.locator(...)).
  //  Yes await → when you’re interacting with it (click, fill, get text, assertions, etc.).

  const tableHeader:Locator = page.locator("//table[@name='BookTable']/child::tbody/tr/th");
  const tableSize:number = await tableHeader.count();
  console.log("Number of headers in table is ",tableSize);
  await expect(await tableHeader.count()).toBeGreaterThanOrEqual(4);

  const tableHeaders:Locator = page.locator("//table[@name='BookTable']/child::tbody/tr/th");
  let tableHeaderValues:string[] = await tableHeaders.allTextContents();
  console.log(tableHeaderValues);

  
});
