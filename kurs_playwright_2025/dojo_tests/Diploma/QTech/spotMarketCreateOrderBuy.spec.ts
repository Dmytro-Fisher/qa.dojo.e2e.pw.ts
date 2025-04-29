import { test, expect } from "@playwright/test";
import { credentials } from "./credentials";

test("QT-00010. Create spot market buy order", async ({ page }) => {
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
  await page.locator('[data-testid-input="amount-buy"]').click();
  await page
    .locator('[data-testid-input="amount-buy"]')
    .pressSequentially("0.001", { delay: 1000 });
  await expect(page.locator('[data-testid-input="amount-buy"]')).toHaveValue(
    "0.001"
  );
  await page
    .locator('[data-testid-button="buy-order"]')
    .waitFor({ state: "visible" });
  await page.locator('[data-testid-button="buy-order"]').hover();
  await expect(page.locator('[data-testid-button="buy-order"]')).toBeEnabled();

  await page.waitForTimeout(10_000);

  await page.locator('[data-testid-button="buy-order"]').click({ delay: 1000 });
  await expect(page.locator('[data-testid="toast"]')).toBeVisible();
  await expect(page.getByText("Order created")).toBeVisible();

  // Чекає поки прийде запрос в нетворк з необхідною відповіддю
  // const promise = page.waitForResponse("**/order/create");
  // your click
  // await promise;
});
