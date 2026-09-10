import { defineConfig, devices } from "@playwright/test";

/**
 * Smoke tests run against a production build on http://localhost:3000.
 *
 * `PLAYWRIGHT_CHROMIUM_PATH` lets a machine that already has Chromium (CI
 * images, sandboxes) point at it instead of downloading browsers. Leave it
 * unset locally and `npx playwright install chromium` does the usual thing.
 */
const executablePath = process.env.PLAYWRIGHT_CHROMIUM_PATH || undefined;

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "github" : "list",

  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || "http://localhost:3000",
    trace: "on-first-retry",
    ...(executablePath ? { launchOptions: { executablePath } } : {}),
  },

  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],

  // Reuse an already-running server when there is one; otherwise build+start.
  webServer: process.env.PLAYWRIGHT_BASE_URL
    ? undefined
    : {
        command: "npm run start",
        url: "http://localhost:3000",
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
      },
});
