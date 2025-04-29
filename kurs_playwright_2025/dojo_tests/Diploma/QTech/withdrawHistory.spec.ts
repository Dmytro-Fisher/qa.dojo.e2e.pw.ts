import { test, expect } from "@playwright/test";
import { credentials } from "./credentials";

test("QT-00012. Withdraw history page.", async ({ page }) => {
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
  await expect(page.getByText("BTC/USDT BTC/")).toBeVisible();
  await expect(page.getByRole("link", { name: "≈0$" })).toBeVisible();
  await page.waitForTimeout(1000);
  await page.getByRole("link", { name: "≈0$" }).click();
  await page.waitForLoadState("load");
  await page.waitForTimeout(1000);
  await page.locator('[data-testid-button-withdraw="USDT"]').waitFor();
  await expect(
    page.locator('[data-testid-button-withdraw="USDT"]')
  ).toBeVisible();
  await page.waitForTimeout(1000);
  await page.locator('[data-testid-button-withdraw="USDT"]').click();

  // await page.getByRole('row', { name: 'USDT USDT 15986.900000 (≈' }).getByRole('button').nth(1).click();

  await expect(page.getByRole("button", { name: "ERC-" })).toBeVisible();
  await expect(page.getByRole("button", { name: "TRC-" })).toBeVisible();
  await expect(page.getByRole("button", { name: "BBRC-" })).toBeVisible();
  await expect(page.getByTestId("withdraw-address-input")).toBeVisible();
  await expect(page.getByTestId("withdraw-amount-input")).toBeVisible();
  await expect(page.locator("tbody")).toContainText(
    "ATTENTION! Be careful and double check that you are depositing the correct currency to this address. Sending any other currency may result in the loss of your deposit."
  );
  await expect(page.locator("tbody")).toContainText("Address");
  await expect(page.locator("tbody")).toContainText("Amount");
  await page.waitForTimeout(1000);
  await page.getByTestId("withdraw-address-input").click();
  await page
    .getByTestId("withdraw-address-input")
    .fill("TXGLY9m6yMBR6tDPkHSMBZjAdZFWZJdzCj");
  await expect(
    page
      .getByRole("cell", { name: "Withdraw USDT X ERC-20 TRC-20" })
      .getByRole("button")
      .nth(4)
  ).toBeVisible();
  await page.waitForTimeout(1000);
  await page
    .getByRole("cell", { name: "Withdraw USDT X ERC-20 TRC-20" })
    .getByRole("button")
    .nth(4)
    .click();
  await expect(page.locator('[data-testid="modal-confirm"]')).toBeVisible();
  await page.locator('[data-testid="modal-confirm"]').click();
  await expect(page.getByRole("button", { name: "X" })).toBeVisible();
  await page.waitForTimeout(1000);
  await page.getByRole("button", { name: "X" }).click();
  await expect(
    page.locator('[data-testid-button-history="USDT"]')
  ).toBeVisible();
  await page.waitForTimeout(1000);
  await page.locator('[data-testid-button-history="USDT"]').click();
  await expect(
    page.getByRole("columnheader", { name: "Amount" })
  ).toBeVisible();
  await expect(
    page.getByRole("columnheader", { name: "Balance" })
  ).toBeVisible();
  await expect(page.getByRole("columnheader", { name: "Date" })).toBeVisible();
  await expect(
    page.getByRole("columnheader", { name: "Address" })
  ).toBeVisible();
  await expect(
    page.getByRole("columnheader", { name: "Transaction" })
  ).toBeVisible();
  await page.waitForTimeout(3000);
  await expect(page.locator("thead")).toContainText("Amount");
  await expect(page.locator("thead")).toContainText("Balance");
  await expect(page.locator("thead")).toContainText("Date");
  await expect(page.locator("thead")).toContainText("Address");
  await expect(page.locator("thead")).toContainText("Transaction");
  await expect(page.getByRole("link").filter({ hasText: /^$/ })).toBeVisible();
  await page.waitForTimeout(1000);
  await page.getByRole("link").filter({ hasText: /^$/ }).click();
});
