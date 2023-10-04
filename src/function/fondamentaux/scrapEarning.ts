import * as puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe',
    headless: false,
    defaultViewport: null,
    args: ['--start-maximized'],
  });

  const page = await browser.newPage();
//   await page.setViewport({ width: 1920, height: 1080 });

  await page.goto('https://fr.tradingview.com/');

  await page.waitForSelector('#tv-content > div.js-main-page-promo > div.main-cC_RXcAi.js-main-page-promo-container > div > div.actions-cC_RXcAi.translateDownOpacityDelay-cC_RXcAi > button > span');

  const element = await page.$('#tv-content > div.js-main-page-promo > div.main-cC_RXcAi.js-main-page-promo-container > div > div.actions-cC_RXcAi.translateDownOpacityDelay-cC_RXcAi > button > span');

  if(element !== null){
      await element.click();
  }

  await page.waitForSelector('#overlap-manager-root > div > div > div.wrap-VeoIyDt4 > div > div > div.modal-mQsMiuFL.dialog-VeoIyDt4.dialog-aRAWUDhF.rounded-aRAWUDhF.shadowed-aRAWUDhF.fullscreen-aRAWUDhF > div > div.headerSearchInputBlock-Zk78EZvB > span > form > input');
  const inputElement = await page.$('#overlap-manager-root > div > div > div.wrap-VeoIyDt4 > div > div > div.modal-mQsMiuFL.dialog-VeoIyDt4.dialog-aRAWUDhF.rounded-aRAWUDhF.shadowed-aRAWUDhF.fullscreen-aRAWUDhF > div > div.headerSearchInputBlock-Zk78EZvB > span > form > input');

  if (inputElement !== null) {

    await inputElement.type('aapl');
    await page.keyboard.press('Enter');
    await page.waitForNavigation();

    await page.mouse.move(72, 113);
    await page.mouse.down({ button: 'left' });
    await page.mouse.up({ button: 'left' });

    await page.mouse.move(156, 113);
    await page.mouse.down({ button: 'left' });
    await page.mouse.up({ button: 'left' });

  }else{
        console.log('css de l element a changé');
  }


  // Émulez le déplacement de la souris à ces coordonnées.


})();
