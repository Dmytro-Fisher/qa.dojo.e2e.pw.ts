import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {
  public newArticleButtonLocator: Locator;

  constructor(page: Page) {
    super(page);
    this.newArticleButtonLocator = this.headerNewArticle;
  }
}
