// Objects to import
import { test, expect } from '@playwright/test';
import login from '../framework/Objects/Login/login';
import contactPage from '../framework/Objects/Contact/contactsPage';
import contactFormPage from '../framework/Objects/Contact/contactsFromPage';
import TopMenuPage from '../framework/Objects/topMenue/TopMenuPage';
import TopMenuActions from "../framework/Actions/topMenue/TopMenuActions";
import MFAPage from '../framework/Objects/Login/mfaPage';
import MFAActions from '../framework/Actions/Login/mfaActions';
import ENV from '../framework/config/env';

// Actions to import
import LoginActions from '../framework/Actions/Login/loginActions';
import contactActions from "../framework/Actions/Contact/contactsActions"

// Steps to import
import AuthSteps from '../framework/Steps/Login/loginSteps';
import contactsSteps from '../framework/Steps/contactSteps/contactSteps';

// Data to import
import {contactDataset} from '../framework/data/Contact/contactData';
import contactDetailPage from '../framework/Objects/Contact/contactDetailPage';

test.describe.serial(" Contact Creation And Validation", () => {
  test.setTimeout(120000);

  let page;
  let contactData;
  let contactSteps;

  // Login ONCE before all tests — shared session
  test.beforeAll(async ({ browser }) => {
    contactData = contactDataset();
    
    // Create a single shared page for all tests in this suite
    page = await browser.newPage();
    await page.goto(ENV.baseUrl);

    const loginPage = new login(page);
    const mfaPage = new MFAPage(page);
    const loginActions = new LoginActions(loginPage, mfaPage, page);
    const mfaActions = new MFAActions(mfaPage);
    const authSteps = new AuthSteps(loginActions, mfaActions);

    await authSteps.AuthSteps();
  });

  // Close the shared page after all tests
  test.afterAll(async () => {
    await page.close();
  });

  // Rebuild steps before each test using the shared page
  test.beforeEach(async () => {
    contactSteps = new contactsSteps(
      new TopMenuActions(new TopMenuPage(page)),
      new contactActions(
        new contactPage(page),
        new contactFormPage(page),
        new contactDetailPage(page),
      ),
    );
  });

  // ── Test 1: Validate picklist values ──────────────────────────────────
  test("Validate picklist values (All)", async () => {
    await contactSteps.validatePicklitsValues()
});
  // ── Test 2: Validate labels in Form & Details pages ──────────────────────────────────
  test("Validate labels (All)", async () => {
    await contactSteps.validateLabels(contactData)
});

});