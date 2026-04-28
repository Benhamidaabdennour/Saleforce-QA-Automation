class homeSteps{
    constructor(homePage, homeActions){
        this.homePage = homePage;
        this.homeActions = homeActions;
    }

    async validationNotificationCount(){
        await this.homeActions.validateNotification();
    }

    async validationNotificationText(){
        await this.homeActions.validatetNotificationText();
    }

    async openNotificationRecord(){
        await this.homeActions.openNotificationRecord();
    }
}

export default homeSteps;