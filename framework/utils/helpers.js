import { faker } from '@faker-js/faker';

async function lookupSelector(fieldLocator, value) {
  const page = fieldLocator.page();
/**
  // Skip if field is readonly (e.g. already populated in edit mode)
  const isReadOnly = await fieldLocator.getAttribute('aria-readonly');
  if (isReadOnly === 'true') {
    console.log('Lookup field is readonly; skipping');
    return;
  }
 */
  await fieldLocator.click();
  await fieldLocator.press('Backspace');
  await fieldLocator.fill('');
  await fieldLocator.type(value, { delay: 50 });

  const options = page.locator('[role="option"]');
  const realOptions = options.filter({ has: page.locator('strong') });
  const matchingOption = realOptions.filter({ hasText: value }).first();

  try {
    await matchingOption.waitFor({ state: 'visible', timeout: 5000 });
  } catch (e) {
    throw new Error(`No matching Salesforce record found for "${value}"`);
  }

  await matchingOption.click();
}

async function selectRandomPicklist(fieldLocator) {
  const page = fieldLocator.page();

  // Close any open listbox before interacting
  const anyOpen = page.locator('div[role="listbox"]:visible');
  if (await anyOpen.count() > 0) {
    await page.keyboard.press('Escape');
    await anyOpen.first().waitFor({ state: 'hidden', timeout: 1000 }).catch(() => {});
  }

  await fieldLocator.scrollIntoViewIfNeeded();
  await fieldLocator.click();

  const controlsId = await fieldLocator.getAttribute('aria-controls');
  if (!controlsId) {
    console.log('No aria-controls found; skipping');
    return null;
  }

  const listbox = page.locator(`#${controlsId}`);
  await listbox.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});

  if (!await listbox.isVisible().catch(() => false)) {
    console.log('Listbox not visible; skipping');
    return null;
  }

  // Get data-value AND display label for each option
  const values = await listbox.evaluate(el => {
    return Array.from(el.querySelectorAll('[role="option"]'))
      .filter(opt => opt.getAttribute('data-value') && opt.getAttribute('data-value') !== '--None--')
      .map(opt => ({
        value: opt.getAttribute('data-value'),
        label: opt.textContent.trim() || opt.getAttribute('data-value')
      }));
  });

  if (values.length === 0) {
    console.log('No valid options; closing cleanly');
    await page.keyboard.press('Escape');
    await listbox.waitFor({ state: 'hidden', timeout: 1000 }).catch(() => {});
    return null;
  }

  const picked = values[Math.floor(Math.random() * values.length)];

  await listbox.locator(`[role="option"][data-value="${picked.value}"]`).click({ force: true });
  await listbox.waitFor({ state: 'hidden', timeout: 3000 }).catch(async () => {
    await page.keyboard.press('Escape');
  });

  // Read what the field now displays — this is the full label (e.g. "United States" not "US")
  const displayedValue = await fieldLocator.inputValue().catch(() => 
    fieldLocator.getAttribute('data-value')
  );

  return displayedValue;
}
export { lookupSelector, selectRandomPicklist };