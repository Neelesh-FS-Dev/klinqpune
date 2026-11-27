import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

const ROUTES = ['/', '/experience', '/menu', '/events', '/faces', '/celebrate', '/gallery', '/visit']

for (const route of ROUTES) {
  test(`axe finds no serious or critical violations on ${route}`, async ({ page }) => {
    await page.goto(route)
    await page.waitForLoadState('networkidle')
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag22aa']).analyze()
    const blocking = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical')
    expect(blocking.map((v) => `${v.id}: ${v.nodes.length} node(s) — ${v.help}`)).toEqual([])
  })
}
