const { chromium } = require('playwright');

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  let totalSum = 0;

  for (let seed = 29; seed <= 38; seed++) {
    const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`;
    console.log(`Navigating to: ${url}`);
    await page.goto(url);
    await page.waitForSelector('table');
    
    const cells = await page.$$eval('td', tds => 
      tds.map(td => Number(td.textContent.trim()))
    );
    const pageSum = cells.reduce((sum, val) => sum + val, 0);
    console.log(`Seed ${seed} Sum: ${pageSum} (Cells counted: ${cells.length})`);
    totalSum += pageSum;
  }

  console.log(`TOTAL SUM: ${totalSum}`);
  await browser.close();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
