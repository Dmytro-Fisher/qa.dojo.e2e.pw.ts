import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ArticleEditorPage extends BasePage {
  private titleLocator: Locator;
  private descriptionLocator: Locator;
  private bodyLocator: Locator;
  private publishArticleButtonLocator: Locator;

  constructor(page: Page) {
    super(page);
    this.titleLocator = page.locator('[data-qa-id="editor-title"]');
    this.descriptionLocator = page.locator(`[data-qa-id="editor-description"]`);
    this.bodyLocator = page.getByRole("textbox", {
      name: "Write your article",
    });
    this.publishArticleButtonLocator = page.locator(`//button[@type="submit"]`);
  }

  async goto() {
    await this.page.goto("https://demo.learnwebdriverio.com/editor");
  }

  async editArticle(articleData: {
    title: string;
    description: string;
    body: string;
  }) {
    await this.titleLocator.fill(articleData.title);
    await this.descriptionLocator.fill(articleData.description);
    await this.bodyLocator.fill(articleData.body);
  }

  async publishArticle() {
    await this.publishArticleButtonLocator.click();
  }
}

// async function createNewArticle(page: Page, username: string, count: number) {
//   await page.locator(`//a[@href="/editor"]`).click();
//   await page
//     .locator('[data-qa-id="editor-title"]')
//     .fill(`${Username} Article №${count + 1}`);
//   await page
//     .locator('[data-qa-id="editor-description"]')
//     .fill(`${Username} Article №${count + 1} description`);
//   await page
//     .getByRole("textbox", { name: "Write your article" })
//     .fill(`${Username} Article №${count + 1} content`);
//   await page.locator(`//button[@type="submit"]`).click();
//   await page.locator(`//button[@type="submit"]`).waitFor({ state: "hidden" });
// }
