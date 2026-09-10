import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

/**
 * Accessibility regression guard.
 *
 * The site ships with zero axe violations across every page type. This suite
 * exists so it stays that way — a new component that drops a focus ring or
 * skips a heading level fails here rather than in an audit six months later.
 */

/**
 * Wait for fonts and for one-shot entrance animations to finish.
 *
 * Without this, axe can sample an element mid-fade — at partial opacity the
 * computed colour is a blend, and colour-contrast reports a false failure.
 * Infinitely-repeating animations (the hero flame and gas flow) are excluded,
 * otherwise this would never resolve.
 */
async function settle(page: import("@playwright/test").Page): Promise<void> {
  await page.evaluate(() => document.fonts.ready);
  await page.waitForFunction(
    () =>
      document
        .getAnimations()
        .filter(
          (a) =>
            a.playState === "running" &&
            a.effect?.getComputedTiming().iterations !== Infinity,
        ).length === 0,
    undefined,
    { timeout: 5000 },
  );
}

const PAGES = [
  { path: "/", name: "homepage" },
  { path: "/services", name: "services index" },
  { path: "/services/bulk-lpg-installations", name: "service detail" },
  { path: "/about", name: "about" },
  { path: "/contact", name: "contact" },
  { path: "/contact/sent", name: "thank you" },
  { path: "/privacy-policy", name: "privacy policy" },
  { path: "/terms", name: "terms" },
  { path: "/services/does-not-exist", name: "404" },
];

for (const { path, name } of PAGES) {
  test(`${name} has no accessibility violations`, async ({ page }) => {
    await page.goto(path);
    await settle(page);

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    // Name the offending rules in the failure message rather than just a count.
    expect(
      results.violations.map((v) => `${v.id}: ${v.help}`),
      `axe violations on ${path}`,
    ).toEqual([]);
  });
}

test("heading order never skips a level", async ({ page }) => {
  for (const { path } of PAGES) {
    await page.goto(path);
    await settle(page);
    const results = await new AxeBuilder({ page })
      .withRules(["heading-order", "empty-heading", "page-has-heading-one"])
      .analyze();
    expect(
      results.violations.map((v) => v.id),
      `heading structure on ${path}`,
    ).toEqual([]);
  }
});

test("the mobile menu is reachable and closes on Escape", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const toggle = page.getByRole("button", { name: "Open menu" });
  await expect(toggle).toHaveAttribute("aria-expanded", "false");

  await toggle.click();
  await expect(page.getByRole("button", { name: "Close menu" })).toHaveAttribute(
    "aria-expanded",
    "true",
  );
  await expect(page.locator("#mobile-nav")).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(page.locator("#mobile-nav")).toBeHidden();
});

test("the skip link is the first thing a keyboard reaches", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const focused = page.locator(":focus");
  await expect(focused).toHaveText("Skip to content");
  await expect(focused).toBeVisible();
});
