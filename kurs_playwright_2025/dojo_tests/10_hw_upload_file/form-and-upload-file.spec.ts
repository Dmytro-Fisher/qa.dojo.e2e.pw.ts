import { test, expect, Page } from "@playwright/test";
import { faker } from "@faker-js/faker";
import path from "path";

test.beforeEach(async ({ page }) => {
  await page.route(new RegExp("ad"), (route) => {
    route.abort(); // Block the request
  });
});

const URL = "https://demoqa.com/automation-practice-form/";

function RegistrationForm(page: Page) {
  this.page = page;
  const formInput = (id: string) => this.page.locator(`//*[@id="${id}"]`);

  this.goto = async () => {
    await this.page.goto(URL);
  };
  this.uploadFile = async () => {
    await formInput("uploadPicture").setInputFiles(
      path.join(__dirname, "pictures", "40363599093_289df63413_b.jpg")
    );
    const fileName = await formInput("uploadPicture").inputValue();
    expect(fileName).toContain("40363599093_289df63413_b.jpg");
  };
  this.setName = async () => {
    this.firstName = faker.person.firstName();
    this.lastName = faker.person.lastName();
    this.fullName = `${this.firstName} ${this.lastName}`;
    await formInput("firstName").fill(this.firstName);
    await formInput("lastName").fill(this.lastName);
  };
  this.setEmail = async () => {
    this.userEmail = faker.internet.email();
    await formInput("userEmail").fill(this.userEmail);
  };
  this.setMobile = async () => {
    this.userNumber = faker.string.numeric(10);
    await formInput("userNumber").fill(this.userNumber);
  };
  this.setGender = async () => {
    const randomNumber = faker.number.int({ min: 1, max: 3 });
    await this.page
      .locator(`//label[@for="gender-radio-${randomNumber}"]`)
      .click();
  };
  this.setHobby = async () => {
    const randomNumber = faker.number.int({ min: 1, max: 3 });
    await this.page
      .locator(`//label[@for="hobbies-checkbox-${randomNumber}"]`)
      .check();
  };
  this.setDateOfBirth = async () => {
    this.dateOfBirth = faker.date.birthdate().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    await formInput("dateOfBirthInput").fill(this.dateOfBirth);
  };
  this.setSubjects = async () => {
    this.subject = faker.lorem.text();
    await formInput("subjectsInput").fill(this.subject);
  };
  this.setCurrentAddress = async () => {
    this.address = faker.location.streetAddress();
    await this.page
      .locator("//*[@placeholder='Current Address']")
      .fill(this.address);
  };
  this.setStateAndCity = async () => {
    const state = {
      state1: "NCR",
      state2: "Uttar Pradesh",
      state3: "Haryana",
      state4: "Rajasthan",
    };
    const randomState = faker.number.int({ min: 1, max: 4 });
    const chosenState = state[`state${randomState}`];
    const city1 = ["Delhi", "Gurgaon", "Noida"];
    const city2 = ["Agra", "Lucknow", "Merrut"];
    const city3 = ["Karnal", "Panipat"];
    const city4 = ["Jaipur", "Jaiselmer"];

    const cityLists = {
      NCR: city1,
      "Uttar Pradesh": city2,
      Haryana: city3,
      Rajasthan: city4,
    };
    const chosenCityArray = cityLists[chosenState];
    const randomCityIndex = faker.number.int({
      min: 0,
      max: chosenCityArray.length - 1,
    });
    const chosenCity = chosenCityArray[randomCityIndex];

    await this.page
      .locator('//*[@id="react-select-3-input"]')
      .fill(chosenState);
    await this.page
      .locator(`div[id*="react-select-3-option"]`)
      .filter({ hasText: chosenState })
      .click();

    await this.page.locator('//*[@id="react-select-4-input"]').fill(chosenCity);
    await this.page
      .locator(`div[id*="react-select-4-option"]`)
      .filter({ hasText: chosenCity })
      .click();
    this.fullAddress = `${chosenState} ${chosenCity}`;
  };
  this.clickSubmit = async () => {
    await formInput("submit").click();
  };

  this.verifyForm = async () => {
    const checkField = (text: string) =>
      this.page.locator(`//td[contains(text(), "${text}")]`);
    await expect(checkField(this.fullName)).toBeVisible();
    await expect(checkField(this.userEmail)).toBeVisible();
    await expect(checkField(this.userNumber)).toBeVisible();
    // await expect(checkField(this.dateOfBirth)).toBeVisible();
    // await expect(checkField(this.subject)).toBeVisible();
    await expect(checkField(this.address)).toBeVisible();
    await expect(checkField(this.fullAddress)).toBeVisible();
  };
}

test("Upload file test", async ({ page }) => {
  const registrationForm = new RegistrationForm(page);

  await registrationForm.goto();
  await registrationForm.uploadFile();
  await registrationForm.setName();
  await registrationForm.setEmail();
  await registrationForm.setMobile();
  await registrationForm.setGender();
  await registrationForm.setHobby();
  await registrationForm.setDateOfBirth();
  await registrationForm.setSubjects();
  await registrationForm.setCurrentAddress();
  await registrationForm.setStateAndCity();
  await registrationForm.clickSubmit();
  await registrationForm.verifyForm();
});
