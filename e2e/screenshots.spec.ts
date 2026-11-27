import { test } from '@playwright/test'
import path from 'node:path'

const ROUTES = ['/', '/experience', '/menu', '/events', '/faces', '/celebrate', '/gallery', '/visit']

for (const route of ROUTES) {
  test(`screenshot ${route}`, async ({ page }, info) => {
    await page.goto(route)
    await page.waitForLoadState('networkidle')
    // Scroll once so lazy images and videos enter the viewport before the full-page capture.
    const height = await page.evaluate(() => document.documentElement.scrollHeight)
    for (let y = 0; y < height; y += 700) {
      await page.evaluate((yy) => window.scrollTo(0, yy), y)
      await page.waitForTimeout(60)
    }
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.waitForTimeout(400)
    const name = route === '/' ? 'home' : route.slice(1).replace(/\//g, '-')
    const out = path.join('docs', 'qa', 'screenshots', `${info.project.name}-${name}.png`)
    await page.screenshot({ path: out, fullPage: true, animations: 'disabled' })
  })
}
