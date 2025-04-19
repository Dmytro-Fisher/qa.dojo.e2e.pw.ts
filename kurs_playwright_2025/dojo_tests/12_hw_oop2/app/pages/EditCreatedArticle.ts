import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class EditCreatedArticle extends BasePage {
  private editTitleLocator: Locator;
  private editDescriptionLocator: Locator;
  private editBodyLocator: Locator;
  private publishEditedArticle: Locator;

  constructor(page: Page) {
    super(page);
    this.editTitleLocator = page.locator('[data-qa-id="editor-title"]');
    this.editDescriptionLocator = page.locator(
      `[data-qa-id="editor-description"]`
    );
    this.editBodyLocator = page.getByRole("textbox", {
      name: "Write your article",
    });
    this.publishEditedArticle = page.locator(`//button[@type="submit"]`);
  }
}
