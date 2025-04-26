import { test, expect, Page, Locator } from "@playwright/test";

export class TextBoxPage {
  private page: Page;
  private fullNameLocator: Locator;
  private emailLocator: Locator;
  private currentAddressLocator: Locator;
  private permanentAddressLocator: Locator;
  private submitButtonLocator: Locator;

  constructor(page: Page) {
    this.page = page;

    this.fullNameLocator = this.page.locator("#userName");
    this.emailLocator = this.page.locator("#userEmail");
    this.currentAddressLocator = this.page.locator("#currentAddress");
    this.permanentAddressLocator = this.page.locator("#permanentAddress");
    this.submitButtonLocator = this.page.locator("#submit");
  }

  async goto() {
    await this.page.goto("https://demoqa.com/text-box/");
  }

  private async setFullName(fullname: string = "") {
    await this.fullNameLocator.fill(fullname);
  }

  private async setEmail(email: string = "") {
    await this.emailLocator.fill(email);
  }

  private async setCurrentAddress(address: string = "") {
    await this.currentAddressLocator.fill(address);
  }
  private async setPermanentAddress(permanentAddress: string = "") {
    await this.permanentAddressLocator.fill(permanentAddress);
  }

  async clickSubmit() {
    await this.submitButtonLocator.click();
  }

  async fillTextForm(textFormData: {
    fullname?: string;
    email?: string;
    currentAddress?: string;
    permanentAddress?: string;
  }) {
    await this.setFullName(textFormData.fullname);
    await this.setEmail(textFormData.email);
    await this.setCurrentAddress(textFormData.currentAddress);
    await this.setPermanentAddress(textFormData.permanentAddress);
    await this.clickSubmit();
  }
}
