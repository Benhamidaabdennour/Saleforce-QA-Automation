// Objects to import
import { test, expect } from '@playwright/test';
import login from '../framework/Objects/Login/login';
import opportunitiesPage from '../framework/Objects/Opportunities/opportunitiesPage';
import signedProjectsForm from '../framework/Objects/Opportunities/signedProjectsForm';
import signedProjectsDetails from '../framework/Objects/Opportunities/signedProjectsDetails'
import newProjectsForm from '../framework/Objects/Opportunities/newProjectsForm';
import opportunityDetailsPage from '../framework/Objects/Opportunities/opportunityDetailsPage';
import TopMenuPage from '../framework/Objects/topMenue/TopMenuPage';
import TopMenuActions from "../framework/Actions/topMenue/TopMenuActions";
import MFAPage from '../framework/Objects/Login/mfaPage';
import MFAActions from '../framework/Actions/Login/mfaActions';
import ENV from '../framework/config/env';
import homePage from '../framework/Objects/Home/homePage';
import homeActions from '../framework/Actions/homePageActions/homeActions';
import homeSteps from '../framework/Steps/homeSteps/homeSteps';

// Actions to import
import LoginActions from '../framework/Actions/Login/loginActions';
import opportunityActions from "../framework/Actions/Opportunities/opportunityActions"

// Steps to import
import AuthSteps from '../framework/Steps/Login/loginSteps';
import opportunitySteps from '../framework/Steps/Opportunities/opportunitySteps';

// Data to import
import {contactDataset} from '../framework/data/Contact/contactData';
import contactDetailPage from '../framework/Objects/Contact/contactDetailPage';

test.describe.serial(" Opportunity Creation And Validation", () => {
  test.setTimeout(120000);

  let page;
  let opportunityData;
  let steps;
  let homePageSteps;

  // Login ONCE before all tests — shared session
  test.beforeAll(async ({ browser }) => {
    
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
    steps = new opportunitySteps(
      new TopMenuActions(new TopMenuPage(page)),
      new opportunityActions(
        new opportunitiesPage(page),
        new signedProjectsForm(page),
        new newProjectsForm(page),
        new opportunityDetailsPage(page),
        new signedProjectsDetails(page)
      ),
    );

    homePageSteps = new homeSteps(
      new homePage(page),
      new homeActions(
        new homePage(page)
      )
    );
  }
    );
  // ── Test 1: Create a new Contact & Validate Creation ──────────────────────────────────
  test("Create new Opportunity", async () => {
    await steps.createSignedProject();
  });

  test("Close new Opportunity to Contract", async () => {
    await steps.createSignedProject();
    await steps.closeWinOpportunity();
    await homePageSteps.validationNotificationCount();
    await homePageSteps.validationNotificationText();
    await homePageSteps.openNotificationRecord();

  });

    test("Amount Validation Rule", async () => {
        

  });

});