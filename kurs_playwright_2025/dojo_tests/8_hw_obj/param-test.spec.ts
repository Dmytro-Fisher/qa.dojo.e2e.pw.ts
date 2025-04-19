import { test, expect, Page } from "@playwright/test";
import { faker } from "@faker-js/faker";

const formData = [
  {
    id: "Form 1",
    fullName: faker.internet.username(),
    email: faker.internet.email(),
    currentAddress: faker.location.streetAddress(),
    permanentAddress: faker.location.streetAddress(),
  },
  {
    id: "Form 2",
    fullName: faker.internet.username(),
    email: faker.internet.email(),
    currentAddress: faker.location.streetAddress(),
    permanentAddress: faker.location.streetAddress(),
  },
  {
    id: "Form 3",
    fullName: faker.internet.username(),
    email: faker.internet.email(),
    currentAddress: faker.location.streetAddress(),
    permanentAddress: faker.location.streetAddress(),
  },
  {
    id: "Form 4",
    fullName: faker.internet.username(),
    email: faker.internet.email(),
    currentAddress: faker.location.streetAddress(),
    permanentAddress: faker.location.streetAddress(),
  },
  {
    id: "Form 5",
    fullName: faker.internet.username(),
    email: faker.internet.email(),
    currentAddress: faker.location.streetAddress(),
    permanentAddress: faker.location.streetAddress(),
  },
];

const URL = "https://demoqa.com/text-box/";
async function fillDataAndSendForm(page: Page, data: any) {
  const submitForm = page.locator("//button[@id='submit']");
  const formInput = (id: string) => page.locator(`//*[@id="${id}"]`);
  await formInput("userName").fill(data.fullName);
  await formInput("userEmail").fill(data.email);
  await formInput("currentAddress").fill(data.currentAddress);
  await formInput("permanentAddress").fill(data.permanentAddress);
  await submitForm.click();
}

async function verifyFilledForm(page: Page, data: any) {
  const checkOutput = (id: string) =>
    page.locator(`//*[@id="output"]//*[@id="${id}"]`);
  await expect(checkOutput("name")).toContainText(data.fullName);
  await expect(checkOutput("email")).toContainText(data.email);
  await expect(checkOutput("currentAddress")).toContainText(
    data.currentAddress
  );
  await expect(checkOutput("permanentAddress")).toContainText(
    data.permanentAddress
  );
}

for (const data of formData) {
  test(`Param test ${data.id}`, async ({ page }) => {
    await page.goto(URL);
    await fillDataAndSendForm(page, data);
    await verifyFilledForm(page, data);
  });
}
