import { test, expect } from "@playwright/test";

test.describe("smoke", () => {
  test("homepage loads with hero heading", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(
      page.getByRole("link", { name: "View projects" }),
    ).toBeVisible();
  });

  test("primary navigation reaches About", async ({ page }) => {
    await page.goto("/");
    await page
      .getByRole("navigation", { name: "Primary" })
      .getByRole("link", { name: "About" })
      .click();
    await expect(page).toHaveURL(/\/about$/);
    await expect(
      page.getByRole("heading", { level: 1, name: "About" }),
    ).toBeVisible();
  });

  test("contact form shows validation errors on invalid submit", async ({
    page,
  }) => {
    await page.goto("/contact");

    const submit = page.getByRole("button", { name: "Send message" });
    await expect(submit).toBeVisible();
    await submit.click();

    await expect(page.locator("#name-error")).toBeVisible();
    await expect(page.locator("#name-error")).toContainText(
      "Name must be at least 2 characters",
    );
    await expect(page.locator("#name")).toBeFocused();
  });
});
