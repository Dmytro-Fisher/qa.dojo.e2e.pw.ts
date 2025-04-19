// page object model  (обєкт моделі сторінки)
import { test, Locator, Page, expect } from "@playwright/test";
import { SignUpPage } from "./app/pages/SignUpPage";
import { ArticleEditorPage } from "./app/pages/ArticleEditorPage";
import { ArticlesPage } from "./app/pages/ArticlesPage";
import { BasePage } from "./app/pages/BasePage";
import { HomePage } from "./app/pages/HomePage";

test("Fixture POM SignUp user, create, edit, delete article", async ({
  page,
}) => {
  const signUpPage = new SignUpPage(page);
  const articleEditorPage = new ArticleEditorPage(page);
  const articlesPage = new ArticlesPage(page);
  const homePage = new HomePage(page);

  await signUpPage.goto();
  await signUpPage.registerUser({
    username: "myusername23845",
    email: "somes49024@ami.co",
    pass: "asfaf",
  });

  await page.waitForURL(`https://demo.learnwebdriverio.com/`);
  await homePage.newArticleButtonLocator.click();

  await articleEditorPage.editArticle({
    title: "random title",
    description: "random desc",
    body: "random body",
  });

  await articleEditorPage.publishArticle();

  const articleHeader = articlesPage.getArticleLocatorByTitle("random title");

  await expect(articleHeader).toBeVisible();

  await articlesPage.editArticleButtonLocator.click();
  await articleEditorPage.editArticle({
    title: "new random title 2025",
    description: "new random description",
    body: "new random body",
  });
  await articleEditorPage.publishArticle();
  const newArticleHeader = articlesPage.getArticleLocatorByTitle(
    "new random title 2025"
  );
  await expect(newArticleHeader).toBeVisible();

  await articlesPage.deleteArticleButtonLocator.click();
});
