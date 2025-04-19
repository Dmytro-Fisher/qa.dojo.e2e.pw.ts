import { test, expect } from '@playwright/test';
import {credentials} from "../../credentials";

test('e2e buy flow', async ({ page }) => {
  await page.goto('https://coffee-cart.app/');
  await expect(page.locator('[data-test="Cappuccino"]')).toBeVisible();
  await expect(page.locator('#app')).toContainText('Cappuccino $19.00');
  await page.locator('[data-test="Cappuccino"]').click();
  await expect(page.locator('[data-test="checkout"]')).toBeVisible();
  await page.locator('[data-test="checkout"]').click();
  await expect(page.getByText('Payment details×We will send')).toBeVisible();
  await page.getByRole('textbox', { name: 'Name' }).click();
  await page.getByRole('textbox', { name: 'Name' }).fill(credentials.name);
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill(credentials.email);
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByRole('button', { name: 'Thanks for your purchase.' })).toBeVisible();
});


test('pop-up "Add to cart" is visible', async ({page}) => {
  await page.goto('https://coffee-cart.app/');
  await page.locator('[data-test="Flat_White"]').click({
    button: 'right'
  });
  await expect(page.locator('[data-cy="add-to-cart-modal"]')).toBeVisible();
  await page.getByText('Add Flat White to the cart?YesNo').click();
  await page.getByRole('button', { name: 'Yes' }).click();
});


test('pop-up "Lucky day" is visible after added 3 items to cart', async ({page}) => {
  await page.goto('https://coffee-cart.app/');
  await page.locator('[data-test="Espresso"]').click();
  await page.locator('[data-test="Espresso_Macchiato"]').click();
  await page.locator('[data-test="Cappuccino"]').click();
  await expect(page.getByRole('link', { name: 'Cart page' })).toBeVisible();
  await expect(page.getByLabel('Cart page')).toContainText('cart (3)');
  await expect(page.getByText('It\'s your lucky day! Get an extra cup of Mocha for $4.espressochocolate')).toBeVisible();
  await expect(page.locator('#app')).toContainText('It\'s your lucky day! Get an extra cup of Mocha for $4.');
  await page.getByRole('button', { name: 'Yes, of course!' }).click();
});


test('Remove item from cart on the "Cart" page', async ({page}) => {
  await page.goto('https://coffee-cart.app/');
  await page.locator('[data-test="Espresso"]').click();
  await page.locator('[data-test="Espresso_Macchiato"]').click();
  await expect(page.getByRole('link', { name: 'Cart page' })).toBeVisible();
  await expect(page.getByLabel('Cart page')).toContainText('cart (2)');
  await page.getByRole('link', { name: 'Cart page' }).click();
  await expect(page.getByText('ItemUnitTotal')).toBeVisible();
  await expect(page.getByText('Espresso$10.00 x 1+-$10.00x')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Remove all Espresso', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Remove all Espresso', exact: true }).click();
  await expect(page.getByLabel('Cart page')).toContainText('cart (1)');
  });


  test('Check discount price', async ({page}) => {
    await page.goto('https://coffee-cart.app/');
    await page.locator('[data-test="Espresso"]').click();
    await page.locator('[data-test="Espresso_Macchiato"]').click();
    await page.locator('[data-test="Cappuccino"]').click();
    await page.getByRole('button', { name: 'Yes, of course!' }).click();
    await expect(page.getByRole('link', { name: 'Cart page' })).toBeVisible();
    await expect(page.getByLabel('Cart page')).toContainText('cart (4)');
    await page.getByRole('link', { name: 'Cart page' }).click();
    await expect(page.getByText('(Discounted) Mocha$4.00 x 1')).toBeVisible();
    await expect(page.locator('#app')).toContainText('(Discounted) Mocha');
    await expect(page.locator('#app')).toContainText('$4.00 x 1');
  });