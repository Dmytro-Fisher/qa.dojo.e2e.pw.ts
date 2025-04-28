import { test as base, ConsoleMessage } from "@playwright/test";
import { TextBoxPage } from "./class-TextBoxPage";
import { VerifyForm } from "./class-VerifyForm";
import { writeFile } from "fs/promises";
import * as path from "path";

type Fixture = {
  textBoxPage: TextBoxPage;
  verifyForm: VerifyForm;
};

const errorLogs: string[] = [];

export const test = base.extend<Fixture>({
  page: async ({ page }, use) => {
    await page.route(new RegExp("ad"), (route) => {
      route.abort(); // Block the request
    });

    page.on("console", async (msg: ConsoleMessage) => {
      if (msg.type() === "error") {
        errorLogs.push(msg.text());
      }
    });

    const textBoxPage = new TextBoxPage(page);
    await textBoxPage.goto();

    await use(page);
  },

  textBoxPage: async ({ page }, use) => {
    const textBoxPage = new TextBoxPage(page);
    await use(textBoxPage);
  },

  verifyForm: async ({ page }, use) => {
    const verifyForm = new VerifyForm(page);
    await use(verifyForm);
  },
});
test.afterAll(async () => {
  if (errorLogs.length === 0) return; // нічого не записувати
  const outputPath = path.resolve(__dirname, "console-errors.txt");

  // Якщо файл не існує — створить, якщо існує — перезапише
  await writeFile(outputPath, errorLogs.join("\n"), "utf-8");
});
