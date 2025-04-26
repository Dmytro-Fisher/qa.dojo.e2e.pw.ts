// page object model  (обєкт моделі сторінки)
import { Locator, Page, expect } from "@playwright/test";
import { test } from "./app/pages/fixture";
import { SignUpPage } from "./app/pages/SignUpPage";
import { ArticleEditorPage } from "./app/pages/ArticleEditorPage";
import { ArticlesPage } from "./app/pages/ArticlesPage";
import { BasePage } from "./app/pages/BasePage";
import { HomePage } from "./app/pages/HomePage";
import { HeaderComponents } from "./app/pages/HeaderComponents";
import { ArticleEditingPage } from "./app/pages/ArticleEditingPage";
import { ArticleCreationPage } from "./app/pages/ArticleCreationPage";
import { faker } from "@faker-js/faker";

test.describe("Article CRUD flows", () => {
  // let signUpPage: SignUpPage;
  // let articleCreationPage: ArticleCreationPage;
  // let articleEditingPage: ArticleEditingPage;
  // let articlesPage: ArticlesPage;
  // let homePage: HomePage;
  // let header: HeaderComponents;
  test.beforeEach(async ({ page, signUpPage, homePage }) => {
    // signUpPage = new SignUpPage(page);
    // articleCreationPage = new ArticleCreationPage(page);
    // articlesPage = new ArticlesPage(page);
    // homePage = new HomePage(page);
    // header = new HeaderComponents(page);
    // articleEditingPage = new ArticleEditingPage(page);

    await signUpPage.goto();
    await signUpPage.registerUser({
      username: `${faker.person.firstName()}`,
      email: `${faker.internet.email()}`,
      pass: `${faker.internet.password()}`,
    });
    await page.waitForURL("https://demo.learnwebdriverio.com/");
    await homePage.clickOnNewArticle();
  });
  test("Create article - it should be created", async ({
    articleCreationPage,
    articlesPage,
  }) => {
    await articleCreationPage.createArticle({
      title: "random title",
      description: "random desc",
      body: "random body",
    });

    const articleHeader = articlesPage.getArticleLocatorByTitle("random title");

    await expect(articleHeader).toBeVisible();
  });

  test("Edit article - it should be edited", async ({
    articleCreationPage,
    articlesPage,
    articleEditingPage,
  }) => {
    await articleCreationPage.createArticle({
      title: "random title",
      description: "random desc",
      body: "random body",
    });

    const articleHeader = articlesPage.getArticleLocatorByTitle("random title");

    await expect(articleHeader).toBeVisible();

    await articlesPage.clickOnEditArticle();
    await articleEditingPage.editingArticle({
      title: "new random title 2025",
      description: "new random description",
      body: "new random body",
    });

    const newArticleHeader = articlesPage.getArticleLocatorByTitle(
      "new random title 2025"
    );
    await expect(newArticleHeader).toBeVisible();
  });

  test("Delete article - it should be deleted", async ({
    articleCreationPage,
    articlesPage,
  }) => {
    await articleCreationPage.createArticle({
      title: "random title",
      description: "random desc",
      body: "random body",
    });

    const articleHeader = articlesPage.getArticleLocatorByTitle("random title");

    await expect(articleHeader).toBeVisible();
    await articlesPage.clickOnDeleteArticle();
  });
});
