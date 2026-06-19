import{test,expect,Locator} from '@playwright/test'

test("Static single select dropdown", async ({page}) =>
{
  await page.goto("https://testautomationpractice.blogspot.com/");

  const dropdown:Locator = await page.locator("#country");


  //Selecting the dropdown options...
  await dropdown.selectOption("India");   //select by visible text...
  await page.waitForTimeout(1000);

  await dropdown.selectOption({value:'germany'});     //select by value..
  await page.waitForTimeout(1000);

  await dropdown.selectOption({index:5});     //select by index...
  await page.waitForTimeout(1000);

  await dropdown.selectOption({label:"China"});     //select by index...index starts from 0.
  await page.waitForTimeout(1000);


  //Check number of options/count from the dropdown...
  const dropdownElements:Locator = page.locator("#country>option");    //single or multiple element, returnt type is always Locator...
  console.log("Size of the dropdown ",await dropdownElements.count());
  await expect(dropdownElements).toHaveCount(10);

  let optionCount:number = await dropdownElements.count();
  expect(optionCount).toBe(10);

  //Printing all the dropdown options...
  let dropdownTexts:string[] = await dropdownElements.allTextContents();

  for(let option of dropdownTexts)
  {
    console.log(option.trim());
  }

  console.log("----------------------------------------------------------------------------------");
  //way-2 using map() function...

  let trimmedDropdownValue:string[] = dropdownTexts.map(text => text.trim());
  for(let option of trimmedDropdownValue)
  {
    console.log(option);
  }

  //presence of options in the dropdown....checks if option is present in the dropdown...
  expect(trimmedDropdownValue).toContain("China");

});

test("Multi select dropdown", async ({page}) =>
{
  await page.goto("https://testautomationpractice.blogspot.com/");

  let colorDropdown:Locator = await page.locator("#colors");

  //selecting Options:-
  await colorDropdown.selectOption(["Red","Blue","Green"]);     //using visible text
  await page.waitForTimeout(1000);

  await colorDropdown.selectOption([{value:'white'},{value:'yellow'}]);    //using value attribute
  //await colorDropdown.selectOption(['white','yellow'])     //using value attribute
  await page.waitForTimeout(1000);

  await colorDropdown.selectOption([{label:'Red'},{label:'Green'}]);
  await page.waitForTimeout(1000);

  await colorDropdown.selectOption([{index:4},{index:5}]);
  await page.waitForTimeout(1000);

  //get the count of options in the dropdown...

  const colorOptions = await page.locator("#colors>option");
  await expect(colorOptions).toHaveCount(7);

  const colorOptionCount:number = await colorOptions.count();
  expect(colorOptionCount).toBe(7);

  //getting all options in the dropdown
  const colorDropdownOptions:string[] = await colorOptions.allTextContents();

  const trimmedColorOptions:string[] = colorDropdownOptions.map(option => option.trim())
  console.log(trimmedColorOptions);

  for(let option of trimmedColorOptions)
  {
    console.log(option);
  }

  console.log("_________________________----------------------");


  for(let option of colorDropdownOptions)
  {
    console.log(option.trim());
  }


  expect(trimmedColorOptions).toContain("Blue");
});