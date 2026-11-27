import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: 'e2e',
  use: { baseURL: 'http://localhost:4790', trace: 'retain-on-failure' },
  webServer: { command: 'npm run build && npm run preview', url: 'http://localhost:4790', reuseExistingServer: false, timeout: 180000 },
  projects: [
    { name: 'desktop-1440', use: { viewport: { width: 1440, height: 900 } } },
    { name: 'tablet-820', use: { viewport: { width: 820, height: 1180 }, hasTouch: true, isMobile: false } },
    { name: 'mobile-390', use: { viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true } },
  ],
})
