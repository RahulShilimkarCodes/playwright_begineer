import{test,expect,Locator, Frame, FrameLocator} from '@playwright/test';

test("Frame validations", async({page}) =>
{
  await page.goto("https://ui.vision/demo/iframes");

  // count number of frames on the webpage
  const frameCount: Frame[] = page.frames();
  console.log("Number of frames on the webpage is :- ", frameCount.length);

  //Approach-1:-

  const formFrame: Frame | null = page.frame({url: "https://docs.google.com/forms/d/e/1FAIpQLScP-K8zi-9ar0MCq93D3VIFhegSNPveBfdLqiMfTYR9Q1iSKQ/viewform?embedded=true",});
  // above we can pass either frame URL or frame name....

  if (!formFrame) throw new Error('Target frame not found');

  await formFrame.locator('#i12').click();
  await formFrame.getByLabel('Other response').fill('Rahul');

  const childs: Frame[] = await formFrame.childFrames();        //works only with page.frame() and not page.frameLocator()
  console.log("Number of child frames are :- ", childs.length);

  //to work with child frames
  //childs[0].locator("#id").click();   -- working with first child frame...



  //Approach-2:- using frameLocator - we can use any frame attribute to locate the frame..

  await page.goto("https://bonigarcia.dev/selenium-webdriver-java/iframes.html");

  const secondFrame : FrameLocator= page.frameLocator("#my-iframe");        //css Locator.
  let text:string = await secondFrame.locator("#content>p:nth-child(3)").innerText();
  console.log(text);

  console.log("-----------------------------------------");



  //Way-2:-
  text = await page.frameLocator("#my-iframe").locator("#content>p:nth-child(5)").innerText();
  console.log(text);

  await page.waitForTimeout(2000);


  await page.goto("https://www.hyrtutorials.com/p/frames-practice.html");

    const hyrFrame: FrameLocator = page.frameLocator("#frm2");
    await hyrFrame.locator("input#firstName").fill("Rahul");

    await page.frameLocator("#frm2").locator("input#lastName").fill("Shilimkar");





});