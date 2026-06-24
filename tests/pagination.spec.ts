import{test,expect,Locator} from '@playwright/test';

test("Pagination test cases", async({page}) =>
{
  await page.goto("https://datatables.net/");

  //to print only the first page element...

  const firstPageRows:Locator[] = await page.locator("#example>tbody>tr").all();

  for(let row of firstPageRows)
  {
    const rowValue:string = await row.innerText();
    console.log(rowValue);
  }

  console.log("---------------------------------------------------------");

  //to print data from all the pages of the table

  let hasMorePages:boolean = true;

  while(hasMorePages)
  {
    const currentPageRows:Locator[] = await page.locator("#example>tbody>tr").all();

    for(let row of currentPageRows)
    {
      const rowValue:string = await row.innerText();
      console.log(rowValue);
    }

    const nextButton:Locator = await page.getByLabel("Next", {exact:true});
    const isEnabled:string|null = await nextButton.getAttribute('class');


    if(isEnabled?.includes('disabled'))
    {
      hasMorePages=false;
    }
    else{
      await page.waitForTimeout(1000);
      await nextButton.click();
    }

    console.log("---------------------------------------------------------");
  }

  await page.waitForTimeout(2000);
});

test("Filtering logic validation", async ({page})  =>
{
  await page.goto("https://datatables.net/");

  const filterOption:string[] = await page.locator("#dt-length-0").selectOption({value:"25"});

  const tableRows = page.locator("table#example>tbody>tr");
  await expect(tableRows).toHaveCount(25);

  const rowLength:number = await tableRows.count();
  expect(rowLength).toBe(25);

  const rows:Locator[] = await page.locator("table#example>tbody>tr").all();
  await expect(rows.length).toBe(25);

  await page.waitForTimeout(2000);
});

test("Filtering the username", async({page}) =>
{
  await page.goto("https://datatables.net/");
  
  const searchBox:Locator = page.getByLabel("Search:");
  await searchBox.fill("Unity Butler");

  const tableRows:Locator[] = await page.locator("table#example>tbody>tr").all();

  console.log("Number of rows found for given search is :- ", tableRows.length);

  const rowLength:number = tableRows.length;

  let matchFound:boolean = false;

  if(rowLength>=1)
  {
    for(let row of tableRows)
    {
      const tableData:string = await row.innerText();
      console.log(tableData);

      if(tableData?.includes("Unity Butler"))
      {
          matchFound = true;
          console.log("User found......result is present..");
          break;
      }else{
          console.log("No result found...");
      }
    }
  }
  expect(matchFound).toBe(true);
  expect(matchFound).toBeTruthy();
  await page.waitForTimeout(2000);
})