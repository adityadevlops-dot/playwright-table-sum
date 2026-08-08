const { chromium } = require('playwright');

async function main() {
  // 1. Launch a headless browser
  const browser = await chromium.launch();
  const page = await browser.newPage();
  let totalSum = 0;

  // 2. Loop through each page from Seed 29 to Seed 38
  for (let seed = 29; seed <= 38; seed++) {
    const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`;
    console.log(`Navigating to: ${url}`);
    await page.goto(url);
    
    // Wait for the dynamically generated table to render
    await page.waitForSelector('table');
    
    // Extract numbers from all table cells ('td' tags) and convert to numbers
    const cells = await page.$$eval('td', tds => 
      tds.map(td => Number(td.textContent.trim()))
    );
    
    // Sum the values for the current page
    const pageSum = cells.reduce((sum, val) => sum + val, 0);
    console.log(`Seed ${seed} Sum: ${pageSum} (Cells counted: ${cells.length})`);
    totalSum += pageSum;
  }

  // 3. Print the final TOTAL sum in the logs (required by the assignment)
  console.log(`TOTAL SUM: ${totalSum}`);
  
  await browser.close();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
