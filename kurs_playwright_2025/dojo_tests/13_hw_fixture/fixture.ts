import { test as base, ConsoleMessage } from "@playwright/test";
import { TextBoxPage } from "./class-TextBoxPage";
import { VerifyForm } from "./class-VerifyForm";
import { faker } from "@faker-js/faker";

// type FormDataType = {
//   fullname: string;
//   email: string;
//   currentAddress: string;
//   permanentAddress: string;
// };

type Fixture = {
  textBoxPage: TextBoxPage;
  verifyForm: VerifyForm;
  // formData: FormDataType;
};

export const test = base.extend<Fixture>({
  page: async ({ page }, use) => {
    await page.route(new RegExp("ad"), (route) => {
      route.abort(); // Block the request
    });

    // page.on("console", async (msg: ConsoleMessage) => {
    //   if (msg.type() === "error") {
    //     throw Error(msg.text());
    //   }
    // });

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
  // formData: async ({}, use) => {
  //   const data: FormDataType = {
  //     fullname: faker.person.fullName(),
  //     email: faker.internet.email(),
  //     currentAddress: faker.location.secondaryAddress(),
  //     permanentAddress: faker.location.streetAddress(),
  //   };
  //   await use(data);
  // },
});
