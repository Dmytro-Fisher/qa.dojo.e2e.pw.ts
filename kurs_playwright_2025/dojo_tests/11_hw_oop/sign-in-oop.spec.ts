import { test, Locator, Page, Response } from "@playwright/test";

class SignInPage {
  page: Page;
  emailLocator: Locator;
  passwordLocator: Locator;
  signInButton: Locator;
  URL: Promise<Response | null>;

  constructor(page: Page) {
    this.page = page;
    this.emailLocator = this.page.locator('[placeholder="Email"]');
    this.passwordLocator = this.page.locator('[placeholder="Password"]');
    this.signInButton = this.page.locator(".btn");
    this.URL = this.page.goto("https://demo.learnwebdriverio.com/login");
  }

  async setEmail(email: string) {
    await this.emailLocator.fill(email);
  }
  async setPassword(password: string) {
    await this.passwordLocator.fill(password);
  }
  async clickSignInButton() {
    await this.signInButton.click();
  }
}

test("Fill SignIn form and click SignIn button", async ({ page }) => {
  const signInPage = new SignInPage(page);

  await signInPage.URL;
  await signInPage.setEmail("test@gm.com");
  await signInPage.setPassword("12345");
  await signInPage.clickSignInButton();
});
