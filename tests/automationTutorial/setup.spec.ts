//use npm init playwright@latest - to install playwright

import{test,expect,chromium, Locator} from '@playwright/test';

test.only("First Playwright test", async ()  =>{

  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  const title = await page.title();
  console.log("Title of the webpage is ", title);

  await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");  

  await page.locator("#username").fill("rahulshettyacademy");
  await page.locator("#password").fill("Learning@830$3mK2)");

  await page.getByRole("checkbox", {name:"terms"}).click();
  await page.locator("#signInBtn").click();

  const errorMessage:string = (await page.locator("div.alert-danger").innerText()).trimStart();
  console.log(errorMessage);

  const errorSection: Locator = page.locator("div.alert-danger");
  expect(errorSection).toHaveText("Incorrect username/password.")
  expect(errorSection).toContainText("username/password.")

  const errorMessageText:string|null = await page.locator("div.alert-danger").textContent();
  console.log(errorMessageText);
  expect(errorMessageText).toContain(" username/password.")

  await page.waitForTimeout(2000);

  const headers: Locator = await page.getByRole('link',{name:"Free Access to InterviewQues/ResumeAssistance/Material"});
  await expect(headers).toHaveAttribute('class','blinkingText');

  const [childPage] = await Promise.all([
    context.waitForEvent('page'),
    headers.click()
  ]);

  // const redText:string = await childPage.locator("p[class='im-para red']").inputValue();
  // console.log(redText);

  const redTextValue:string = await childPage.locator("p[class='im-para red']").innerText();
  console.log(redTextValue);

  const emailID:string = redTextValue.split("@")[1].split(" ")[0].split(".")[0];
  console.log(emailID);

  await page.waitForTimeout(2000);

  await page.bringToFront();      //brings back focus to parent page

  //Entering valid credentials..

  await page.locator("#username").fill("");   //clearing out the field using fill() method...
  await page.locator("#password").fill("");   //clearing out the field using fill() method...

  await page.locator("#username").fill(emailID);
  await page.locator("#password").fill("Learning@830$3mK2");

  const username:string = await page.locator("#username").inputValue();
  console.log("user name is :- ",username);

  
  await page.locator("select.form-control").selectOption({value:'teach'});

  await page.getByLabel("User",{exact:true}).click();

  await page.locator("#okayBtn").click();

  let buttonChecked:boolean = await page.getByLabel("User",{exact:true}).isChecked(); 
  console.log(buttonChecked);
  expect(buttonChecked).toBeTruthy();

  await expect(page.getByLabel("User",{exact:true})).toBeChecked();

  await page.getByRole("checkbox", {name:"terms"}).check();
  await expect(page.getByRole("checkbox", {name:"terms"})).toBeChecked();

  await page.getByRole("checkbox", {name:"terms"}).uncheck();

  await expect(page.getByRole("checkbox", {name:"terms"})).not.toBeChecked();

  expect(await page.getByRole("checkbox", {name:"terms"}).isChecked()).toBeFalsy();   //since not checked...


  await page.locator("#signInBtn").click();

  const productTitle: Locator = page.locator(".card-title>a");

  const firstProduct:string = await productTitle.first().innerText();
  console.log(firstProduct);

  const secondProduct:string = await productTitle.nth(1).innerText();     //index start's from 0...
  console.log(secondProduct);

  const thirdProduct:string = await productTitle.nth(2).innerText();
  console.log(thirdProduct);

  const fourthProduct:string = await productTitle.last().innerText();
  console.log(fourthProduct);

  console.log("-------------------------------------------------------------------------");

  //Approach - 2
  const products: Locator[] = await productTitle.all();

  for( let product of products){
    console.log(await product.innerText());
  }

  console.log("-------------------------------------------------------------------------");

  //Approach - 3
  const productsList : string[] = await page.locator(".card-title>a").allInnerTexts();
  //Note:- allTextContents() - do not wait for elements to completely load hence can also give null string array..
  console.log(productsList);

  await page.waitForTimeout(4000);
});

test("Second Playwright test", async ({browser})  =>{

  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  
  await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
});

test("Third Playwright test", async ({context})  =>{

  const page = await context.newPage();

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
});

test("Fourth Playwright test", async ({page})  =>{

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
});

// If we uncomment below, it will run only 1 test which is this one since given as test.only()..
// test.only("Fourth Playwright test", async ({page})  =>{

//   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
// });