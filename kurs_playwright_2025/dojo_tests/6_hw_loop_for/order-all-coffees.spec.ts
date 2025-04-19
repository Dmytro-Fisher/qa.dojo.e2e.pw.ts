import { test } from "@playwright/test";

test("order all coffees", async ({ page }) => {
  await page.goto("http://coffee-cart.app");
  const cups = await page.$$(".cup-body"); // bad practice!
  for (let i = 0; i < cups.length; i++) {
    await cups[i].click({ delay: 500 });

    // for (const cup of cups) {
    //   await cup.evaluate((el) => el.click());
    //   await page.waitForTimeout(500);
  }
  // await page.locator('[data-test="checkout"]').hover();
});

test("order all coffees with click on 'Nah'", async ({ page }) => {
  await page.goto("http://coffee-cart.app");

  const cups = await page.locator(".cup-body").all();

  for (let i = 0; i < cups.length; i++) {
    if (await page.locator(".promo").first().isVisible()) {
      await page.getByRole("button", { name: "Nah" }).click({ delay: 800 });
    }
    await cups[i].click({ delay: 800 });
  }
});
