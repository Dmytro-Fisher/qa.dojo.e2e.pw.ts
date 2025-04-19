import { test, expect } from "@playwright/test";
import { newName, newEmail, password } from "../user-data-helper";

test("Login form success", async ({ page }) => {
  await page.goto("https://demo.learnwebdriverio.com/register/");
  await page
    .locator('//input[@placeholder="Username"]')
    .pressSequentially(newName, { delay: 100 });
  await page
    .locator('//input[contains(@placeholder, "Email")]')
    .pressSequentially(newEmail, { delay: 100 });
  await page
    .locator('//input[contains(@placeholder, "Password")]')
    .fill(password);
  await page.locator("//button[contains(text(), 'Sign up')]").click();

  const lowerCaseName = newName.toLowerCase();
  await expect(
    page.locator(
      `//a[@href="/@${lowerCaseName}/" and contains(text(), "${lowerCaseName}")]`
    )
  ).toBeVisible();
});
test("Login form validation error", async ({ page }) => {
  await page.goto("https://demo.learnwebdriverio.com/register/");
  await page.locator("//button[contains(text(), 'Sign up')]").click();
  await expect(
    page.locator(
      "//*[@class='error-messages']/li[contains(text(), 'username')]"
    )
  ).toBeVisible();
  await expect(
    page.locator("//*[@class='error-messages']/li[contains(text(), 'email')]")
  ).toBeVisible();
});
