import { expect } from "@playwright/test";
import { getTodayRecord } from "../../utils/saveToJson";

class homeActions{
    constructor(homePage){
        this.homePage = homePage;
    }

    async clearNotifications(){
        await this.homePage.notificationIcon.click();
        await this.homePage.press("Escape");
    }

    async openNotifications(){
        await this.homePage.notificationIcon.click();
    }

    async getNotificationCount(){
        const countText = await this.homePage.notificationCount.innerText();
        const count = parseInt(countText);
        return isNaN(count) ? 0 : count;
    }

    async validateNotification(){
        const count = await this.getNotificationCount()
        expect(count).toBeGreaterThan(0);
        if(count > 0){
            console.log(`Contract Notification received ✅`);
        }else{
            console.log(`No Contract Notification received ❌`);
        }
    }
    async validatetNotificationText() {
        const data = getTodayRecord('opportunity');

        await this.openNotifications();

        // 🔥 Wait for the correct notification TITLE to appear
        const notificationItem = this.homePage.notificationItems
            .filter({ hasText: data.opportunityName })
            .first();

        await expect(notificationItem).toBeVisible({ timeout: 15000 });

        // 🔥 Now assert inside THAT item (not global latest)
        await expect(notificationItem).toContainText(data.opportunityName);

        await expect(notificationItem).toContainText(
            "A new Contract is Created from the opportunity."
        );

        console.log(`Notification text is correct ✅`);
    }
    async openNotificationRecord(){
        await this.homePage.latestNotificationText.click();
            // Wait for the record page to load by checking for a unique element on the record page        
            await this.homePage.page.waitForURL('**/lightning/r/Contract/*/view', { timeout: 10000 });
            console.log(`Navigated to Contract record page successfully ✅`);
    }

}
export default homeActions;