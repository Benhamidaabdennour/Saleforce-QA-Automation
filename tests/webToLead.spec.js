import { test } from '@playwright/test';
import login from '../framework/Objects/Login/login';
import TopMenuPage from '../framework/Objects/topMenue/TopMenuPage';
import TopMenuActions from "../framework/Actions/topMenue/TopMenuActions";
import MFAPage from '../framework/Objects/Login/mfaPage';
import MFAActions from '../framework/Actions/Login/mfaActions';
import ENV from '../framework/config/env';
import webToleadPage from '../framework/Objects/Lead/webToLeadPage';
import leadSteps from '../framework/Steps/leadSteps/leadSteps';
import leadPage from '../framework/Objects/Lead/leadPage';
import leadActions from '../framework/Actions/Lead/leadActions';

// Actions to import
import LoginActions from '../framework/Actions/Login/loginActions';
import webToLeadActions from "../framework/Actions/Lead/webtoLeadActions";

// Steps to import
import AuthSteps from '../framework/Steps/Login/loginSteps';

// Data to import
import {webToLeadDataset} from '../framework/data/Lead/leadData';
import leadDetailsPage from '../framework/Objects/Lead/leadDetailsPage';

test.describe.serial(" Web To Lead operations", () => {
  test.setTimeout(120000);

  let page;
  let webToLeadData;
  let leadsSteps;

  // Login ONCE before all tests — shared session
  test.beforeAll(async ({ browser }) => {
    webToLeadData = webToLeadDataset();
    
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
    await page.goto("file:///Users/admin/Downloads/web_to_lead_html_form_playwright_ready.html");

    leadsSteps = new leadSteps(new webToLeadActions(
        new webToleadPage(page), page),
        new TopMenuActions(new TopMenuPage(page)),
        new leadPage(page),
        new leadActions(new leadPage(page),new leadDetailsPage(page), page)
    );
  });
  // ── Test 1: Submit Web To Lead form ──────────────────────────────────
  test("Submit Web To Lead form", async () => {
    await leadsSteps.submitWebToLeadForm();
    await page.goto(ENV.baseUrl);
    await leadsSteps.validateWebToLeadCreation();

  });
  test("Inspect Web To Lead Assignment", async () => {
    await leadsSteps.submitWebToLeadForm();
    await page.goto(ENV.baseUrl);
    await leadsSteps.validateWebToLeadAssignment();

  });

});