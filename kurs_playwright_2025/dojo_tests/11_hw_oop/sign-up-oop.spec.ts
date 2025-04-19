import { test, Locator, Page, Response } from "@playwright/test";

class SignUpPage {
  page: Page;
  usernameLocator: Locator;
  emailLocator: Locator;
  passwordLocator: Locator;
  signUpButtonLocator: Locator;
  URL: Promise<Response | null>;

  constructor(page: Page) {
    this.page = page;
    this.usernameLocator = this.page.locator('[placeholder="Username"]');
    this.emailLocator = this.page.locator('[placeholder="Email"]');
    this.passwordLocator = this.page.locator('[placeholder="Password"]');
    this.signUpButtonLocator = this.page.locator(".btn");
    this.URL = this.page.goto("https://demo.learnwebdriverio.com/register");
  }

  async setUsername(username: string) {
    await this.usernameLocator.fill(username);
  }
  async setEmail(email: string) {
    await this.emailLocator.fill(email);
  }
  async setPassword(password: string) {
    await this.passwordLocator.fill(password);
  }
  async clickSignUpButton() {
    await this.signUpButtonLocator.click();
  }
}

test("Fill SignUp form and click SignUp button", async ({ page }) => {
  const signUpPage = new SignUpPage(page);

  await signUpPage.URL;
  await signUpPage.setUsername("John");
  await signUpPage.setEmail("john@gm.com");
  await signUpPage.setPassword("john123");
  await signUpPage.clickSignUpButton();
});
