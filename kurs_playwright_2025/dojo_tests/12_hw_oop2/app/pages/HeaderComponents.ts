import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HeaderComponents extends BasePage {
  protected headerNewArticle: Locator;
  headerHomeLink: Locator;
  headerSettingsLink: Locator;

  constructor(page: Page) {
    super(page);
    this.headerNewArticle = page.locator(`//a[@href="/editor"]`);
    this.headerHomeLink = page.locator(`//a[@href="/"]`);
    this.headerSettingsLink = page.locator(`//a[@href="/settings"]`);
  }
  async clickOnNewArticle() {
    await this.headerNewArticle.click();
  }
}
