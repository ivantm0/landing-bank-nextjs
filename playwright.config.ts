import { defineConfig, devices } from "@playwright/test";

// Se prueba el build de producción
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  reporter: "list",
  use: { baseURL: "http://localhost:5202", locale: "es-ES" },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
  webServer: {
    command: "npm run build && npx next start -p 5202",
    url: "http://localhost:5202",
    reuseExistingServer: false,
    timeout: 240_000,
  },
});
