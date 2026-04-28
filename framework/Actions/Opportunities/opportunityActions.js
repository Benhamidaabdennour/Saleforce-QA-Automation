import { tr } from "@faker-js/faker";
import {lookupSelector, selectRandomPicklist, validatePicklistValues, getFormFieldLabels, getDetailPageFieldLabels, validateRelatedLists } from "../../utils/helpers.js";
import { expect } from '@playwright/test';

const normalize = (str) => str?.replace(/\u00A0/g, ' ').replace(/\r/g, '').trim();

class opportunityActions{
    constructor(opportunitiesPage, newProjectsForm, signedProjectsForm, opportunityDetailsPage, signedProjectsDetails) {
        this.opportunitiesPage = opportunitiesPage;
        this.newProjectsForm = newProjectsForm;
        this.signedProjectsForm = signedProjectsForm;
        this.opportunityDetailsPage = opportunityDetailsPage;
        this.signedProjectsDetails = signedProjectsDetails;
    }
    async selectPicklist(buttonLocator, value) {
        //await buttonLocator.scrollIntoViewIfNeeded();
        await buttonLocator.focus();
        await buttonLocator.click();
        await this.signedProjectsForm.page.waitForTimeout(1000);

        await this.signedProjectsForm.page
        .getByRole("option", { name: value, exact: true })
        .click();
  }

    async openNewProjectForm(){
        await this.opportunitiesPage.newBtn.waitFor({state: 'visible'})
        await this.opportunitiesPage.newBtn.click()
        await this.opportunitiesPage.newProjectRecordType.waitFor({state: 'visible'})
        await this.opportunitiesPage.newProjectRecordType.click()
        await this.newProjectsForm.opportunityName.waitFor({state: 'visible'})
        }
    async openSignedProjectForm(){
        await this.opportunitiesPage.newBtn.waitFor({state: 'visible'})
        await this.opportunitiesPage.newBtn.click()
        await this.opportunitiesPage.signedProjectRecordType.waitFor({state: 'visible'})
        await this.opportunitiesPage.recordTypeNextBtn.click()
        await this.signedProjectsForm.opportunityName.waitFor({state: 'visible'})
        }

    async fillSignedProject(data){
        await this.signedProjectsForm.opportunityName.fill(data.opportunityName)
        await lookupSelector(this.signedProjectsForm.accountName, data.accountName)
        const type = await selectRandomPicklist(this.signedProjectsForm.type)
        const leadSource = await selectRandomPicklist(this.signedProjectsForm.leadSource)
        await this.signedProjectsForm.endDate.fill(data.endDate)
        await this.signedProjectsForm.closeDate.fill(data.closeDate)
        await this.selectPicklist(this.signedProjectsForm.stage, data.stageName)
        await this.signedProjectsForm.amount.fill(data.amount)
        await this.signedProjectsForm.trackingNumber.fill(data.trackingNumber)
        await this.signedProjectsForm.description.fill(data.description)

        data.type = type
        data.leadSource = leadSource
    }

    async saveForm() {
        // This function was edited to include waiting before clicking on Details Tab
        // by validation that the url changed to an actual record
        await this.signedProjectsForm.saveBtn.click();
        
        // Wait for the modal to close (form disappears after successful save)
        await this.signedProjectsForm.saveBtn.waitFor({ state: 'hidden', timeout: 10000 });
        
        // Wait for navigation to detail page
        await this.signedProjectsForm.saveBtn.page().waitForURL('**/view', { timeout: 10000 });
        }

async closeWinOpportunity() {
  const page = this.signedProjectsDetails.page;
  const stageBtn = this.signedProjectsDetails.stageBtn.first();

  // 1. Progress through Path stages
  for (let i = 0; i < 6; i++) {
    const dialogs = page.locator('[role="dialog"]:visible');

    if (await dialogs.count() === 1) break;

    await stageBtn.click();

    // wait for UI stabilization
    await page.waitForTimeout(600);
  }

  // 2. Ensure exactly ONE dialog (issue with multiple dialogs appearing in Lightning)
  const dialog = page.locator('[role="dialog"]:visible').last();
  await dialog.waitFor();

  const dialogCount = await page.locator('[role="dialog"]:visible').count();
  if (dialogCount > 1) {
    // close extra ones (escape works reliably)
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);
  }

  // Re-query dialog AFTER cleanup
  const activeDialog = page.locator('[role="dialog"]:visible').last();
  await activeDialog.waitFor();

  // Select Closed Won from picklist (select element not combobox/ option)
  const select = activeDialog.locator('select').first();
  await select.waitFor();

  await select.selectOption({ value: 'Closed Won' });

  // CRITICAL: commit change (Lightning requirement)
  await select.focus();
  await page.keyboard.press('Tab');

  // wait for value to be applied
  await page.waitForFunction(
    el => el.value === 'Closed Won',
    await select.elementHandle()
  );

  //Get fresh Save button (avoid stale reference/ DOM Changes)
  const saveBtn = activeDialog.locator('button:visible').last();

  await page.waitForFunction(
    btn => !btn.disabled,
    await saveBtn.elementHandle()
  );

  // Click Save safely
  await saveBtn.click();

  // Wait for dialog to disappear
  await activeDialog.waitFor({ state: 'hidden', timeout: 10000 });

  // WAIT FOR SUCCESS TOAST (Confirming that toast is displayed as confirmation)
  await this.signedProjectsDetails.toastSuccess.waitFor({
    state: 'visible',
    timeout: 10000
  });

  // Extra safety: wait for backend flow execution (Issue with flow not executing while test closes record too fast)
  await page.waitForTimeout(1500);
    console.log(`Success toast text is displayed & correct ✅`);

}

    }


export default opportunityActions;