import { test, expect } from "@playwright/test";
import { credentials } from "./credentials";

test("QT-0006. Change password in profile.", async ({ page }) => {
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
    page.locator('[data-testid-user-dropdown="false"]')
  ).toBeVisible();
  await page.locator('[data-testid-user-dropdown="false"]').click();
  await expect(page.getByRole("link", { name: "Settings" })).toBeVisible();
  await page.getByRole("link", { name: "Settings" }).click();
  await expect(page.getByRole("heading", { name: "Settings" })).toBeVisible();
  await expect(page.getByText("General informationChange")).toBeVisible();
  await expect(page.locator("#rc-tabs-1-tab-1")).toContainText(
    "General information"
  );
  await expect(page.locator("#rc-tabs-1-tab-2")).toContainText(
    "Change password"
  );
  await expect(page.locator("#rc-tabs-1-tab-3")).toContainText(
    "Two-factor authentication"
  );
  await expect(page.locator("#rc-tabs-1-tab-4")).toContainText("Notifications");
  await page.getByText("Change password").click();
  await expect(page.getByText("Change passwordNew")).toBeVisible();
  await expect(
    page.locator("div").filter({ hasText: /^New password$/ })
  ).toBeVisible();
  await expect(
    page.locator("div").filter({ hasText: /^New password confirm$/ })
  ).toBeVisible();
  await page
    .locator("div")
    .filter({ hasText: /^New password$/ })
    .getByRole("textbox")
    .click();
  await page
    .locator("div")
    .filter({ hasText: /^New password$/ })
    .getByRole("textbox")
    .fill(credentials.password);
  await page
    .locator("div")
    .filter({ hasText: /^New password confirm$/ })
    .getByRole("textbox")
    .click();
  await page
    .locator("div")
    .filter({ hasText: /^New password confirm$/ })
    .getByRole("textbox")
    .fill(credentials.password);
  await expect(page.getByRole("button", { name: "Cancel" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Save" })).toBeVisible();
  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByText("Success!")).toBeVisible();
  await expect(
    page.getByRole("img", { name: "check-circle" }).locator("path")
  ).toBeVisible();
  await page.getByText("Two-factor authentication").click();
  await expect(
    page.getByText(
      "Second Factor Authentication SettingsAuthenticate using emailConfirmation codes"
    )
  ).toBeVisible();
  await expect(
    page.getByText(
      "Authenticate using emailConfirmation codes will be sent to your email"
    )
  ).toBeVisible();
  await expect(page.getByText("Authentication via SMSTo")).toBeVisible();
  await expect(
    page
      .locator("label")
      .filter({ hasText: "Authentication via SMS" })
      .locator("span")
      .first()
  ).toBeVisible();
  await expect(
    page.getByText(
      "Authentication via OTP applicationTo confirm operation, enter the code from"
    )
  ).toBeVisible();
  await expect(
    page
      .locator("label")
      .filter({ hasText: "Authentication via OTP" })
      .locator("span")
      .first()
  ).toBeVisible();
  await expect(
    page.getByLabel("Two-factor authentication").getByRole("heading")
  ).toContainText("Second Factor Authentication Settings");
  await expect(page.getByLabel("Two-factor authentication")).toContainText(
    "Authenticate using emailConfirmation codes will be sent to your email"
  );
  await expect(page.getByLabel("Two-factor authentication")).toContainText(
    "Authentication via SMSTo confirm operation, enter the code you have received on your phone"
  );
  await expect(page.getByLabel("Two-factor authentication")).toContainText(
    "Authentication via OTP applicationTo confirm operation, enter the code from your TOTP application"
  );
  await page.getByText("Notifications").click();
  await expect(page.getByText("NotificationsWe encourage you")).toBeVisible();
  await expect(page.getByRole("button", { name: "Subscribe" })).toBeVisible();
  await expect(page.getByLabel("Notifications")).toContainText(
    "NotificationsWe encourage you to subscribe to push notificationsYou can always change your choice on the account settings pageSubscribe"
  );
  await expect(page.getByRole("link").filter({ hasText: /^$/ })).toBeVisible();
  await page.getByRole("link").filter({ hasText: /^$/ }).click();
});
