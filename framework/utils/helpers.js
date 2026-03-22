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

async function selectRandomPicklist2(fieldLocator) {
  const page = fieldLocator.page();

  // Close any previously open dropdown before interacting with this field
  const anyOpen = page.locator('div[role="listbox"]:visible');
  if (await anyOpen.count() > 0) {
    await page.keyboard.press('Escape');
    await anyOpen.first().waitFor({ state: 'hidden', timeout: 1000 }).catch(() => {});
  }

  // Making sure all options are loaded before trying to select one
  await fieldLocator.scrollIntoViewIfNeeded();
  await fieldLocator.click();

  // Wait for the dropdown to appear and load options
  const controlsId = await fieldLocator.getAttribute('aria-controls');
  if (!controlsId) {
    //console.log('No aria-controls found; skipping');
    return null;
  }

  const listbox = page.locator(`#${controlsId}`);
  await listbox.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});

  // Check if the listbox is visible and has options before proceeding
  if (!await listbox.isVisible().catch(() => false)) {
    //console.log('Listbox not visible; skipping');
    return null;
  }

  // Extract all option values, excluding placeholders like "--None--"
  const values = await listbox.evaluate(el => {
    return Array.from(el.querySelectorAll('[role="option"]'))
      .map(opt => opt.getAttribute('data-value'))
      .filter(v => v && v !== '--None--'); // Filter out invalid options
  });

  // If no valid options are available, close the dropdown and skip selection (works for none only values and dependend picklists with no values)
  if (values.length === 0) {
    //console.log('No valid options; skipping');
    await page.keyboard.press('Escape');
    await listbox.waitFor({ state: 'hidden', timeout: 1000 }).catch(() => {});
    return null;
  }

  // Randomly select one of the available options
  const picked = values[Math.floor(Math.random() * values.length)];

  await listbox.locator(`[role="option"][data-value="${picked}"]`).click({ force: true });
  await listbox.waitFor({ state: 'hidden', timeout: 2000 }).catch(async () => {
    // If still open after click, force close with Escape
    await page.keyboard.press('Escape');
  });

  return picked.label; // Return the selected value to update Data object


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