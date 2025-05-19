const { test, expect } = require('@playwright/test');
test('E2E - Search a product and add to cart', async({page}) => {
    await page.goto ("https://automationexercise.com");
    await page.click('a[href="/products"]');
    await page.fill('#search_product','TShirt');
    await page.click('#submit_search');
    await Promise.all([
        page.waitForSelector('#cartModal', { state: 'visible' }),
        page.locator('text=Add to cart').first().click(),
      ]);
    await page.getByRole('link', { name: 'View Cart' }).click();
    // Validate cart and checkout button
    let descr = await expect(page.locator('.cart_description')).toContainText('Men Tshirt');
    await expect(page.locator('a.btn.check_out')).toBeVisible();
  // Proceed to checkout
  await page.waitForSelector('a.btn.check_out', { state: 'visible' });
  await page.locator('.check_out').click();
 await Promise.all([
  page.waitForSelector('#checkoutModal', { state: 'visible' }),
  
  page.locator('text=Continue On Cart').first().click(),
]);

const paragraphText = await page.locator('p').first().textContent();
console.log(paragraphText);
});
  

   
