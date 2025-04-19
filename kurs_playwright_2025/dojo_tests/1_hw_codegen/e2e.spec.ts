import { test, expect } from "@playwright/test";
import { credentials } from "../../credentials";

test("1buyCoffee", async ({ page }) => {
  await page.goto("https://coffee-cart.app/");
  await expect(page.locator('[data-test="Espresso"]')).toBeVisible();
  await page.locator('[data-test="Espresso"]').click();
  await expect(page.locator('[data-test="checkout"]')).toBeVisible();
  await page.locator('[data-test="checkout"]').click();
  await expect(page.locator('[aria-label="Payment form"]')).toBeVisible();
  await page.locator("#name").click();
  await page.locator("#name").fill(credentials.name);
  await page.locator("#email").click();
  await page.locator("#email").fill(credentials.email);
  await page.locator("#promotion").click();
  await expect(page.locator("#name")).toHaveValue(credentials.name);
  await expect(page.locator("#email")).toHaveValue(credentials.email);
  await page.locator("#submit-payment").click();
  await expect(page.locator(".snackbar")).toBeVisible();
});

test("2changeQuantity", async ({ page }) => {
  await page.goto("https://coffee-cart.app/");
  await expect(page.locator('[data-test="Americano"]')).toBeVisible();
  await page.locator('[data-test="Americano"]').click();
  await page.locator('[data-test="checkout"]').hover();
  await page.locator('li.list-item:has-text("Americano")').waitFor();
  await expect(
    page.locator('li.list-item:has-text("Americano x 1+-")')
  ).toBeVisible();
  await page.locator('[aria-label="Add one Americano"]').click();
  await page.locator('[aria-label="Remove one Americano"]').click();
});

test("3luckyDayMessage", async ({ page }) => {
  await page.goto("https://coffee-cart.app/");
  await page.locator('[data-test="Espresso"]').click();
  await page.locator('[data-test="Espresso_Macchiato"]').click();
  await page.locator('[data-test="Cappuccino"]').click();
  await expect(page.locator(".promo")).toBeVisible();
  await expect(page.locator(".promo")).toContainText(
    "It's your lucky day! Get an extra cup of Mocha for $4."
  );
  await expect(page.locator(".buttons button.yes")).toContainText(
    "Yes, of course!"
  );
  await expect(page.locator(".buttons button:not(.yes)")).toContainText(
    "Nah, I'll skip."
  );
  await page.locator(".buttons button.yes").click();
  await page.locator('[data-test="checkout"]').hover();
  await page.locator('li.list-item:has-text("(Discounted) Mocha")').waitFor();
  await expect(
    page.locator('li.list-item:has-text("(Discounted) Mocha")')
  ).toContainText("(Discounted) Mocha");
});

test("4emptyCart", async ({ page }) => {
  await page.goto("https://coffee-cart.app/");
  await expect(page.locator('[aria-label="Menu page"]')).toBeVisible();
  await expect(page.locator('[aria-label="Cart page"]')).toBeVisible();
  await expect(page.locator('[aria-label="GitHub page"]')).toBeVisible();
  await page.locator('[data-test="Espresso"]').click();
  await page.locator('[data-test="Espresso_Macchiato"]').click();
  await page.locator('[aria-label="Cart page"]').click();
  await expect(page.locator('[data-test="checkout"]')).toBeVisible();
  await page.locator('[aria-label="Remove all Espresso"]').click();
  await page.locator('[aria-label="Remove all Espresso Macchiato"]').click();
  await expect(page.locator(".list p")).toBeVisible();
  await expect(page.locator(".list p")).toContainText(
    "No coffee, go add some."
  );
  await page.locator('[aria-label="Menu page"]').click();
});

test("5ChineseName", async ({ page }) => {
  await page.goto("https://coffee-cart.app/");
  await expect(
    page.locator("ul li h4").filter({ hasText: "Espresso $10.00" })
  ).toBeVisible();
  await page
    .locator("ul li h4")
    .filter({ hasText: "Espresso $10.00" })
    .dblclick();
  await expect(
    page.locator("ul li h4").filter({ hasText: "特浓咖啡 $10.00" })
  ).toBeVisible();
  await page
    .locator("ul li h4")
    .filter({ hasText: "特浓咖啡 $10.00" })
    .dblclick();
  await expect(
    page.locator("ul li h4").filter({ hasText: "Espresso $10.00" })
  ).toBeVisible();
});

test("6popUpAddToCart", async ({ page }) => {
  await page.goto("https://coffee-cart.app/");
  await expect(page.locator('[data-test="Espresso_Macchiato"]')).toBeVisible();
  await page.locator('[data-test="Espresso_Macchiato"]').click({
    button: "right",
  });
  await expect(page.locator('[data-cy="add-to-cart-modal"]')).toBeVisible();
  await page.locator("form button").filter({ hasText: "Yes" }).click();
  await page.locator('[data-test="checkout"]').hover();
  await page.locator('li.list-item:has-text("Espresso Macchiato")').waitFor();
  await expect(
    page.locator('li.list-item:has-text("Espresso Macchiato x 1+-")')
  ).toBeVisible();
});
