import { test as base, ConsoleMessage } from "@playwright/test";
import { SignUpPage } from "../12_hw_oop2/app/pages/SignUpPage";
import { ArticleCreationPage } from "../12_hw_oop2/app/pages/ArticleCreationPage";
import { HomePage } from "../12_hw_oop2/app/pages/HomePage";
import { ArticlesPage } from "../12_hw_oop2/app/pages/ArticlesPage";
import fs from "fs";

type Fixture = {
  signUpPage: SignUpPage;
  articleCreationPage: ArticleCreationPage;
  homePage: HomePage;
  articlesPage: ArticlesPage;
  authData: {
    pass?: string;
    email?: string;
    username?: string;
  };
};

export const test = base.extend<Fixture>({
  signUpPage: async ({ page }, use) => {
    const signUpPage = new SignUpPage(page); // Ініціалізуємо Page Object для SignUp сторінки
    await use(signUpPage); // Передаємо його у тест
  },

  articleCreationPage: async ({ page }, use) => {
    const articleCreationPage = new ArticleCreationPage(page); // Page Object редактора статей
    console.log("Я Зараз виконую цю частину коду"); // Виводимо повідомлення в консоль (можна для дебагу)
    await use(articleCreationPage); // Передаємо в тест
  },

  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page); // Page Object сторінки зі списком статей
    await use(homePage);
  },

  articlesPage: async ({ page }, use) => {
    const articlesPage = new ArticlesPage(page);
    await use(articlesPage);
  },

  authData: {},
  // Порожня фікстура з даними користувача (можна оновити динамічно перед запуском тесту)

  // 1
  browser: async ({ browser }, use) => {
    console.log("browser"); // Лог для розуміння порядку ініціалізації
    await use(browser); // Передаємо об'єкт браузера
  },

  // 2
  storageState: async ({ browser, authData }, use) => {
    console.log("storageState"); // Лог для дебагу
    const filePath =
      "kurs_playwright_2025/dojo_tests/14_hw_storage_state/.auth/auth.json"; // Шлях до файлу збереженого стейту
    const isFileExist = fs.existsSync(filePath); // Перевірка, чи існує файл з сесією

    if (isFileExist === false) {
      const page = await browser.newPage(); // Створюємо нову сторінку в браузері
      await page.goto("https://demo.learnwebdriverio.com/register"); // Відкриваємо форму реєстрації

      const signUpPage = new SignUpPage(page); // Ініціалізуємо SignUp Page Object
      await signUpPage.registerUser(authData); // Реєструємо користувача, використовуючи дані з фікстури

      await page.waitForResponse("**/api/users"); // Чекаємо завершення реєстрації (відповіді від API)

      await page.context().storageState({ path: filePath });
      // Зберігаємо cookies та localStorage у файл

      await page.close(); // Закриваємо сторінку після реєстрації
    }

    await use(filePath); // Передаємо шлях до storage state у тест
  },

  // 3
  context: async ({ context }, use) => {
    console.log("context"); // Лог для дебагу
    await use(context); // Передаємо контекст браузера (включає сторінки, cookies тощо)
  },

  // 4
  page: async ({ page }, use) => {
    console.log("page"); // Лог для дебагу
    await use(page); // Передаємо об'єкт сторінки
  },
});
