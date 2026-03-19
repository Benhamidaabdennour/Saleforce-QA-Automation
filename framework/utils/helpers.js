// This functions takes a locator for a lookup field and the value to select, then performs the necessary interactions 
// to select the value from the dropdown options that appear.
import { faker } from '@faker-js/faker';

async function lookupSelector(fieldLocator, value) {
    const page = fieldLocator.page();

    // Click the field to activate it, clear any existing text, and type the new value to trigger the dropdown options
    // Using type to mimic user behavior and ensure dropdown options are triggered, with a slight delay to allow options to load
    await fieldLocator.click();
    await fieldLocator.fill('');
    await fieldLocator.type(value, { delay: 50 });

    // locator for dropdown options
    const options = page.locator('[role="option"]');

    // Filter ONLY real Salesforce records (Getting values retunred by the lookup field)
    const realOptions = options.filter({
        has: page.locator('strong')
    });

    // Match the value within real results only (Looking for the exact match from results with the value)
    const matchingOption = realOptions.filter({
        hasText: value
    }).first();

    // Wait for it to appear
    try {
        await matchingOption.waitFor({ state: 'visible', timeout: 5000 });
    } catch (e) {
        throw new Error(`No matching Salesforce record found for "${value}"`);
    }

    // Click the correct option
    await matchingOption.click();
}

async function selectRandomPicklist(fieldLocator) {
  const page = fieldLocator.page();

  // Close any previously open dropdown before interacting with this field
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
    return false;
  }

  const listbox = page.locator(`#${controlsId}`);
  await listbox.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});

  if (!await listbox.isVisible().catch(() => false)) {
    console.log('Listbox not visible; skipping');
    return false;
  }

  const values = await listbox.evaluate(el => {
    return Array.from(el.querySelectorAll('[role="option"]'))
      .map(opt => opt.getAttribute('data-value'))
      .filter(v => v && v !== '--None--');
  });

  if (values.length === 0) {
    console.log('No valid options; skipping');
    await page.keyboard.press('Escape');
    await listbox.waitFor({ state: 'hidden', timeout: 1000 }).catch(() => {});
    return false;
  }
  const picked = values[Math.floor(Math.random() * values.length)];
  console.log('Selecting:', picked);

  await listbox.locator(`[role="option"][data-value="${picked}"]`).click({ force: true });
  await listbox.waitFor({ state: 'hidden', timeout: 2000 }).catch(async () => {
    // If still open after click, force close with Escape
    await page.keyboard.press('Escape');
  });

  return true;
}

export { lookupSelector, selectRandomPicklist };