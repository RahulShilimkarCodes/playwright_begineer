import {test,expect,Locator} from '@playwright/test';   //Locator is an interface

test("Static Webtable Handling", async ({page}) => 
{
  await page.goto("https://demowebshop.tricentis.com/");

  const productNames:Locator = await page.locator("h2.product-title");

  //to get text of the element using innerText() and textContent();  

  console.log(await productNames.nth(1).innerText());   //trims space - o/p - 14.1-inch Laptop  - R.T - string

  console.log(await productNames.nth(1).textContent());   //no trimming - o/p -             14.1-inch Laptop  - R.T - string | null

  console.log("--------------------------------");

  //to get all the texts..

  const productCount:number = await productNames.count();

  for(let i:number = 0 ; i < productCount ; i++)
  {
    console.log('product name at position ',i,' is ', await productNames.nth(i).innerText());
  }

  console.log("--------------------------------");

  for(let i:number = 0 ; i < productCount ; i++)
  {
    console.log('product name at position ',i,' is ', await productNames.nth(i).textContent());
  }

    console.log("--------------------------------");

  //post trimming

  const trimmedNames:string[] = (await productNames.allTextContents()).map(product => product.trim());
  
  for(let product of trimmedNames)
  {
    console.log(product);
  }


    console.log("--------------------------------");

    //trimming specific product

    const innerTextName:string = await productNames.nth(1).innerText();

    const textContentName:string|null = await productNames.nth(1).textContent();
    console.log("Timming :- ", await textContentName?.trim());      // ? - optional value check since null can also be passed here along with string


    //allInnerTexts() vs allTextContents() ---> both return string[] array...

        console.log("===============================");
    console.log("//=======================allInnerTexts() vs allTextContents() --->");

    const innerTextProductNames:string[] = await productNames.allInnerTexts();
    for(let product of innerTextProductNames)
    {
      console.log(product);
    }

    console.log("===============================");

    const textContentProductNames:string[] = await productNames.allTextContents();
    for(let product of textContentProductNames)
    {
      console.log(product);
    }

        console.log("===============================");

    //all() method... It returns arrays of locators..

    const products:Locator = await page.locator("h2.product-title");

    const productArray: Locator[] = await products.all();   //stores all the locators in an array.. 
    console.log(productArray);

    //Printing 2nd element---
    console.log("Element text at 2nd position is :- ", await productArray[1].innerText());

    //printing using locator array..
    for(let product of productArray)
    {
      console.log(await product.innerText());
    }

    //printing using locator array in..
    console.log();
    console.log("Printing using index........................");
    
    for(let index in productArray)
    {
      console.log(await productArray[index].innerText());
    }

})