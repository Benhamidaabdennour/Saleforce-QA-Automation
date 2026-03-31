import { expect } from '@playwright/test';

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
    //console.log('No valid options; closing cleanly'); uncomment for debugging only
    await page.keyboard.press('Escape');
    await listbox.waitFor({ state: 'hidden', timeout: 1000 }).catch(() => {});
    return null;
  }

  const picked = values[Math.floor(Math.random() * values.length)];
// 77 to 79 (included) are a test to see if it's more robust
    const option = listbox.locator(`[role="option"][data-value="${picked.value}"]`);
    await option.scrollIntoViewIfNeeded();
    await option.click({ force: true });  
    
    await listbox.waitFor({ state: 'hidden', timeout: 3000 }).catch(async () => {
    await page.keyboard.press('Escape');
  });

  // Read what the field now displays — this is the full label (e.g. "United States" not "US")
  const displayedValue = await fieldLocator.inputValue().catch(() => 
    fieldLocator.getAttribute('data-value')
  );

  return displayedValue;
}

async function getPicklistValues(fieldLocator) {
  // Keeping same logic from "selectRandomPicklist()"
  // Following same safety checks to avoid having two or more picklists activated in the backend
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
    return [];
  }
  // Making sure no empty picklists are tested
  const listbox = page.locator(`#${controlsId}`);
  await listbox.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});

  if (!await listbox.isVisible().catch(() => false)) {
    console.log('Listbox not visible; skipping');
    return [];
  }

  const values = await page.locator(`#${controlsId} [role="option"]`).evaluateAll(opts =>
    opts.map(o => o.getAttribute('data-value')).filter(v => v && v !== '--None--')
  );

  // Close the listbox after reading
  await fieldLocator.press('Escape');

  return values;
}

async function validatePicklistValues(fieldLocator, expectedValues, fieldName) {
  // Comparing two arrays with filter method to avoind going through all values
  // if they match it will pass, if not, we will know if it's missing values or has more compared to expected in the data files
  const actualValues = await getPicklistValues(fieldLocator);
  
  const missing = expectedValues.filter(v => !actualValues.includes(v));
  const extra   = actualValues.filter(v => !expectedValues.includes(v));
  
  // Loggin any extra or missing values to make fix easier
  if (missing.length > 0) console.error(`Missing values: ${missing}`);
  if (extra.length > 0)   console.warn(`Unexpected extra values: ${extra}`);

  expect(missing).toHaveLength(0);
  expect(extra).toHaveLength(0);

  // Logging which field is being validated
  console.log("✅ " + fieldName + " " + "picklist values are correct.")

  // return if need for loggin later
  return actualValues;
}

async function getFormFieldLabels(page) {
  // Get all labeled form elements via ARIA
  const labels = await page.locator('[role="group"] label, .slds-form-element__label').allTextContents();
  return labels
    .map(l => l.trim().replace('*', '').trim())
    .filter(l => l.length > 0);
}

async function getDetailPageFieldLabels(page) {
  // Detail page uses dt elements for labels, so we query them all
  const labels = await page.locator('dt, .slds-form-element__label').allTextContents();
  return labels
    .map(l => l.trim().replace('*', '').trim())
    .filter(l => l.length > 0);
}

async function getRelatedListTitles(page) {
  const titles = await page
    .locator('[role="tabpanel"]').first() // Related is always first tabpanel
    .locator('article h2, article h3')
    .allTextContents();

    return titles
    .map(t => t.trim().replace(/\(\d+\)/g, '').trim())
    .filter(t => t.length > 0);
}
async function validateRelatedLists(page, expectedLists) {
  //Simple filter function to handle what's missing and/ or extra for better reporting
  const actualLists = await getRelatedListTitles(page);
  
  const missing = expectedLists.filter(l => !actualLists.includes(l));
  const extra   = actualLists.filter(l => !expectedLists.includes(l));

  if (missing.length > 0) console.error(`❌ Missing related lists: ${missing.join(', ')}`);
  if (extra.length > 0)   console.error(`❌ Extra related lists not in expected: ${extra.join(', ')}`);

  expect(missing).toHaveLength(0);
  expect(extra).toHaveLength(0);

  console.log(`✅ All expected related lists are present`);
}

export {  lookupSelector, 
          selectRandomPicklist, 
          getPicklistValues, 
          validatePicklistValues, 
          getDetailPageFieldLabels, 
          getFormFieldLabels,
          validateRelatedLists,
          getRelatedListTitles
      };