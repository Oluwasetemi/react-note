// Run against a running Slidev server or deployment:
// BASE_URL=http://localhost:3030 node --test tests/changelog-scroll.test.mjs
import assert from 'node:assert/strict'
import test from 'node:test'
import { chromium } from 'playwright-chromium'

const base = process.env.BASE_URL || 'http://localhost:3030'

test('changelog scrolling and scroll-driven decoration', async (t) => {
  const browser = await chromium.launch()
  try {
    for (const viewport of [
      { width: 1280, height: 577 },
      { width: 375, height: 667 },
    ]) {
      await t.test(
        `${viewport.width}px: wheel and keyboard reach the oldest release`,
        async () => {
          const page = await browser.newPage({ viewport })
          try {
            await page.goto(new URL('/changelog', base).href)
            const scroller = page.getByRole('main', {
              name: 'Course Changelog',
            })
            await scroller.waitFor({ timeout: 15000 })
            await page.waitForFunction(
              () =>
                getComputedStyle(document.querySelector('main')).overflowY ===
                'auto',
            )
            const dimensions = await scroller.evaluate((el) => ({
              scroll: el.scrollHeight,
              height: el.clientHeight,
              width: el.scrollWidth,
              clientWidth: el.clientWidth,
            }))
            assert(
              dimensions.scroll > dimensions.height,
              'page must have scrollable history',
            )
            assert(
              dimensions.width <= dimensions.clientWidth,
              'no horizontal overflow',
            )
            const oldest = page.getByText('Initial course release', {
              exact: true,
            })
            await page.mouse.move(viewport.width / 2, viewport.height / 2)
            await page.mouse.wheel(0, 3000)
            await page.waitForFunction(() => {
              const main = document.querySelector('main')
              return main.scrollTop + main.clientHeight >= main.scrollHeight - 2
            })
            assert(await oldest.isVisible())
            assert((await oldest.boundingBox()).y < viewport.height)
            await scroller.evaluate((el) => {
              el.scrollTop = 0
            })
            await scroller.focus()
            await page.keyboard.press('PageDown')
            await page.waitForFunction(
              () => document.querySelector('main').scrollTop > 0,
            )
            await page.getByRole('link', { name: 'Back to slides toc' }).click()
            await page.waitForURL(new URL('/2', base).href)
          } finally {
            await page.close()
          }
        },
      )
    }
    await t.test(
      'native progress responds to scrolling; reduced motion keeps all text readable',
      async () => {
        const page = await browser.newPage({
          viewport: { width: 1280, height: 577 },
        })
        try {
          await page.goto(new URL('/changelog', base).href)
          const main = page.getByRole('main', { name: 'Course Changelog' })
          await main.waitFor({ timeout: 5000 })
          const native = await page.evaluate(() =>
            CSS.supports(
              '(animation-timeline: scroll()) and (animation-range: entry)',
            ),
          )
          if (native) {
            const progress = page.locator('.changelog-progress')
            await page.waitForFunction(
              () =>
                getComputedStyle(document.querySelector('.changelog-progress'))
                  .transform !== 'none',
            )
            const before = await progress.evaluate(
              (el) => getComputedStyle(el).transform,
            )
            await main.evaluate((el) => {
              el.scrollTop = el.scrollHeight
            })
            await page.waitForFunction(
              (before) =>
                getComputedStyle(document.querySelector('.changelog-progress'))
                  .transform !== before,
              before,
            )
          }
          await page.emulateMedia({ reducedMotion: 'reduce' })
          assert.equal(
            await page
              .locator('.changelog-progress')
              .evaluate((el) => getComputedStyle(el).display),
            'none',
          )
          assert.equal(
            await page.evaluate(() => document.getAnimations().length),
            0,
          )
          assert.equal(
            await page
              .locator('main')
              .evaluate((el) => getComputedStyle(el).overflowY),
            'auto',
          )
          assert(
            await page
              .getByText('Initial course release', { exact: true })
              .isVisible(),
          )
        } finally {
          await page.close()
        }
      },
    )
  } finally {
    await browser.close()
  }
})
