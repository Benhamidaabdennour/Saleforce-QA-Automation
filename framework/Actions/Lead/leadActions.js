import { expect } from '@playwright/test';
function normalize(value) {
    return value
        ?.replace(/\u00A0/g, ' ')   // replace non-breaking spaces
        ?.replace(/\s+/g, ' ')      // collapse spaces
        ?.trim();
}
class leadActions {
    constructor(leadPage, leadDetailsPage,page){
        this.page = page;
        this.leadPage = leadPage;
        this.leadDetailsPage = leadDetailsPage;
    }
    async selectAllLeadsList(){
        await this.leadPage.listViewPicker.click()
        await this.leadPage.recentListViewsText.waitFor({state: 'visible'})
        await this.leadPage.listVewAllLeads.click()
    }

async searchLeadInListView(leadName, { maxWaitMs = 100000, intervalMs = 5000 } = {}) {

  await this.leadPage.listVewSearchBox.waitFor({ state: 'visible', timeout: 15000 });

  const start = Date.now();

  while (Date.now() - start < maxWaitMs) {

    // refresh list view data
    await this.leadPage.refreshButton.click();

    // small wait for Salesforce to fetch data
    await this.page.waitForTimeout(1000);

    // search again
    await this.leadPage.listVewSearchBox.fill('');
    await this.leadPage.listVewSearchBox.fill(leadName);
    await this.leadPage.listVewSearchBox.press('Enter');

    const lead = this.leadPage.getLeadLinkByName(leadName);

    if (await lead.first().isVisible().catch(() => false)) {

      await lead.first().evaluate(el => el.click());

      await this.page.waitForURL('**/view', { timeout: 15000 });
      await this.leadDetailsPage.detailsTab.click();

      return;
    }

    console.log(`Still not found... ${Math.round((Date.now() - start)/1000)}s`);

    await this.page.waitForTimeout(intervalMs);
  }

  throw new Error(`Lead not found after ${maxWaitMs / 1000}s`);
}


async getFieldsValues(){
        await this.leadDetailsPage.name.waitFor({state: 'visible'})

        return {
            leadName:   (await this.leadDetailsPage.name.innerText()).trim(),
            company:    normalize(await this.leadDetailsPage.company.innerText()),
            phone:      normalize(await this.leadDetailsPage.phone.innerText()),
            email:      (normalize(await this.leadDetailsPage.email.innerText())).toLowerCase()
        }
    }

async validateWebtoLeadData(expectedData, actualData) {
    const expected = {
        leadName:   normalize(expectedData.fullName),
        company:    normalize(expectedData.company),
        phone:      normalize(expectedData.phone),
        email:      normalize(expectedData.email)?.toLowerCase()
    };

    const actual = {
        leadName:   normalize(actualData.leadName),
        company:    normalize(actualData.company),
        phone:      normalize(actualData.phone),
        email:      normalize(actualData.email)?.toLowerCase()
    };

    const failures = [];

    for (const key of Object.keys(expected)) {
        if (actual[key] !== expected[key]) {
            failures.push(
                `❌ ${key}:\n   expected: "${expected[key]}"\n   actual:   "${actual[key]}"`
            );
        } else {
            console.log(`✅ ${key}`);
        }
    }

    if (failures.length > 0) {
        throw new Error(`Web to Lead validation failed:\n${failures.join('\n')}`);
    }
}
}
export default leadActions;