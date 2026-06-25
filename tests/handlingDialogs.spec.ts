//by default, playwright auot-dismiss the dialog, hence we dont need to handle them
//However, we can register the dialog handler before the action that trigerrs dailog to either dialog.accept() or dialog.dismiss()..

import{test,expect,Locator} from '@playwright/test';

test("simple dialog", async({page}) =>
{

  await page.goto("https://testautomationpractice.blogspot.com/");

  //dailog handling we need to use before the event that triggers the dailog/alert..
  //This enables event handling to handle the events/dialog...

  page.on('dialog', async (dialog) =>{      //dialog -> event handler

    console.log("Type of dialog is :- ", dialog.type());
    expect(dialog.type()).toBe('alert');

    console.log("Message on the dialog is :- ", dialog.message());
    expect(dialog.message()).toContain('alert box');

    dialog.accept();
  })

  //below will trigger the dialog/alert..
  await page.getByRole("button", {name:"Simple Alert", exact:true}).click();

  await page.waitForTimeout(2000);
});

test("Confirmation alert/Dialog", async({page})  =>
{
  await page.goto("https://testautomationpractice.blogspot.com/");

  page.on('dialog', async (dialog) =>{
    
  console.log("Type of the alert is :- ", dialog.type());
  expect(dialog.type()).toBe('confirm')

  console.log("Message on the dialog is :- ",dialog.message());
  expect(dialog.message()).toContain("Press a button!");

  //dialog.accept();        // to accept the dialog/alert....
  dialog.dismiss();       // to dismiss/cancel the dialog/alert....
  })

  await page.getByRole("button", {name:"Confirmation Alert", exact:true}).click();    //open confirmation dialog..

  const dialogText:string = await page.locator("#demo").innerText();

  expect(dialogText).toContain("Cancel");

  const messageElement:Locator = await page.locator("#demo");
  expect(messageElement).toHaveText("You pressed Cancel!");

  //us below in case of dialog accept
  //const messageElement:Locator = await page.locator("#demo");
  //expect(messageElement).toHaveText("You pressed OK!");
  
  await page.waitForTimeout(2000);
});

test("Prompt alert", async({page}) =>{
  
  await page.goto("https://testautomationpractice.blogspot.com/");

  page.on('dialog', async (dialog) =>{

    console.log("Type of the dialog/alert is :- ",dialog.type());
    expect(dialog.type()).toEqual('prompt');
    expect(dialog.type()).toBe('prompt');

    console.log("Message on the dialog is :- ", dialog.message());
    expect(dialog.message()).toContain("Please enter your name:");

    const dailogValue:string = dialog.defaultValue();
    console.log("Default value on the dialog is :- ", dailogValue);
    expect(dailogValue).toContain("Harry Potter");

    //passing the value inside the alert/dialog needs us to pass via accepting the alert/dialog

    dialog.accept('John Doe');

    const promptMessage:Locator = page.locator("#demo");
    expect(promptMessage).toHaveText("Hello John Doe! How are you today?");

    const dialogText:string = await page.locator("#demo").innerText();
    expect(dialogText).toContain("John Doe");
    console.log(dialogText);
    
  });

  await page.getByRole("button", {name:"Prompt Alert", exact:true}).click();    //open confirmation dialog..

})


