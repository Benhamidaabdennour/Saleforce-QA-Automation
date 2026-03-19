 class contactPage {
    constructor(page){
        this.page = page;
        this.newBtn = page.getByRole('button', { name: 'New' })
    }
}
export default contactPage;