import { test as base } from "@playwright/test";
import { SignUpPage } from "./SignUpPage";
import { ArticleCreationPage } from "./ArticleCreationPage";
import { ArticleEditingPage } from "./ArticleEditingPage";
import { ArticlesPage } from "./ArticlesPage";
import { HomePage } from "./HomePage";
import { HeaderComponents } from "./HeaderComponents";

type Fixture = {
  signUpPage: SignUpPage;
  articleCreationPage: ArticleCreationPage;
  articleEditingPage: ArticleEditingPage;
  articlesPage: ArticlesPage;
  homePage: HomePage;
  header: HeaderComponents;
};

export const test = base.extend<Fixture>({
  page: async ({ page }, use) => {
    await use(page);
  },

  signUpPage: async ({ page }, use) => {
    const signUpPage = new SignUpPage(page);
    await use(signUpPage);
  },

  articleCreationPage: async ({ page }, use) => {
    const articleCreationPage = new ArticleCreationPage(page);
    await use(articleCreationPage);
  },

  articleEditingPage: async ({ page }, use) => {
    const articleEditingPage = new ArticleEditingPage(page);
    await use(articleEditingPage);
  },

  articlesPage: async ({ page }, use) => {
    const articlesPage = new ArticlesPage(page);
    await use(articlesPage);
  },

  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
  header: async ({ page }, use) => {
    const header = new HeaderComponents(page);
    await use(header);
  },
});
