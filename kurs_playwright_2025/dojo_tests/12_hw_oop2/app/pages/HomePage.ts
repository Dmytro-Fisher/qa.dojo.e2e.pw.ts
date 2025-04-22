import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";
import { HeaderComponents } from "./HeaderComponents";

export class HomePage extends HeaderComponents {
  public newArticleButtonLocator: Locator;

  constructor(page: Page) {
    super(page);
    this.newArticleButtonLocator = this.headerNewArticle;
  }
}
