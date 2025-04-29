import { test, expect } from "@playwright/test";
import { credentials } from "./credentials";
import { newEmail, newPhone } from "./newUserCredentials";

test("QT-0007. Registration new user.", async ({ page }) => {
  await page.goto("https://testing.qtech.exchange/");
  await expect(
    page.getByText(
      "BTC/USDT BTC/USDT15m1H2H4HDIndicatorTimezoneSettingScreenshotFull ScreenOrder"
    )
  ).toBeVisible();
  await expect(page.getByText("Trade (Spot)Login")).toBeVisible();
  await expect(page.getByTestId("login-btn")).toBeVisible();
  await page.waitForTimeout(1000);
  await page.getByTestId("login-btn").click();
  await expect(page.locator("#root")).toMatchAriaSnapshot(`
    - text: Login
    - img
    - textbox "Email"
    - img
    - textbox "Password"
    - img "eye-invisible"
    - button "Login" [disabled]
    - link "Restore Password":
      - img
    - link "Registation":
      - img
    `);
  await expect(page.getByRole("link", { name: "Registation" })).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Restore Password" })
  ).toBeVisible();
  await page.waitForTimeout(1000);
  await page.getByRole("link", { name: "Registation" }).click();
  await page.getByRole("textbox", { name: "Email" }).click();
  await expect(page.locator("#root")).toMatchAriaSnapshot(`
    - text: Registation To start registration, enter your email
    - img
    - textbox "Email"
    - button "Registration" [disabled]
    - link "Login":
      - img
    `);
  await page.getByRole("textbox", { name: "Email" }).click();
  await page.getByRole("textbox", { name: "Email" }).fill(newEmail);
  await expect(
    page.getByRole("button", { name: "Registration" })
  ).toBeVisible();
  await page.waitForTimeout(1000);
  await page.getByRole("button", { name: "Registration" }).click();
  await expect(page.locator("#root")).toMatchAriaSnapshot(`
    - text: Registation
    - paragraph: Confirmation code was sent to your email
    - textbox "Enter your email code"
    - button "Registration" [disabled]
    - link "Login":
      - img
    `);
  await page.waitForTimeout(1000);
  await page.getByRole("textbox", { name: "Enter your email code" }).click();
  await page
    .getByRole("textbox", { name: "Enter your email code" })
    .fill(credentials.sms);
  await page.goto("https://testing.qtech.exchange/#/register/password");
  await expect(page.locator("#root")).toMatchAriaSnapshot(`
      - text: Registation Password should contain more then 5 letters with minimum one number or other symbol
      - textbox "Password"
      - img "eye-invisible"
      - button "Registration" [disabled]
      - link "Login":
        - img
      `);
  await page.waitForTimeout(1000);
  await page.getByRole("textbox", { name: "Password" }).click();
  await page
    .getByRole("textbox", { name: "Password" })
    .fill(credentials.password);
  await expect(
    page.getByRole("button", { name: "Registration" })
  ).toBeVisible();
  await page.waitForTimeout(1000);
  await page.getByRole("button", { name: "Registration" }).click();
  await expect(
    page.getByText(
      "BTC/USDT BTC/USDT15m1H2H4HDIndicatorTimezoneSettingScreenshotFull ScreenOrder"
    )
  ).toBeVisible();
  await expect(page.getByText("Trade (Spot)≈0$")).toBeVisible();
  await expect(page.locator(".ZHKJG")).toBeVisible();
  await expect(page.getByRole("button", { name: "Buy" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sell" })).toBeVisible();
  await expect(
    page
      .locator("div")
      .filter({ hasText: /^MarketLimit$/ })
      .first()
  ).toBeVisible();
});
