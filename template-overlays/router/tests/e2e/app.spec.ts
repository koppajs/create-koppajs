import { expect, test } from "@playwright/test";

test("renders the router starter, keeps the counter, and navigates between routes", async ({
  page,
}) => {
  await page.goto("/");

  await expect(page.getByText("Router Starter")).toBeVisible();
  await expect(
    page.getByRole("heading", {
      name: "A small starter, now with real navigation",
    }),
  ).toBeVisible();

  const counterValue = page.getByRole("status");

  await expect(counterValue).toHaveText("0");

  await page.getByRole("button", { name: "Increment counter" }).click();
  await expect(counterValue).toHaveText("1");

  await page.getByRole("link", { name: "Router Page" }).click();

  await expect(page).toHaveURL(/\/router$/);
  await expect(
    page.getByRole("heading", { name: "Router is active" }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Router Page" })).toHaveAttribute(
    "aria-current",
    "page",
  );

  await page.goto("/missing");

  await expect(
    page.getByRole("heading", { name: "Page not found" }),
  ).toBeVisible();
});
