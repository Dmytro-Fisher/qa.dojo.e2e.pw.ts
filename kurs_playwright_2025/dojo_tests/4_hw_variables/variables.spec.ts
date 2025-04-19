import { test, expect } from "@playwright/test";
import { credentials } from "../../credentials";

const baseUrl = "https://coffee-cart.app/";

test("e2e buy flow", async ({ page }) => {
  //#region
  const cappuccinoCupLocator = page.locator('//*[@data-test="Cappuccino"]');
  const checkoutLocator = page.locator('//*[@data-test="checkout"]');
  const paymentFormLocator = page.locator(
    "//*[@class='modal-content size']//form[@aria-label='Payment form']"
  );
  const inputNameLocator = page.locator("//input[@name='name']");
  const inputEmailLocator = page.locator("//input[@name='email']");
  const buttonSubmitLocator = page.locator("//button[@id='submit-payment']");
  const popupPaymentSuccessLocator = page.locator(
    "//*[@class='snackbar success' and contains(text(), 'Thanks for')]"
  );
  //#endregion

  await page.goto(baseUrl);
  await expect(cappuccinoCupLocator).toBeVisible();
  await cappuccinoCupLocator.click();
  await expect(checkoutLocator).toBeVisible();
  await checkoutLocator.click();
  await expect(paymentFormLocator).toBeVisible();
  await inputNameLocator.fill(credentials.name);
  await inputEmailLocator.fill(credentials.email);
  await buttonSubmitLocator.click();
  await expect(popupPaymentSuccessLocator).toBeVisible();
});

test('pop-up "Add to cart" is visible', async ({ page }) => {
  //#region
  const flatWhiteCupLocator = page.locator('//*[@data-test="Flat_White"]');
  const addToCartModalPopupLocator = page.locator(
    '//*[@data-cy="add-to-cart-modal"]'
  );
  const buttonYesLocator = page.locator("//button[contains(text(), 'Yes')]");
  //#endregion
  await page.goto(baseUrl);
  await flatWhiteCupLocator.click({
    button: "right",
  });
  await expect(addToCartModalPopupLocator).toBeVisible();
  await buttonYesLocator.click();
});

test('pop-up "Lucky day" is visible after added 3 items to cart', async ({
  page,
}) => {
  //#region
  const espressoCupLocator = page.locator("//*[@data-test='Espresso']");
  const espressoMacchiatoCupLocator = page.locator(
    '//*[@data-test="Espresso_Macchiato"]'
  );
  const cappuccinoCupLocator = page.locator('//*[@data-test="Cappuccino"]');
  const cartTabLocator = page.locator(
    "//a[@href='/cart' and contains(text(), 'cart (3)')]"
  );
  const discountPopupLocator = page.locator(
    "//*[@class='promo']//*[contains(text(), 'lucky day')]"
  );
  const buttonDiscountYesLocator = page.locator(
    "//*[@class='buttons']//button[contains(text(), 'Yes, of course!')]"
  );

  //#endregion
  await page.goto(baseUrl);
  await espressoCupLocator.click();
  await espressoMacchiatoCupLocator.click();
  await cappuccinoCupLocator.click();
  await expect(cartTabLocator).toBeVisible();
  await expect(discountPopupLocator).toBeVisible();
  await buttonDiscountYesLocator.click();
});

test('Remove item from cart on the "Cart" page', async ({ page }) => {
  //#region
  const espressoCupLocator = page.locator("//*[@data-test='Espresso']");
  const espressoMacchiatoCupLocator = page.locator(
    '//*[@data-test="Espresso_Macchiato"]'
  );
  const cartTabLocator = page.locator(
    "//a[@href='/cart' and contains(text(), 'cart')]"
  );
  const receiveTbLocator = page.locator("//ul[@data-v-8965af83]");
  const espressoLineInReceiveTableLocator = page.locator(
    "//*[contains(text(), 'Espresso')]/parent::li[@class='list-item']/parent::ul"
  );
  const buttonRemoveEspressoLocator = page.locator(
    "//button[@aria-label='Remove all Espresso']"
  );
  //#endregion
  await page.goto(baseUrl);
  await espressoCupLocator.click();
  await espressoMacchiatoCupLocator.click();
  await expect(cartTabLocator).toBeVisible();
  await cartTabLocator.click();
  await expect(receiveTbLocator).toBeVisible();
  await expect(espressoLineInReceiveTableLocator).toBeVisible();
  await buttonRemoveEspressoLocator.click();
  await expect(cartTabLocator).toContainText("cart (1)");
});

test("Check discount price", async ({ page }) => {
  //#region
  const espressoCupLocator = page.locator("//*[@data-test='Espresso']");
  const espressoMacchiatoCupLocator = page.locator(
    '//*[@data-test="Espresso_Macchiato"]'
  );
  const cappuccinoCupLocator = page.locator('//*[@data-test="Cappuccino"]');
  const buttonDiscountYes = page.locator(
    "//*button[@class='yes' and contains(text(), 'Yes')]"
  );
  const cartTab = page.locator(
    "//a[@href='/cart' and @aria-label='Cart page']"
  );
  const textDiscountLocator = page.locator(
    "//*[text() = '(Discounted) Mocha']/following-sibling::div[text() = '$4.00']"
  );
  //#endregion
  await page.goto(baseUrl);
  await espressoCupLocator.click();
  await espressoMacchiatoCupLocator.click();
  await cappuccinoCupLocator.click();
  await buttonDiscountYes.click(); //???????????????
  await cartTab.click();
  await expect(textDiscountLocator).toBeVisible();
});
