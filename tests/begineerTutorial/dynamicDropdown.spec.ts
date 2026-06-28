import {test,expect,Locator}from '@playwright/test';

test('dynamic dropdown handling', async({page}) =>
{
    await page.goto("https://www.flipkart.com/");

    await page.waitForTimeout(2000);
    await page.locator(".b3wTlE").click();

    await page.getByPlaceholder("Search for Products, Brands and More",{exact:true}).first().fill("Smart");

    await page.waitForTimeout(2000);

    const options:Locator = page.locator("ul>li");
    
    await expect(options).toHaveCount(8);
    
    const optionsCount:number = await options.count();
    expect(optionsCount).toBe(8);
    console.log("options count is ", optionsCount);


    //printing all the options..

    const optionsText:string[] = (await options.allTextContents()).map(option => option.trim());

    for(let opt of optionsText)
    {
      console.log(opt);
    }

    console.log("---------------------------------------------------------");

    //getting specific option..
    const secondOption:string|null = await options.nth(1).textContent();
    console.log(secondOption);


    console.log("---------------------------------------------------------");

    //using for loop
    for(let i:number = 0 ; i < optionsCount ; i++)
    {
    //  console.log(await options.nth(i).textContent());

      console.log(await options.nth(i).innerText());      //we can use this as well..
    }


     console.log("---------------------------------------------------------");

     for(let i:number = 0 ; i < optionsCount ; i++)
     {
      const option:string = await options.nth(i).innerText();

      if(option === "smart watch waterproof")
      {
        await options.nth(i).click();
        break;
      }
     }

    await page.waitForTimeout(2000);
})
