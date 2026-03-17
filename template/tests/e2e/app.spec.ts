import { expect, test } from "@playwright/test";

test("renders the starter and updates the counter", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByText("Minimal Starter")).toBeVisible();

  const counterValue = page.getByRole("status");

  await expect(counterValue).toHaveText("0");

  await page.getByRole("button", { name: "Increment counter" }).click();
  await expect(counterValue).toHaveText("1");

  await page.getByRole("button", { name: "Decrement counter" }).click();
  await page.getByRole("button", { name: "Decrement counter" }).click();
  await expect(counterValue).toHaveText("-1");
});
