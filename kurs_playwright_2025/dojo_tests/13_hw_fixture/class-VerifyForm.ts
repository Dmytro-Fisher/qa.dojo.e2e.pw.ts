import { test, expect, Page, Locator } from "@playwright/test";
import { TextBoxPage } from "./class-TextBoxPage";

export class VerifyForm extends TextBoxPage {
  checkFullName: Locator;
  checkEmail: Locator;
  checkCurrentAddress: Locator;
  checkPermanentAddress: Locator;

  constructor(page: Page) {
    super(page);
    this.checkFullName = page.locator(`#output #name`);
    this.checkEmail = page.locator(`#output #email`);
    this.checkCurrentAddress = page.locator(`#output #currentAddress`);
    this.checkPermanentAddress = page.locator(`#output #permanentAddress`);
  }

  async verifyFilledForm(textFormData: {
    fullname: string;
    email: string;
    currentAddress: string;
    permanentAddress: string;
  }) {
    const { fullname, email, currentAddress, permanentAddress } = textFormData;
    await expect(this.checkFullName).toContainText(fullname);
    await expect(this.checkEmail).toContainText(email);
    await expect(this.checkCurrentAddress).toContainText(currentAddress);
    await expect(this.checkPermanentAddress).toContainText(permanentAddress);
  }
}
