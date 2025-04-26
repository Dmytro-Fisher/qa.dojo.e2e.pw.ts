import { Locator, Page } from "@playwright/test";
import { ArticleEditorPage } from "./ArticleEditorPage";

export class ArticleCreationPage extends ArticleEditorPage {
  static createArticle(arg0: {
    title: string;
    description: string;
    body: string;
  }) {
    throw new Error("Method not implemented.");
  }
  deleteArticleButtonLocator: Locator;
  constructor(page: Page) {
    super(page);
    this.deleteArticleButtonLocator = page
      .locator(`//button[@data-qa-id="article-delete"]`)
      .first();
  }

  async createArticle(articleData: {
    title: string;
    description: string;
    body: string;
  }) {
    await super.editArticle(articleData);
    await super.publishArticle();
  }
}
