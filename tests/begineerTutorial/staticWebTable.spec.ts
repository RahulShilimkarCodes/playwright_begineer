import {test,expect,Locator} from '@playwright/test';

test("Static WebTable Testing", async ({page}) =>
{
    await page.goto("https://testautomationpractice.blogspot.com/");

    const webTableBody:Locator = page.locator("table[name='BookTable']>tbody");

    const webTableRows: Locator = webTableBody.locator("tr");                         //  - with locator chaining
    //const webTableRows: Locator = page.locator("table[name='BookTable']>tbody>tr");     - without locaor chaining...

    //Assertions on row count...

    await expect(webTableRows).toHaveCount(7);      //assertion directly on element...

    const rowCount:number = await webTableRows.count();
    console.log("Number of rows :- ", rowCount);

    expect(rowCount).toBeGreaterThanOrEqual(0);
    expect(rowCount).toBeGreaterThanOrEqual(7);
    expect(rowCount).toBe(7);


    // Assertions on column count...
    const webTableColumns:Locator = webTableRows.locator("th");       //using locator chaining...
    //const webTableColumns: Locator = page.locator("table[name='BookTable']>tbody>tr>th"); 

    await expect(webTableColumns).toHaveCount(4);

    const webTableHeaderColumnCount = await webTableColumns.count();
    console.log("Number of headers :- ",webTableHeaderColumnCount);

    expect(webTableHeaderColumnCount).toBe(4);
    expect(webTableHeaderColumnCount).toBeGreaterThanOrEqual(4);





    //fetching and printing data from specific row...
    const givenRowElement:Locator = webTableRows.nth(2).locator("td");    //will get all the td elements from 3rd row, since index from 0...


    const thirdElementTexts:string[] = await givenRowElement.allInnerTexts();
    console.log(thirdElementTexts);

    console.log("-------------------------------------------------------------------");

    for(let text of thirdElementTexts)
    {
      console.log(text);
    }

    await expect(givenRowElement.nth(0)).toContainText('Learn Java');     //index starts from 0...
    await expect(givenRowElement.nth(2)).toHaveText('Java');
    await expect(givenRowElement).toHaveText([ 'Learn Java', 'Mukesh', 'Java', '500' ]);

    console.log("----------------------------------------");












    

    //Reading all the data from table.....
    const tableBody:Locator = page.locator("table[name='BookTable']>tbody");
    const tableRows: Locator = tableBody.locator("tr");  
    const tableColumns:Locator = tableRows.locator("th");

    const rowsCount:number = await tableRows.count();
    const columnCount:number = await tableColumns.count();

    for(let i:number = 1 ; i < rowsCount ; i++)
    {
      for(let j:number = 0 ; j < columnCount ; j++)
      {
        const currentElement:Locator = tableRows.nth(i).locator("td").nth(j);
        const currentElementText:string = await currentElement.innerText();
        console.log(currentElementText);
      }
      console.log("----------------------------------------");
    }


    console.log("----------------------------------------");


    //second way to read all data from table

    const rows:Locator[] = await tableRows.all();       //gets all the row elements in an array of locator

    for(let row of rows.slice(0,1))     //takes only header i.e first element since end position is exclusive
    {
        const rowText:string[] = await row.locator("th").allInnerTexts();
        console.log(rowText);
    }

    console.log("----------------------------------------");

    for(let row of rows.slice(1))     //skips 1st element i.e Header - by saving from 2nd element to end of the array...
    {
        const rowText:string[] = await row.locator("td").allInnerTexts();
        console.log(rowText);
    }


        console.log("----------------------------------------");


    //print book names where author name is "Mukesh"

    //const rows:Locator[] = await tableRows.all();       //gets all the row elements in an array of locator

    let bookCount:number = 0;
    let books:string[]=[];
    for(let row of rows.slice(1))
    {
      const authorName:string = await row.locator("td").nth(1).innerText();

      if(authorName === "Mukesh")
      {
          const bookName:string = await row.locator("td").nth(0).innerText();
         //console.log(bookName);
          console.log(`Author name is ${authorName} and Book name is ${bookName}`);
          bookCount++;
          books.push(bookName);
      }
    }

    expect(bookCount).toBe(2);
    expect(books).toHaveLength(2);


    //total price of all the books...

    let totalPrice:number = 0;

    for(let row of rows.slice(1))
    {
      const priceString:string = await row.locator("td").last().innerText();
      totalPrice = totalPrice + parseInt(priceString) ;
    }
    console.log("Total price of all books is :- ",totalPrice);
    expect(totalPrice).toBe(7100);
})