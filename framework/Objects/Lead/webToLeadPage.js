 class webToleadPage {
  constructor(page) {
    this.page = page;

    // Fields XPATHs
    this.fullName = page.locator("#name");
    this.company = page.locator("#company");
    this.email = page.locator("#email");
    this.phone = page.locator("#phone");
    this.submitBtn = page.locator("#submitBtn");
  }
}
export default webToleadPage;