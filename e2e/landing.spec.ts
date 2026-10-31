import { expect, test } from "@playwright/test";

const euros = (text: string | null) => Number((text ?? "").replace(/[^\d]/g, ""));

test("carga sin errores de consola ni de hidratación", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("La banca que");
  await page.mouse.wheel(0, 4000);
  await page.waitForTimeout(800);
  expect(errors).toEqual([]);
});

test("la navegación lleva a cada sección", async ({ page, isMobile }) => {
  await page.goto("/");
  if (isMobile) {
    await page.getByRole("button", { name: "Abrir menú" }).click();
    await page.locator("#menu-movil").getByRole("link", { name: "Calculadora" }).click();
    await expect(page.locator("#menu-movil")).toBeHidden();
  } else {
    await page.getByRole("navigation", { name: "Principal" }).getByRole("link", { name: "Calculadora" }).click();
  }
  await expect(page).toHaveURL(/#calculadora$/);
  await expect(page.getByRole("heading", { name: /ahorrar/ })).toBeInViewport();
});

test("las pestañas de tarjetas cambian el plan, también con teclado", async ({ page }) => {
  await page.goto("/#tarjetas");
  const price = page.getByTestId("plan-price");
  await expect(price).toHaveText("0 €");

  await page.getByRole("tab", { name: "Metal" }).click();
  await expect(price).toHaveText("12,99 €");
  await expect(page.getByRole("tab", { name: "Metal" })).toHaveAttribute("aria-selected", "true");

  await page.keyboard.press("ArrowLeft");
  await expect(page.getByRole("tab", { name: "Plus" })).toBeFocused();
  await expect(price).toHaveText("4,99 €");
});

test("la calculadora de ahorro recalcula con los controles", async ({ page }) => {
  await page.goto("/#calculadora");
  const total = page.getByTestId("total");
  const contributed = page.getByTestId("contributed");

  // Valores por defecto: 2.000 € + 200 €/mes durante 10 años = 26.000 € aportados
  await expect(contributed).toHaveText("26.000 €");
  const before = euros(await total.textContent());
  expect(before).toBeGreaterThan(26000);

  const years = page.getByRole("slider", { name: "Plazo" });
  await years.focus();
  await years.press("End"); // 30 años
  await expect(contributed).toHaveText("74.000 €");
  expect(euros(await total.textContent())).toBeGreaterThan(before);

  // Con TAE mínima y sin aportaciones, los intereses bajan
  await page.getByRole("slider", { name: "Aportación mensual" }).focus();
  await page.keyboard.press("Home");
  await expect(contributed).toHaveText("2.000 €");
});

test("las preguntas frecuentes se abren y cierran", async ({ page }) => {
  await page.goto("/#faq");
  const question = page.getByText("¿Cuánto se tarda en abrir la cuenta?");
  const answer = page.getByText(/Unos cinco minutos desde el móvil/);
  await expect(answer).toBeHidden();
  await question.click();
  await expect(answer).toBeVisible();
  await question.click();
  await expect(answer).toBeHidden();
});

test("el formulario valida y muestra la confirmación", async ({ page }) => {
  await page.goto("/#empezar");
  const submit = page.getByRole("button", { name: /Empezar/ });

  await submit.click();
  await expect(page.getByText("Escribe tu nombre")).toBeVisible();
  await expect(page.getByText("Necesitamos tu email")).toBeVisible();
  await expect(page.getByLabel("Nombre")).toBeFocused();

  await page.getByLabel("Nombre").fill("Iván Terol");
  await page.getByLabel("Email").fill("ivan@ejemplo");
  await submit.click();
  await expect(page.getByText("Ese email no parece válido")).toBeVisible();

  await page.getByLabel("Email").fill("ivan@ejemplo.com");
  await page.getByLabel(/Acepto las condiciones/).check();
  await submit.click();
  await expect(page.getByText("¡Listo, Iván!")).toBeVisible();
});

test("indica que el banco es ficticio", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText(/Órbita es un banco ficticio/)).toBeAttached();
});
