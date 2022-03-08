//import { expect } from 'chai';
import { element, By} from 'protractor';

export class AccountPage {

    async gotoAccount(accountName: any) {
        
    }
    async clickTab(tabName: any) {
        
        await element(By.xpath(`//lightning-tab-bar//a[text()="${tabName}"]`)).safeClick();
            
    }   
}