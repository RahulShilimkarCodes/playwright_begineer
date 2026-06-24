import{test,expect,Locator} from '@playwright/test'

test("Dynamic WebTable Tests", async ({page}) =>
{
  await page.goto("https://practice.expandtesting.com/dynamic-table");

  const webTable:Locator = await page.locator("table[class='table table-striped']>tbody");
  await expect(webTable).toBeVisible();


  const webTableRows:Locator[] = await webTable.locator("tr").all();

  await expect(webTableRows).toHaveLength(4);
  
  const rowLength:number = await webTableRows.length;
  console.log("Number of rows in webtable is :- ",rowLength)
  expect(rowLength).toBe(4);


  //1. Reading the Chrome Browser and getting CPU usage from it...

  let currentCPU:string="null" ;
  for(let row of webTableRows)
  {
    const currentRow:Locator = row.locator("td").first();
    const browserName:string = await currentRow.innerText();

    if(browserName === "Chrome")
    {
      //currentCPU = await row.locator("td").nth(3).innerText();
      currentCPU = await row.locator('td:has-text("%")').innerText();     //since position is dynamic...

      console.log(`CPU usage of ${browserName} is ${currentCPU}`);

      break;
    }
  }

  //Comparing the currentCPU value with the table Row...
  const tableValue = await page.locator("#chrome-cpu").innerText();
  const tableCPUValue = tableValue.split(":")[1].trim();
  console.log("CPU value from table data is ", tableCPUValue);

  //expect(currentCPU).toBe(tableCPUValue);
  expect(tableCPUValue).toContain(currentCPU);

  if(tableCPUValue.includes(currentCPU))
  {
    console.log("Value fetched correctly.........")
  }else{
      console.log("Value is not fetched correctly.........")
  }



  await page.waitForTimeout(3000);
})