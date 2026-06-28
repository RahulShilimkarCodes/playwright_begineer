import{test,expect,Locator} from '@playwright/test';

test("Automating Ecommerce website", async({page})  =>  {

  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

  await page.locator("#userEmail").fill("james@bondd.com");
  await page.locator("#userPassword").fill("Iamking@000");

  await page.locator("#login").click();

  //below allInnerTexts() method is also not sync..hence might also give [], hence use below

  await page.waitForLoadState('networkidle');     //network goes idle only when UI is fully loaded..

  //alternate for above statement is as below---
  await page.locator("div.card-body>h5>b").first().waitFor();   //waits for this element to be loaded, works only with 1 element not list...

  await page.locator("div.card-body>h5>b").first().isVisible();
  const products: string[] = await page.locator("div.card-body>h5>b").allInnerTexts();
  console.log(products);

  for(let product of products)
  {
    console.log(product);
  }

  //selecting Zara Coat 3 item from online shopping page...

  await page.waitForLoadState('networkidle');
  await page.locator("div.card-body").first().waitFor();

  const productSection: Locator[] = await page.locator("div.card-body").all();

  let productName:string = 'ZARA COAT 3';

  for(let i:number = 0 ; i < productSection.length; i++)
  {
      const currentItem = productSection[i].locator("h5>b");
      const currentItemName = await currentItem.innerText();

      if(currentItemName === productName)
      {
        // await productSection[i].getByRole("button",{name:' Add To Cart'}).click();
        // break;

        //playwright locator
        await productSection[i].getByText(' Add To Cart').click();
        break;

        //css selector
        // await productSection[i].locator("text= Add To Cart").click();
        // break;
      }
  }

  await page.locator("button[routerlink='/dashboard/cart']").click();

  await page.waitForLoadState('networkidle');

  const cartItem = page.locator("div.cartSection>h3");
  let itemPresent:boolean = await cartItem.isVisible();
  expect(itemPresent).toBeTruthy();
  await expect(cartItem).toHaveText(productName);

  const cartItemName = await cartItem.innerText();
  expect(cartItemName).toEqual(productName);

  await page.waitForTimeout(2000);

  await page.getByRole("button", {name:'Buy Now'}).click();

  //Filling up the payment details..


  //credit card number
  const creditCardNumber: Locator = page.locator("input.text-validated").nth(0);
  await creditCardNumber.fill("");
  await creditCardNumber.fill("8923 9931 9292 2293");

  //expiry month and date
  await page.locator("select.ddl").first().selectOption({label:'04'});
  await page.locator("select.ddl").last().selectOption({label:'25'});

  //cvv 
  await page.locator("input[class='input txt']").nth(0).fill("133");

  //name
  await page.locator("input[class='input txt']").nth(1).fill("James Bond");

  //applying coupon
  await page.locator("input[name='coupon']").fill("rahulshettyacademy");

  //getting email id
  const userEmailID = await page.locator("input.text-validated").nth(1).inputValue();
  console.log("User email is :- ",userEmailID);

  //entering country
  await page.getByPlaceholder("Select Country").pressSequentially("ind");

  await page.locator("section.ta-results>button").first().waitFor();

  const allCountries: Locator = page.locator("section.ta-results>button");

  const countryCount:number = await allCountries.count();

  for(let i = 0 ; i < countryCount ; i++)
  {
    const currentCountry = allCountries.nth(i);
    const currentCountryName = await currentCountry.innerText();

    if(currentCountryName.trim() === 'India')
    {
      await currentCountry.click();
      break;
    }

  }

  await page.locator("a.action__submit").click();



  await page.waitForTimeout(10000);
})