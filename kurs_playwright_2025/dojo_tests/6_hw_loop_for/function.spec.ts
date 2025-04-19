import { test, expect, Page } from "@playwright/test";
import { credentials } from "../../credentials";

const baseUrl = "https://coffee-cart.app/";

//#region functions
function cappuccinoLocator(page: Page) {
  return page.locator('//*[@data-test="Cappuccino"]');
}
function flatWhiteLocator(page: Page) {
  return page.locator('//*[@data-test="Flat_White"]');
}
function espressoLocator(page: Page) {
  return page.locator("//*[@data-test='Espresso']");
}
function espressoMacchiatoLocator(page: Page) {
  return page.locator('//*[@data-test="Espresso_Macchiato"]');
}
function checkoutSmallLocator(page: Page) {
  return page.locator('//*[@data-test="checkout"]');
}
function paymentForm(page: Page) {
  return page.locator(
    "//*[@class='modal-content size']//form[@aria-label='Payment form']"
  );
}
function inputName(page: Page) {
  return page.locator("//input[@name='name']");
}
function inputEmail(page: Page) {
  return page.locator("//input[@name='email']");
}
function buttonSubmit(page: Page) {
  return page.locator("//button[@id='submit-payment']");
}
function popupSuccess(page: Page) {
  return page.locator(
    "//*[@class='snackbar success' and contains(text(), 'Thanks for')]"
  );
}
function addToCartPopup(page: Page) {
  return page.locator('//*[@data-cy="add-to-cart-modal"]');
}
function buttonAddCoffee(page: Page) {
  return page.locator("//button[contains(text(), 'Yes')]");
}
function cartTabQuantity(page: Page) {
  return page.locator("//a[@href='/cart' and contains(text(), 'cart (3)')]");
}
function discountPopup(page: Page) {
  return page.locator("//*[@class='promo']//*[contains(text(), 'lucky day')]");
}
function buttonDiscountYesInPopup(page: Page) {
  return page.locator("//button[@class='yes' and contains(text(), 'Yes')]");
}
function cartTabLocator(page: Page) {
  return page.locator("//a[@href='/cart' and @aria-label='Cart page']");
}
function receiveTab(page: Page) {
  return page.locator("//ul[@data-v-8965af83]");
}
function espressoLine(page: Page) {
  return page.locator(
    "//*[contains(text(), 'Espresso')]/parent::li[@class='list-item']/parent::ul"
  );
}
function buttonRemoveEspresso(page: Page) {
  return page.locator("//button[@aria-label='Remove all Espresso']");
}
function textDiscount(page: Page) {
  return page.locator(
    "//*[text() = '(Discounted) Mocha']/following-sibling::div[text() = '$4.00']"
  );
}
//#endregion
test("e2e buy flow", async ({ page }) => {
  await page.goto(baseUrl);
  await cappuccinoLocator(page).click();
  await checkoutSmallLocator(page).click();
  await expect(paymentForm(page)).toBeVisible();
  await inputName(page).fill(credentials.name);
  await inputEmail(page).fill(credentials.email);
  await buttonSubmit(page).click();
  await expect(popupSuccess(page)).toBeVisible();
});

test('pop-up "Add to cart" is visible', async ({ page }) => {
  await page.goto(baseUrl);
  await flatWhiteLocator(page).click({
    button: "right",
  });
  await expect(addToCartPopup(page)).toBeVisible();
  await buttonAddCoffee(page).click();
});

test('pop-up "Lucky day" is visible after added 3 items to cart', async ({
  page,
}) => {
  await page.goto(baseUrl);
  await espressoLocator(page).click();
  await espressoMacchiatoLocator(page).click();
  await cappuccinoLocator(page).click();
  await expect(cartTabQuantity(page)).toBeVisible();
  await expect(discountPopup(page)).toBeVisible();
  await buttonDiscountYesInPopup(page).click();
});

test('Remove item from cart on the "Cart" page', async ({ page }) => {
  await page.goto(baseUrl);
  await espressoLocator(page).click();
  await espressoMacchiatoLocator(page).click();
  await cartTabLocator(page).click();
  await expect(receiveTab(page)).toBeVisible();
  await expect(espressoLine(page)).toBeVisible();
  await buttonRemoveEspresso(page).click();
  await expect(cartTabLocator(page)).toContainText("cart (1)");
});

test("Check discount price", async ({ page }) => {
  await page.goto(baseUrl);
  await espressoLocator(page).click();
  await espressoMacchiatoLocator(page).click();
  await cappuccinoLocator(page).click();
  await buttonDiscountYesInPopup(page).click();
  await cartTabLocator(page).click();
  await expect(textDiscount(page)).toBeVisible();
});
