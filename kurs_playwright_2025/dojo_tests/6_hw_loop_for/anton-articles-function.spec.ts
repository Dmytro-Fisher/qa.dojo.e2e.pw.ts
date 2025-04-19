import { test, expect, Page } from "@playwright/test";
import { faker } from "@faker-js/faker";

type User = {
  username: string;
  email: string;
  password: string;
};

const URL = "https://demo.learnwebdriverio.com";

const USER: User = {
  username: `user${Date.now()}`,
  email: faker.internet.email(),
  password: faker.internet.password(),
};

test("Create 3 articles and check feed", async ({ page }) => {
  const articlesTitleForTest: string[] = generateArticleTitles(3);

  await page.goto(URL);
  await registerUser(page, USER);

  await publishSeveralArticles(page, articlesTitleForTest);
  await verifyArticlesCreated(page, articlesTitleForTest);
  await deletePublishedArticles(page, articlesTitleForTest);
});

test("Create 3 articles and check feed1", async ({ page }) => {
  await page.goto(URL);
  await registerUser(page, USER);

  const articlesTitleForTest = generateArticleTitles(1);

  await publishSeveralArticles(page, articlesTitleForTest);
  await verifyArticlesCreated(page, articlesTitleForTest);
  await deletePublishedArticles(page, articlesTitleForTest);
});

async function registerUser(page: Page, user: User) {
  const signUpButtonLocator = page.locator(
    '//*[@data-qa-id="site-nav"]//a[@href="/register"]'
  );
  const registerPageSignUpButtonLocator = page.locator(
    '//button[contains(text(), "Sign up")]'
  );
  const getSignUpFormInput = (placeholder: string) =>
    page.locator(`//input[@placeholder="${placeholder}"]`);

  await signUpButtonLocator.click();
  await getSignUpFormInput("Username").fill(user.username);
  await getSignUpFormInput("Email").fill(user.email);
  await getSignUpFormInput("Password").fill(user.password);
  await registerPageSignUpButtonLocator.click();
  await page.waitForURL(URL);
}

function generateArticleTitles(articlesCount: number) {
  const articlesTitle: string[] = [];

  for (let i = 0; i < articlesCount; i++) {
    articlesTitle.push(faker.book.title());
  }

  return articlesTitle;
}

async function publishArticle(page: Page, title: string) {
  await page.goto(`${URL}/editor`);
  await page.locator('input[data-qa-id="editor-title"]').fill(title);
  await page.locator('button[data-qa-id="editor-publish"]').click();
  await page.waitForURL("**/articles/**");
}

async function publishSeveralArticles(
  page: Page,
  articleTitles: Array<string>
) {
  for (let title of articleTitles) {
    await publishArticle(page, title);
  }
}

async function verifyArticlesCreated(page: Page, articlesTitles: string[]) {
  await page.goto(URL);
  const articleTitleLocator = page.locator('[data-qa-type="preview-title"]');
  for (let i = 0; i < articlesTitles.length; i++) {
    expect(await articleTitleLocator.nth(i).textContent()).toBe(
      articlesTitles[articlesTitles.length - i - 1]
    );
  }
}

async function deletePublishedArticles(page: Page, articlesTitles: string[]) {
  for (let title of articlesTitles) {
    await page
      .locator('[data-qa-type="preview-title"]', {
        hasText: title,
      })
      .click();
    await page.locator('button[data-qa-id="article-delete"]').first().click();
  }
}
