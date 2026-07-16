import { expect, test } from "@playwright/test";
test("landing page loads", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", {
      name: "Every property. Every document. One clear history.",
    }),
  ).toBeVisible();
});
test("login page loads", async ({ page }) => {
  await page.goto("/login");
  await expect(page.getByRole("heading", { name: "Sign in" })).toBeVisible();
});
test("unauthenticated dashboard redirects", async ({ page }) => {
  await page.goto("/dashboard");
  await expect(page).toHaveURL(/\/login/);
});
test.skip("authenticated property creation", async () => {
  // Requires a configured Supabase test project and credentials.
});
