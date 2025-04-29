import { test, expect } from "@playwright/test";
import { credentials } from "./credentials";

test("QT-0008. Create spot limit buy order and cancel", async ({ page }) => {
  await page.goto("https://testing.qtech.exchange/");
  await page.getByTestId("login-btn").click();
  await page.getByRole("textbox", { name: "Email" }).click();
  await page.getByRole("textbox", { name: "Email" }).fill(credentials.email);
  await page.getByRole("textbox", { name: "Password" }).click();
  await page
    .getByRole("textbox", { name: "Password" })
    .fill(credentials.password);
  await page.locator("form").getByRole("button", { name: "Login" }).click();
  await page.getByRole("textbox", { name: "Enter your email code" }).click();
  await page
    .getByRole("textbox", { name: "Enter your email code" })
    .fill(credentials.sms);
  await page.goto("https://testing.qtech.exchange/#/");
  await expect(
    page
      .locator("div")
      .filter({ hasText: /^MarketLimit$/ })
      .nth(1)
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Buy" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sell" })).toBeVisible();
  await expect(page.getByText("My Orders")).toBeVisible();
  await expect(page.getByText("History Orders")).toBeVisible();
  await expect(
    page
      .locator("div")
      .filter({ hasText: /^MarketLimit$/ })
      .nth(1)
  ).toBeVisible();
  await page.getByRole("switch", { name: "Market Limit" }).click();
  await page.locator('[data-testid-input="price-buy"]').click();
  await page.locator('[data-testid-input="price-buy"]').fill("8000.000000");
  await page.locator('[data-testid-input="amount-buy"]').click();
  await page
    .locator('[data-testid-input="amount-buy"]')
    .pressSequentially("0.0001");
  await page.locator('[data-testid="wallet-link"]').waitFor();
  await page.waitForTimeout(10_000);
  await page.getByRole("button", { name: "Buy" }).click();
  await expect(page.locator('[data-testid="toast"]')).toBeVisible();
  await expect(page.getByText("Order created")).toBeVisible();
  await expect(page.getByText("My Orders")).toBeVisible();
  await page.waitForTimeout(10_000);
  await expect(
    page.getByRole("cell", { name: "0.00010000" }).locator("span").nth(1)
  ).toBeVisible();
  await page.locator('[data-testid-button="cancel-order-buy"]').first().click();
  await expect(page.getByTestId("toast").locator("div").first()).toBeVisible();
});
