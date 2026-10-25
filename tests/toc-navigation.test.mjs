// Run against a running Slidev server or deployment:
// BASE_URL=http://localhost:3030 node --test tests/toc-navigation.test.mjs
import assert from 'node:assert/strict'
import test from 'node:test'
import { chromium } from 'playwright-chromium'

const base = process.env.BASE_URL || 'http://localhost:3030'
const destinations = [
  ['All Sections', '/routes', 'Course Sections'],
  ['JS/TS Playground', '/playground', 'JS / TS Playground'],
  ['React Playground', '/react-playground', '⚛️ React Playground'],
  ['Changelog', '/changelog', 'Course Changelog'],
]

test('TOC shortcuts are native links that reach their custom pages', async (t) => {
  const browser = await chromium.launch()
  try {
    const page = await browser.newPage()
    page.setDefaultTimeout(15000)
    for (const [name, path, heading] of destinations) {
      await t.test(name, async () => {
        await page.goto(new URL('/2', base).href)
        const link = page.getByRole('link', { name, exact: true })
        await link.waitFor()
        assert.equal(await link.evaluate((el) => el.tagName), 'A')
        assert.equal(
          new URL(await link.getAttribute('href'), base).pathname,
          path,
        )
        await link.click()
        await page.waitForURL(new URL(path, base).href)
        await page
          .getByRole('heading', { name: heading, exact: true })
          .waitFor()
      })
    }
    await t.test(
      'navigation still works if JavaScript stops after rendering',
      async () => {
        await page.goto(new URL('/2', base).href)
        const link = page.getByRole('link', {
          name: 'All Sections',
          exact: true,
        })
        await link.waitFor()
        const cdp = await page.context().newCDPSession(page)
        try {
          await cdp.send('Emulation.setScriptExecutionDisabled', {
            value: true,
          })
          await link.click()
          await page.waitForURL(new URL('/routes', base).href)
        } finally {
          await cdp.send('Emulation.setScriptExecutionDisabled', {
            value: false,
          })
          await cdp.detach()
        }
      },
    )
  } finally {
    await browser.close()
  }
})
