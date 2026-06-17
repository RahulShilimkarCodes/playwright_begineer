import { test, expect, Locator } from "@playwright/test";

test("Xpath demo", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");

  await expect(page.locator("//button[@class='start']")).toBeVisible;

  const daysCount = await page
    .locator("//label[@for='days']/parent::div/div")
    .count();
  console.log("Number of days in the week is :- ", daysCount);
  await expect(daysCount).toBeGreaterThanOrEqual(7);

  const days: Locator = await page.locator("//label[@for='days']/parent::div/div");

  let dayValue: string | null = await days.nth(3).textContent();
  console.log("Day on 4th position is :- ", dayValue);

  dayValue = await days.first().textContent();
  console.log("Day on First position is :- ", dayValue);

  dayValue = await days.last().textContent();
  console.log("Day on Last position is :- ", dayValue);


  const allDays:string[] = await days.allTextContents();

  for(let day of allDays)
  {
    console.log(day);
  }

  for(let day in allDays)
  {
    console.log("Day at position ",day," is now given as :- ",allDays[day]);
  }

  for(let day in allDays)
  {
    console.log("Day at position ",day," is now given as :- ",(allDays[day]).trim());
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

  for(let i = 0 ; i < 5 ; i++)
  {
    const dynamicButton:Locator = await page.locator("//button[starts-with(@name,'st')]");
    await dynamicButton.click();
  }
  
  await page.waitForTimeout(2000);

  for(let i = 0 ; i < 5 ; i++)
  {
    const dynamicButton:Locator = await page.getByRole("button",{ name : /START|STOP/ } );
    await dynamicButton.click();
  }
});
