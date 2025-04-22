// page object model  (обєкт моделі сторінки)
import { test, Locator, Page, expect } from "@playwright/test";
import { SignUpPage } from "./app/pages/SignUpPage";
import { ArticleEditorPage } from "./app/pages/ArticleEditorPage";
import { ArticlesPage } from "./app/pages/ArticlesPage";
import { BasePage } from "./app/pages/BasePage";
import { HomePage } from "./app/pages/HomePage";
import { HeaderComponents } from "./app/pages/HeaderComponents";
import { ArticleEditingPage } from "./app/pages/ArticleEditingPage";
import { ArticleCreationPage } from "./app/pages/ArticleCreationPage";

test("Create article - it should be created", async ({ page }) => {
  const signUpPage = new SignUpPage(page);
  const articleCreationPage = new ArticleCreationPage(page);
  const articlesPage = new ArticlesPage(page);
  const homePage = new HomePage(page);
  const header = new HeaderComponents(page);

  await signUpPage.goto();
  await signUpPage.registerUser({
    username: "myusername233245",
    email: "somes49044@ami.co",
    pass: "asfaf",
  });

  await page.waitForURL(`https://demo.learnwebdriverio.com/`);
  await homePage.newArticleButtonLocator.click();

  await articleCreationPage.createArticle({
    title: "random title",
    description: "random desc",
    body: "random body",
  });

  const articleHeader = articlesPage.getArticleLocatorByTitle("random title");

  await expect(articleHeader).toBeVisible();
});

test("Edit article - it should be edited", async ({ page }) => {
  const signUpPage = new SignUpPage(page);
  const articleCreationPage = new ArticleCreationPage(page);
  const articleEditingPage = new ArticleEditingPage(page);
  const articlesPage = new ArticlesPage(page);
  const homePage = new HomePage(page);
  const header = new HeaderComponents(page);

  await signUpPage.goto();
  await signUpPage.registerUser({
    username: "myusername2756745",
    email: "somes4342424@ami.co",
    pass: "asfaf",
  });

  await page.waitForURL(`https://demo.learnwebdriverio.com/`);
  await homePage.clickOnNewArticle();

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

test("Delete article - it should be deleted", async ({ page }) => {
  const signUpPage = new SignUpPage(page);
  const articleCreationPage = new ArticleCreationPage(page);
  const articlesPage = new ArticlesPage(page);
  const homePage = new HomePage(page);
  const header = new HeaderComponents(page);

  await signUpPage.goto();
  await signUpPage.registerUser({
    username: "myusername212345",
    email: "somes9871024@ami.co",
    pass: "asfaf",
  });

  await page.waitForURL(`https://demo.learnwebdriverio.com/`);
  await homePage.newArticleButtonLocator.click();

  await articleCreationPage.createArticle({
    title: "random title",
    description: "random desc",
    body: "random body",
  });

  const articleHeader = articlesPage.getArticleLocatorByTitle("random title");

  await expect(articleHeader).toBeVisible();
  await articlesPage.clickOnDeleteArticle();
});
