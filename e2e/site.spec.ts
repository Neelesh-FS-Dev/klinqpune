import { test, expect, type Page } from '@playwright/test'

const ROUTES = ['/', '/experience', '/menu', '/events', '/faces', '/celebrate', '/gallery', '/visit']

async function noHorizontalOverflow(page: Page) {
  const { scroll, client } = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, client: document.documentElement.clientWidth }))
  expect(scroll, 'no horizontal overflow').toBeLessThanOrEqual(client + 1)
}

for (const route of ROUTES) {
  test(`route ${route} renders without errors or overflow`, async ({ page }) => {
    const errors: string[] = []
    page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()) })
    page.on('pageerror', (e) => errors.push(e.message))
    await page.goto(route)
    await expect(page.locator('h1').first()).toBeVisible()
    await page.waitForLoadState('networkidle')
    await noHorizontalOverflow(page)
    expect(errors, 'console errors').toEqual([])
  })
}

test('every reservation destination is a real external link', async ({ page }) => {
  await page.goto('/visit')
  const links = page.locator('#reserve a[href^="https://"]')
  await expect(links).toHaveCount(3)
  for (const href of await links.evaluateAll((els) => els.map((e) => e.getAttribute('href')))) {
    expect(href).toMatch(/^https:\/\/(www\.)?(district\.in|zomato\.com|swiggy\.com)\//)
  }
  await expect(page.locator('a[href="tel:+919112212057"]').first()).toBeVisible()
})

test('primary navigation reaches each section', async ({ page, isMobile }) => {
  test.skip(isMobile, 'desktop nav is hidden on phones')
  await page.goto('/')
  await page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: "What's On" }).click()
  await expect(page).toHaveURL(/\/events$/)
  await expect(page.locator('h1')).toContainText('Live music')
})

test('mobile menu opens, traps Escape, and returns focus to its toggle', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'phone only')
  await page.goto('/')
  const toggle = page.locator('.nav-toggle').first()
  await toggle.click()
  const dialog = page.locator('#mobile-menu')
  await expect(dialog).toHaveAttribute('open', '')
  await expect(page.locator('html')).toHaveClass(/is-menu-open/)
  await page.keyboard.press('Escape')
  await expect(dialog).not.toHaveAttribute('open', '')
  await expect(toggle).toBeFocused()
})

test('gallery lightbox opens, moves with arrows and closes with Escape', async ({ page }) => {
  await page.goto('/gallery')
  await page.locator('.gallery-grid button').first().click()
  const dialog = page.locator('dialog.lightbox')
  await expect(dialog).toHaveAttribute('open', '')
  await expect(dialog.locator('.lightbox__bar span')).toContainText('1 /')
  await page.keyboard.press('ArrowRight')
  await expect(dialog.locator('.lightbox__bar span')).toContainText('2 /')
  await page.keyboard.press('Escape')
  await expect(dialog).not.toHaveAttribute('open', '')
})

test('pinned pour sequence is used only at 900px and wider, with readable static fallback elsewhere', async ({ page }) => {
  await page.goto('/')
  const wide = (page.viewportSize()?.width ?? 0) >= 900
  const pinned = page.locator('section.pinned').nth(1)
  await expect(pinned).toHaveAttribute('data-mode', wide ? 'pinned' : 'static')
  await expect(page.locator('.pinned__caption h2').nth(1)).toBeVisible()
})

test('reduced motion disables the pinned sequence', async ({ browser }) => {
  const ctx = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 1440, height: 900 } })
  const page = await ctx.newPage()
  await page.goto('/')
  await expect(page.locator('section.pinned').nth(1)).toHaveAttribute('data-mode', 'static')
  await ctx.close()
})

test('unknown route shows the not-found page', async ({ page }) => {
  await page.goto('/nope')
  await expect(page.locator('h1')).toContainText('empty')
})
