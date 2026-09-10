import { expect, test } from "@playwright/test";

const SERVICE_SLUGS = [
  "residential-gas-installations",
  "commercial-kitchen-gas-systems",
  "industrial-gas-installations",
  "bulk-lpg-installations",
  "custom-projects-and-developments",
  "certificates-of-compliance",
  "gas-system-maintenance",
  "leak-detection-and-repairs",
  "electrical-and-controls-support",
];

test.describe("homepage", () => {
  test("renders the hero and both calls to action", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Gas systems engineered",
    );
    await expect(
      page.getByRole("link", { name: "Request a Quote" }).first(),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "View Services" }),
    ).toBeVisible();
  });

  test("shows exactly nine service cards", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".grid-9 > li")).toHaveCount(9);
  });
});

test.describe("service grid contract", () => {
  test("is exactly three columns on desktop", async ({ page }) => {
    test.skip(
      test.info().project.name !== "desktop",
      "Grid contract applies at >=1024px",
    );
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/");

    const columns = await page
      .locator(".grid-9")
      .evaluate((el) => getComputedStyle(el).gridTemplateColumns.split(" ").length);
    expect(columns).toBe(3);

    // Three columns and nine cards means three rows, with equal heights per row.
    const heights = await page
      .locator(".grid-9 > li")
      .evaluateAll((cards) => cards.map((c) => Math.round(c.getBoundingClientRect().height)));
    expect(heights).toHaveLength(9);
    for (let row = 0; row < 3; row += 1) {
      const inRow = heights.slice(row * 3, row * 3 + 3);
      expect(new Set(inRow).size).toBe(1);
    }
  });

  test("stacks to one column on a phone", async ({ page }) => {
    test.skip(test.info().project.name !== "mobile", "Phone layout only");
    await page.goto("/");
    const columns = await page
      .locator(".grid-9")
      .evaluate((el) => getComputedStyle(el).gridTemplateColumns.split(" ").length);
    expect(columns).toBe(1);
  });
});

test.describe("no horizontal overflow", () => {
  for (const width of [360, 390, 768, 1024, 1440, 1920]) {
    test(`at ${width}px`, async ({ page }) => {
      test.skip(test.info().project.name !== "desktop", "Widths driven manually");
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/");
      const overflow = await page.evaluate(
        () =>
          document.documentElement.scrollWidth -
          document.documentElement.clientWidth,
      );
      expect(overflow).toBeLessThanOrEqual(0);
    });
  }
});

test.describe("service pages", () => {
  for (const slug of SERVICE_SLUGS) {
    test(`/services/${slug} renders`, async ({ page }) => {
      const response = await page.goto(`/services/${slug}`);
      expect(response?.status()).toBe(200);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await expect(page.getByText("What the work covers")).toBeVisible();
    });
  }

  test("an unknown service is a 404", async ({ page }) => {
    const response = await page.goto("/services/not-a-real-service");
    expect(response?.status()).toBe(404);
    await expect(page.getByText("That page is not here")).toBeVisible();
  });
});

test.describe("contact form", () => {
  test("blocks an empty submission and names the fields", async ({ page }) => {
    await page.goto("/contact");
    await page.getByRole("button", { name: "Send enquiry" }).click();

    await expect(page.getByText("Please enter your name.")).toBeVisible();
    await expect(page.getByText("Please enter a contact number.")).toBeVisible();
    await expect(page.getByText("Please enter an email address.")).toBeVisible();
    await expect(
      page.getByText("Please confirm we may contact you about this enquiry."),
    ).toBeVisible();
  });

  test("rejects a malformed email address", async ({ page }) => {
    await page.goto("/contact");
    await page.getByLabel("Email", { exact: false }).first().fill("not-an-email");
    await page.getByLabel("Suburb or town").click();
    await expect(
      page.getByText("That email address does not look right."),
    ).toBeVisible();
  });

  test("a complete submission reaches the thank-you page", async ({ page }) => {
    // Stub the API so the test never depends on SMTP being configured.
    await page.route("**/api/contact", (route) =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ ok: true }),
      }),
    );

    await page.goto("/contact");
    await page.getByLabel("Full name").fill("Test Person");
    await page.getByLabel("Phone").fill("011 555 0100");
    await page.getByLabel("Email", { exact: false }).first().fill("test@example.com");
    await page.getByLabel("Suburb or town").fill("Centurion");
    await page.getByLabel("Service required").selectOption({ index: 1 });
    await page.getByLabel("Site type").selectOption("Commercial");
    await page.getByLabel("What do you need?").selectOption("Quote");
    await page
      .getByLabel("About the job")
      .fill("Six-burner range and a combi oven in a trading kitchen.");
    await page.getByRole("checkbox").check();

    await page.getByRole("button", { name: "Send enquiry" }).click();
    await expect(page).toHaveURL(/\/contact\/sent/);
    await expect(page.getByText("That has reached us")).toBeVisible();
  });
});

test.describe("api", () => {
  test("rejects an invalid payload with field errors", async ({ request }) => {
    const response = await request.post("/api/contact", { data: { name: "x" } });
    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.ok).toBe(false);
    expect(body.fieldErrors).toBeTruthy();
  });

  test("does not answer GET", async ({ request }) => {
    const response = await request.get("/api/contact");
    expect(response.status()).toBe(405);
  });
});

test.describe("seo endpoints", () => {
  test("sitemap lists every service page", async ({ request }) => {
    const response = await request.get("/sitemap.xml");
    expect(response.status()).toBe(200);
    const xml = await response.text();
    for (const slug of SERVICE_SLUGS) {
      expect(xml).toContain(`/services/${slug}`);
    }
    // The thank-you route is noindex and must stay out of the sitemap.
    expect(xml).not.toContain("/contact/sent");
  });

  test("robots.txt points at the sitemap", async ({ request }) => {
    const response = await request.get("/robots.txt");
    expect(response.status()).toBe(200);
    expect(await response.text()).toContain("Sitemap:");
  });

  test("the social card renders", async ({ request }) => {
    const response = await request.get("/opengraph-image");
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("image/png");
  });
});

test.describe("unconfirmed facts stay unpublished", () => {
  test("no phone number, 24/7 claim or certification claim appears", async ({
    page,
  }) => {
    for (const path of ["/", "/about", "/contact", "/services"]) {
      await page.goto(path);
      const body = (await page.locator("body").innerText()).toLowerCase();
      expect(body).not.toContain("24/7");
      expect(body).not.toContain("saqcc");
      expect(body).not.toContain("dp energies");
      // The shared number must not ship until the client confirms it.
      expect(body).not.toContain("061 039 7034");
      expect(body).not.toContain("+27 61 039 7034");
    }
  });
});
