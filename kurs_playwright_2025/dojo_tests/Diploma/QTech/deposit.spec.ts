import { test, expect } from "@playwright/test";
import { credentials } from "./credentials";

test("QT-0001. Create deposit.", async ({ page }) => {
  await page.goto("https://testing.qtech.exchange/");
  await expect(page.getByText("Trade (Spot)Login")).toBeVisible();
  await expect(page.getByTestId("login-btn")).toBeVisible();
  await page.waitForTimeout(1000);
  await page.getByTestId("login-btn").click();
  await page.getByRole("textbox", { name: "Email" }).click();
  await page.getByRole("textbox", { name: "Email" }).fill(credentials.email);
  await page.getByRole("textbox", { name: "Password" }).click();
  await page
    .getByRole("textbox", { name: "Password" })
    .fill(credentials.password);
  await expect(
    page.locator("form").getByRole("button", { name: "Login" })
  ).toBeVisible();
  await page.waitForTimeout(1000);
  await page.locator("form").getByRole("button", { name: "Login" }).click();
  await page.getByRole("textbox", { name: "Enter your email code" }).click();
  await page
    .getByRole("textbox", { name: "Enter your email code" })
    .fill(credentials.sms);
  await page.goto("https://testing.qtech.exchange/#/");
  await page.waitForLoadState("load"); // Чекає, поки сторінка завантажиться повністю
  await page.waitForTimeout(2000);
  await expect(page.getByText("Trade (Spot)≈0$")).toBeVisible();
  await expect(page.getByText("BTC/USDT BTC/")).toBeVisible();
  await expect(page.getByRole("link", { name: "≈0$" })).toBeVisible();
  await page.waitForTimeout(1000);
  await page.getByRole("link", { name: "≈0$" }).click();
  await page.waitForLoadState("load");
  await expect(page.getByText("Hide zero balanceHide balance")).toBeVisible();
  await expect(
    page
      .locator("label")
      .filter({ hasText: "Hide zero balance" })
      .locator("span")
      .first()
  ).toBeVisible();
  await expect(
    page
      .locator("label")
      .filter({ hasText: "Hide balance" })
      .locator("span")
      .first()
  ).toBeVisible();
  await expect(page.getByRole("cell", { name: "Currency" })).toBeVisible();
  await expect(
    page.getByRole("cell", { name: "Balance", exact: true })
  ).toBeVisible();
  await expect(
    page.getByRole("cell", { name: "Balance in Orders" })
  ).toBeVisible();
  await expect(
    page.locator('[data-testid-button-deposit="USDT"]')
  ).toBeVisible();
  await expect(
    page.locator('[data-testid-button-withdraw="USDT"]')
  ).toBeVisible();
  await expect(
    page.locator('[data-testid-button-history="USDT"]')
  ).toBeVisible();
  await page.waitForTimeout(1000);
  await page.locator('[data-testid-button-deposit="USDT"]').click();
  await expect(page.getByRole("button", { name: "TRC-" })).toBeVisible();
  await expect(page.getByRole("button", { name: "ERC-" })).toBeVisible();
  await expect(page.getByRole("button", { name: "BBRC-" })).toBeVisible();
  await expect(page.getByText("Minimum recharge amount for")).toBeVisible();
  await expect(page.getByRole("paragraph")).toContainText(
    "Minimum recharge amount for this system 0.01 USDT"
  );
  await expect(page.locator("tbody")).toContainText("ERC-20");
  await expect(page.locator("tbody")).toContainText("TRC-20");
  await expect(page.locator("tbody")).toContainText("BBRC-20");
  await expect(
    page.getByRole("table").getByRole("button").filter({ hasText: /^$/ })
  ).toBeVisible();
  await expect(page.getByText("ATTENTION! Be careful and")).toBeVisible();
  await expect(page.locator("tbody")).toContainText(
    "ATTENTION! Be careful and double check that you are depositing the correct currency to this address. Sending any other currency may result in the loss of your deposit."
  );
  await page.waitForTimeout(1000);
  await page.getByRole("button", { name: "ERC-" }).click();
  await expect(
    page.getByRole("table").getByRole("button").filter({ hasText: /^$/ })
  ).toBeVisible();
  await page.waitForTimeout(1000);
  await page.getByRole("button", { name: "BBRC-" }).click();
  await expect(
    page.getByRole("table").getByRole("button").filter({ hasText: /^$/ })
  ).toBeVisible();
  await page.waitForTimeout(1000);
  await page.getByRole("button", { name: "TRC-" }).click();
  await expect(
    page.getByRole("table").getByRole("button").filter({ hasText: /^$/ })
  ).toBeVisible();
  await page.waitForTimeout(1000);
  await page
    .getByRole("table")
    .getByRole("button")
    .filter({ hasText: /^$/ })
    .click();
  await expect(
    page.locator("div").filter({ hasText: "Copied" }).nth(1)
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "X" })).toBeVisible();
  await page.waitForTimeout(1000);
  await page.getByRole("button", { name: "X" }).click();
  await expect(
    page.locator('[data-testid-button-deposit="ECR"]')
  ).toBeVisible();
  await expect(
    page.locator('[data-testid-button-withdraw="ECR"]')
  ).toBeVisible();
  await expect(
    page.locator('[data-testid-button-history="ECR"]')
  ).toBeVisible();
  await expect(page.locator("tbody")).toContainText("Deposit");
  await expect(page.locator("tbody")).toContainText("Withdraw");
  await expect(page.locator("tbody")).toContainText("History");
  await page.waitForTimeout(1000);
  await page.locator('[data-testid-button-deposit="ECR"]').click();
  await expect(page.locator("h3")).toContainText("Deposit ECR");
  await page.waitForTimeout(1000);
  await page.locator('[data-testid-button-history="USDT"]').waitFor();
  await expect(
    page.getByText("Minimum recharge amount for this system 0.01 ECR")
  ).toBeVisible();
  await expect(page.locator("tbody")).toContainText(
    "ATTENTION! Be careful and double check that you are depositing the correct currency to this address. Sending any other currency may result in the loss of your deposit."
  );
  await expect(
    page.getByRole("table").getByRole("button").filter({ hasText: /^$/ })
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "X" })).toBeVisible();
  await page.waitForTimeout(1000);
  await page.getByRole("button", { name: "X" }).click();
  await expect(page.getByRole("link").filter({ hasText: /^$/ })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Balance" })).toBeVisible();
  await page.waitForTimeout(1000);
  await page.getByRole("link").filter({ hasText: /^$/ }).click();
});
