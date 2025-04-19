import { Page, Locator } from "@playwright/test";

export class BasePage {
  protected page: Page;
  protected headerNewArticle: Locator;
  headerHomeLink: Locator;
  headerSettingsLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.headerNewArticle = page.locator(`//a[@href="/editor"]`);
    this.headerHomeLink = page.locator(`//a[@href="/"]`);
    this.headerSettingsLink = page.locator(`//a[@href="/settings"]`);
  }
}
