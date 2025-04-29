import { test } from "./storage-state-fixture";
import { expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
test.use({
  authData: {
    username: "nameuser888",
    email: "nametesting888@gm.com",
    pass: "12345",
  },
});
test("Create article with storage data - it should be created", async ({
  articleCreationPage,
  articlesPage,
  signUpPage,
  page,
  homePage,
}) => {
  await signUpPage.goto();
  await homePage.clickOnNewArticle();
  await articleCreationPage.createArticle({
    title: "random title",
    description: "random desc",
    body: "random body",
  });

  const articleHeader = articlesPage.getArticleLocatorByTitle("random title");

  await expect(articleHeader).toBeVisible();
});
