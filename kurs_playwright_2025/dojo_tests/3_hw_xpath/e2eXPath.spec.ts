import { test, expect } from "@playwright/test";
import { credentials } from "../../credentials";

test("buy flow success", async ({ page }) => {
  await page.goto("https://coffee-cart.app/");
  await page.locator('//*[@data-test="Cappuccino"]').click();
  await page.locator('//*[@data-test="checkout"]').click();
  await expect(
    page.locator("//*form[@aria-label='Payment form']")
  ).toBeVisible();
  await page.locator("//input[@name='name']").fill(credentials.name);
  await page.locator("//input[@name='email']").fill(credentials.email);
  await page.locator("//button[@id='submit-payment']").click();
  await expect(
    page.locator(
      "//*[@class='snackbar success' and contains(text(), 'Thanks for')]"
    )
  ).toBeVisible();
});

test('pop-up "Add to cart" is visible', async ({ page }) => {
  await page.goto("https://coffee-cart.app/");
  await page.locator('//*[@data-test="Flat_White"]').click({
    button: "right",
  });
  await expect(page.locator('//*[@data-cy="add-to-cart-modal"]')).toBeVisible();
  await page.locator("//button[contains(text(), 'Yes')]").click();
});

test('pop-up "Lucky day" is visible after added 3 items to cart', async ({
  page,
}) => {
  await page.goto("https://coffee-cart.app/");
  await page.locator('//*[@data-test="Espresso"]').click();
  await page.locator('//*[@data-test="Espresso_Macchiato"]').click();
  await page.locator('//*[@data-test="Cappuccino"]').click();
  await expect(
    page.locator("//a[@href='/cart' and contains(text(), 'cart (3)')]")
  ).toBeVisible();
  await expect(
    page.locator("//*[@class='promo']//*[contains(text(), 'lucky day')]")
  ).toBeVisible();
  await page
    .locator(
      "//*[@class='buttons']//button[contains(text(), 'Yes, of course!')]"
    )
    .click();
});

test('Remove item from cart on the "Cart" page', async ({ page }) => {
  await page.goto("https://coffee-cart.app/");
  await page.locator('//*[@data-test="Espresso"]').click();
  await page.locator('//*[@data-test="Espresso_Macchiato"]').click();
  await expect(
    page.locator("//a[@href='/cart' and contains(text(), 'cart')]")
  ).toBeVisible();
  await page.locator("//a[@href='/cart' and @aria-label='Cart page']").click();
  await expect(
    page.locator(
      "//*[contains(text(), 'Espresso')]/parent::li[@class='list-item']"
    )
  ).toBeVisible();
  await page.locator("//button[@aria-label='Remove all Espresso']").click();
  await expect(
    page.locator("//a[@href='/cart' and text() = 'cart (1)']")
  ).toBeVisible();
});

test("Check discount price", async ({ page }) => {
  await page.goto("https://coffee-cart.app/");
  await page.locator('//*[@data-test="Espresso"]').click();
  await page.locator('//*[@data-test="Espresso_Macchiato"]').click();
  await page.locator('//*[@data-test="Cappuccino"]').click();
  await page
    .locator("//*button[@class='yes' or contains(text(), 'Yes')]")
    .click();
  await page.locator("//a[@aria-label='Cart page']").click();
  await expect(
    page.locator(
      "//*[text() = '(Discounted) Mocha']/following-sibling::div[text() = '$4.00']"
    )
  ).toBeVisible();
});
