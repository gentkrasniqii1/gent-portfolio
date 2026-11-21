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

  test("mobile menu traps focus and closes on Escape", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    const toggle = page.getByRole("button", { name: "Open menu" });
    await toggle.click();
    const menu = page.getByRole("navigation", { name: "Mobile" });
    await expect(menu).toBeVisible();

    // Tabbing past the last item wraps back to the menu button.
    for (let i = 0; i < 12; i += 1) await page.keyboard.press("Tab");
    const focusedInside = await page.evaluate(
      () =>
        document.activeElement?.closest("header") !== null &&
        document.activeElement !== document.body,
    );
    expect(focusedInside).toBe(true);

    await page.keyboard.press("Escape");
    await expect(menu).toHaveCount(0);
    await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();
  });

  test("case study screenshots open in a keyboard-friendly lightbox", async ({
    page,
  }) => {
    await page.goto("/projects/velnora");

    const firstShot = page
      .getByRole("button", { name: /^View larger:/ })
      .first();
    await firstShot.scrollIntoViewIfNeeded();
    await firstShot.click();

    const dialog = page.getByRole("dialog", { name: "Velnora screenshots" });
    await expect(dialog).toBeVisible();
    await expect(dialog).toContainText("1 / 4");

    await page.keyboard.press("ArrowRight");
    await expect(dialog).toContainText("2 / 4");

    await page.keyboard.press("Escape");
    await expect(dialog).toHaveCount(0);
    await expect(firstShot).toBeFocused();
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
