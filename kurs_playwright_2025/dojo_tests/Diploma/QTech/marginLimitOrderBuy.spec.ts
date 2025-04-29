import { test, expect } from "@playwright/test";
import { credentials } from "./credentials";

test("QT-0002. Create margin LIMIT BUY order", async ({ page }) => {
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
  await page.getByRole("navigation").getByRole("img").first().click();
  await page.getByText("Margin").click();
  await page.getByRole("switch", { name: "Market Limit" }).click();
  await page.waitForTimeout(1000);
  await page.locator('[data-testid-input="price-buy-stop"]').click();
  await page
    .locator('[data-testid-input="price-buy-stop"]')
    .fill("100000.000000");
  await page.locator('[data-testid-input="amount-buy"]').click();
  await page
    .locator('[data-testid-input="amount-buy"]')
    .pressSequentially("0.0001", { delay: 20 });
  await expect(page.locator('[data-testid-input="amount-buy"]')).toHaveValue(
    "0.0001"
  );
  await page
    .locator('[data-testid-button="buy-order"]')
    .waitFor({ state: "visible" });
  await page.locator('[data-testid-button="buy-order"]').hover();
  await expect(page.locator('[data-testid-button="buy-order"]')).toBeEnabled();

  await page.waitForTimeout(10_000);

  await page.locator('[data-testid-button="buy-order"]').click({ delay: 1000 });
  await expect(
    page.locator('[data-testid="toast"]', { hasText: "Position created" })
  ).toBeVisible();

  await page.waitForTimeout(8_000);
  await page
    .locator("//button[@aria-label='Expand row']")
    .first()
    .click({ delay: 1000 });
  await page
    .locator("//button[@aria-label='Collapse row']")
    .first()
    .click({ delay: 1000 });
  await expect(page.getByText("0.00050000").first()).toBeVisible();
  await page
    .locator('[data-testid-button="cancel-order-long"]')
    .first()
    .click();
  await expect(page.getByTestId("toast").locator("div").first()).toBeVisible();
});
