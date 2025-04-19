import { test, expect, Page } from "@playwright/test";
import { newName, newEmail, password } from "../user-data-helper";
import { faker } from "@faker-js/faker";

const URL = "https://demo.learnwebdriverio.com";
// Create registration new User function
async function registerUser(
  page: Page,
  newName: string,
  newEmail: string,
  password: string
) {
  await page.goto(`${URL}/register/`);
  const signUpButtonLocator = page.locator(
    "//button[contains(text(), 'Sign up')]"
  );
  const signUpFormInput = (placeholder: string) =>
    page.locator(`//input[@placeholder="${placeholder}"]`);
  const lowerCaseName = newName.toLowerCase();
  const verifyUser = page.locator(
    `//a[@href="/@${lowerCaseName}/" and contains(text(), "${lowerCaseName}")]`
  );

  await signUpFormInput("Username").fill(newName);
  await signUpFormInput("Email").fill(newEmail);
  await signUpFormInput("Password").fill(password);
  await signUpButtonLocator.click({ delay: 500 });
  await expect(verifyUser).toBeVisible();
}
// Create test data
function createArticleTitleArray(count: number) {
  const articlesTitleArray: string[] = [];
  for (let i = 0; i < count; i++) {
    articlesTitleArray.push(faker.vehicle.model());
  }
  return articlesTitleArray;
}
//Create function for publish article
async function publishArticle(page: Page, articlesArray: Array<string>) {
  await page.goto(`${URL}/editor`);

  await page.locator('input[data-qa-id="editor-title"]').fill(articlesArray[0]);
  await page
    .locator('button[data-qa-id="editor-publish"]')
    .click({ delay: 500 });
}
// Check my functions
test("Create test article for check my functions", async ({ page }) => {
  await registerUser(page, newName, newEmail, password);
  await publishArticle(page, createArticleTitleArray(1));
});

test("Register new user and create articles", async ({ page }) => {
  await registerUser(page, newName, newEmail, password);
  await publishArticle(page, createArticleTitleArray(1));
  await page.goto(URL);
  const arrayResultArticleTitle = createArticleTitleArray(1);

  for (let i = 0; i < arrayResultArticleTitle.length; i++) {
    await page
      .locator(
        `//*[@class='preview-link']/h1[contains(text(), '${arrayResultArticleTitle[i]}')]`
      )
      .first()
      .click({ delay: 100 });
    await page
      .locator("//button[@data-qa-id='article-delete']")
      .nth(1)
      .click({ delay: 100 });
  }
});
