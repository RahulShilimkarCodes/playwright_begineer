import{test,expect,Locator} from '@playwright/test'

test("UI action textbox", async ({page}) =>
{
  await page.goto("https://testautomationpractice.blogspot.com/");

  let nameField:Locator = page.getByRole("textbox",{name:"Name"});

  await expect(nameField).toBeVisible();
  await expect(nameField).toBeEnabled();

  let att:string|null = await nameField.getAttribute("maxlength");
  console.log(att);
  expect(att).toBe('15');

  await nameField.fill("Rahul Shilimkar");

  const textAtt:string = await nameField.inputValue();      //used for textbox post entering..  
  console.log(textAtt);
  expect(textAtt).toBe("Rahul Shilimkar");      //returning void, hence no await needed..

  await page.waitForTimeout(1000);

});


test("Radio Buttons", async({page}) =>
{
  await page.goto("https://testautomationpractice.blogspot.com/");

  const maleRadio:Locator = await page.getByRole("radio",{name:"Male"}).first();
  let checked:boolean = await maleRadio.isChecked();
  expect(checked).toBe(false);

  await maleRadio.check();
  checked = await maleRadio.isChecked();
  expect(checked).toBe(true);     // no await since working with boolean value and not locator..

  await expect(maleRadio).toBeVisible();
  await expect(maleRadio).toBeEnabled();

  await expect(maleRadio).toBeChecked();    //preferrable...
  
  await page.waitForTimeout(1000);
});

test.only("Checkbox test", async ({page}) =>
{
  await page.goto("https://testautomationpractice.blogspot.com/");

  let sundayCB:Locator = await page.getByLabel("Sunday");
  await sundayCB.check();

  await expect(sundayCB).toBeChecked();

  let days:string[] = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

  let daysLocator: Locator[] = days.map(day => page.getByLabel(day));
  expect(daysLocator.length).toBe(7);
  
  //Multiple ways to select checkboxes...


  // for(let dayLocator of daysLocator)
  // {
  //   await dayLocator.check();
  //   await expect(dayLocator).toBeChecked();
  // }

  // for(let dayLocator of days)
  // {
  //   await page.getByLabel(dayLocator).check();
  //   await expect(page.getByLabel(dayLocator)).toBeChecked();
  // }

  for(let dayLocator of days)
  {
    await page.getByRole('checkbox', {name:dayLocator}).check();
    await expect(page.getByRole('checkbox', {name:dayLocator})).toBeChecked();
  }

  //to uncheck the checkboxes...
  for(let dayLocator of days.slice(-3))     //selects the last 3 items from an array..
  {
    let day:Locator = await page.getByLabel(dayLocator);
    await day.uncheck();
    await expect(day).not.toBeChecked();

  }
  await page.waitForTimeout(1000);

  
  //to check the unselect checkboxes and uncheck the selected checkbox...
  for(let dayLocator of days)
  {
    let currentDay: Locator = await page.getByLabel(dayLocator);

    if(await currentDay.isChecked())
    {
      await currentDay.uncheck();
      await expect(currentDay).not.toBeChecked();
    }else{
      await currentDay.check();
      await expect(currentDay).toBeChecked();
    }
  }
  await page.waitForTimeout(1000);


  //unselect all
  for(let daysLocator of days)
  {
    let currentDay:Locator = await page.getByLabel(daysLocator);
      if(await currentDay.isChecked())
      {
        await currentDay.uncheck();
      }
  }
  await page.waitForTimeout(1000);


  //to select based on numbers..
  let randomOrder:number[] = [1,3,6];

  for(let order of randomOrder)
  {
      let currentDay:Locator = page.getByLabel(days[order]);
      await currentDay.check()
  }
  await page.waitForTimeout(1000);

  //unselect all
  for(let daysLocator of days)
  {
    let currentDay:Locator = await page.getByLabel(daysLocator);
      if(await currentDay.isChecked())
      {
        await currentDay.uncheck();
      }
  }
  await page.waitForTimeout(1000);

  //select only 1 based on value passed

  let requiredDay:string = "Friday";

  for(let dayLocator of days)
  {
    if(requiredDay.toLowerCase() === dayLocator.toLowerCase())
    {
      await page.getByLabel(dayLocator).check();
      await expect(page.getByLabel(dayLocator)).toBeChecked();
    }
  }
  await page.waitForTimeout(1000);
})