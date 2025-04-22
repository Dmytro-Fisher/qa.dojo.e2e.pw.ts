import { Locator, Page } from "@playwright/test";

export class ArticlesPage {
  private page: Page;
  editArticleButtonLocator: Locator;
  deleteArticleButtonLocator: Locator;
  commentFieldLocator: Locator;
  postCommentButtonLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.editArticleButtonLocator = page
      .locator(`//a[@data-qa-id="article-edit"]`)
      .first();
    this.deleteArticleButtonLocator = page
      .locator(`//button[@data-qa-id="article-delete"]`)
      .first();
    this.commentFieldLocator = page.locator(
      `//textarea[@placeholder="Write a comment..."]`
    );
    this.postCommentButtonLocator = page.locator(
      `//button[@class="btn btn-sm btn-primary"]`
    );
  }

  async clickOnEditArticle() {
    await this.editArticleButtonLocator.click();
  }
  async clickOnDeleteArticle() {
    await this.deleteArticleButtonLocator.click();
  }

  getArticleLocatorByTitle(title: string) {
    return this.page.getByRole("heading", {
      name: title,
    });
  }
}
