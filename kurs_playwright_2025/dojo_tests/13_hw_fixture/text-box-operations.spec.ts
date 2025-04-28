import { test } from "./fixture";
import { faker } from "@faker-js/faker";

test.describe("Fill, submit form and verify data", () => {
  let data: {
    fullname: string;
    email: string;
    currentAddress: string;
    permanentAddress: string;
  };
  test.beforeEach(async ({ textBoxPage }) => {
    data = {
      fullname: faker.person.fullName(),
      email: faker.internet.email(),
      currentAddress: faker.location.secondaryAddress(),
      permanentAddress: faker.location.streetAddress(),
    };
  });

  test("Fill, submit text box and verify data", async ({
    textBoxPage,
    verifyForm,
  }) => {
    await textBoxPage.fillTextForm(data);
    await verifyForm.verifyFilledForm(data);
  });
});
