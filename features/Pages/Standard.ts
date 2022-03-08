import { DataTable } from '@cucumber/cucumber';
//import { expect } from 'chai';
import { browser, $, element, By, Key} from 'protractor';

export class Standard {
    
    // public static xpathActiveWorkspace: string = '//div[@role="tabpanel" and contains(@class, "oneWorkspace") and contains(@class, "active")]';
    public static xpathActiveWorkspace: string = '';
    public static xpathObjectHome: string = '//div[contains(@class, "oneConsoleObjectHome")]';
    public static xpathContextualMenu: string = '//div[contains(@class, "uiPopupTarget") and contains(@class, "visible")]';
    

    async navigateTo(url: string) {
        await browser.get(url);

    }

    async login(username: string, password: string) {        
        await $('#username').safeSendKeys(username);
        await $('#password').safeSendKeys(password);
        await $('#Login').safeClick();
        
    }

    async clickButton(buttonName: string) {
        await element(By.xpath(`${Standard.xpathActiveWorkspace}//a[@role="button"]//div[@title="${buttonName}"] | ${Standard.xpathActiveWorkspace}//button[text()="${buttonName}"]`)).safeClick();
    }

    async clickButtonOnListView(buttonName: string) {
        // The buton can be on the main list view page which does not stay under xpathActiveWorkspace
        await element(By.xpath(`${Standard.xpathObjectHome}//a[@role="button"]//div[@title="${buttonName}"] | ${Standard.xpathObjectHome}//button[string()="${buttonName}"]`)).safeClick();
    }

    async clickButtonOnContextualMenu(buttonName: string) {
        await element(By.xpath(`${Standard.xpathContextualMenu}//div[@role="button" and @title="${buttonName}"] | ${Standard.xpathContextualMenu}//button[string()="${buttonName}"]`)).safeClick();
    }

    async clickEditFieldOnRecordDetails(fieldLabel: string) {
       
        var fieldXPathBasedOnLabel = `${Standard.xpathActiveWorkspace}//force-record-layout-item//div[contains(@class, "slds-form-element__label")]/span[text()="${fieldLabel}"]/../..//div[contains(@class, "slds-form-element__control")]/button[contains(@title, "Edit ${fieldLabel}")]`;
        await element(By.xpath(fieldXPathBasedOnLabel)).scrollTo();
        await element(By.xpath(fieldXPathBasedOnLabel)).safeClick();
    }

    urlChanged(url: string) {
        return async function () {
            const actualUrl = await browser.getCurrentUrl();
            return url != actualUrl;
        };
    };

    async waitForUrlChanged(url: string, timeout: number = 20000) {
        await browser.wait(this.urlChanged(url), timeout);
    }

    async waitForListViewFinishLoading() {
        var isListviewPresent = await element(By.xpath(`//div[contains(@class, "listViewContainer")]//div[contains(@class, "slds-spinner_container")]`)).isPresent();
        if(isListviewPresent)
            await element(By.xpath(`//div[contains(@class, "listViewContainer")]//div[contains(@class, "slds-spinner_container") and contains(@class, "slds-hide")]`)).waitToBePresent();

        await browser.sleep(1000);
    };

    async selectObject(objName: string) {
        await element(By.xpath(`//a[@title="${objName}"]/parent::*`)).safeClick();
        await element(By.xpath(`//nav/ol/li/span[text()="${objName}"]`)).waitToBeVisible();
        await this.waitForListViewFinishLoading();
    }

    async selectObjectConsole(objName: string) {
        await element(By.xpath('//button[@title="Show Navigation Menu"]')).safeClick();
        await element(By.xpath(`//li[@class="slds-listbox__item"]//span[text()="${objName}"]`)).safeClick();
        await this.waitForListViewFinishLoading();
    }

    async selectListView(listviewName: string) {
        await element(By.xpath('//button[@title="Select List View"]')).safeClick();
        await element(By.xpath(`//li/a/span[text()="${listviewName}"]`)).safeClick();
        await this.waitForListViewFinishLoading();
    }

    async listviewShowRecords() {
        await element(By.xpath(`//div[contains(@class, "listViewContent")]//table/tbody/tr[position()=1]`)).waitToBeVisible();
    }

    async listviewNoRecords() {
        await element(By.xpath(`//span[text()="No items to display."]`)).waitToBeVisible();
    }

    async clickAppLauncher() {
        await element(By.xpath('//span[text()="App Launcher"]/parent::*')).safeClick();
    }

    async selectApplication(appName: string) {
        await this.clickAppLauncher();
        await element(By.xpath('//input[@placeholder="Search apps and items..."]')).safeSendKeys(appName);
        await element(By.xpath(`//one-app-launcher-menu-item/a[@data-label="${appName}"]/parent::*`)).safeClick();

        await element(By.xpath(`//div[contains(@class, "appName")]/span[@title="Service Console"]`)).waitToBeVisible();
        await browser.sleep(2000);
    }

    async selectTabInTheActivePage(tabName: string) {
        await element(By.xpath(`${Standard.xpathActiveWorkspace}//lightning-tab-bar//li[@title="${tabName}"]/a`)).safeClick();
    }

    async verifyReadonlyFields(table: DataTable) {
        const raw = table.raw();
        for (let i = 0; i < raw.length; i++) {
            var fieldname = raw[0];
            var fieldXPathBasedOnLabel = `${Standard.xpathActiveWorkspace}//force-record-layout-item//div[contains(@class, "slds-form-element__label")]/span[text()="${fieldname}"]/../..//div[contains(@class, "slds-form-element__control")]/span[contains(@class, "is-read-only")]/node()`;
            await element(By.xpath(fieldXPathBasedOnLabel)).waitToBePresent();
        }
    }

    async fillRecordDetailsForm(formName: string, table: DataTable) {

        browser.driver.manage().window().maximize()
        if(formName)
            await element(By.xpath(`//h2[text()="${formName}"]`)).waitToBeVisible();

        const hashes = table.hashes();
        for (let i = 0; i < hashes.length; i++) {
            for(let key of Object.keys(hashes[i])) {
                var inputFieldXPath = null;
                inputFieldXPath = `//lightning-input//label[text()="${key}"]/..//input`;
                inputFieldXPath +=`|//slot[@slot='inputField']//label[text()="${key}"]/../..//input`;        
              
                await element(By.xpath(inputFieldXPath)).safeClear();
                await element(By.xpath(inputFieldXPath)).safeSendKeys(hashes[i][key]);
            }
        }
    }
   

    async closeSuccessAlertWithText(msg: string) {
        await element(By.xpath(`//div[@data-key="success" and @role="alert"]//span[contains(@class, "toastMessage") and contains(string(),"${msg}")]`)).waitToBeVisible();
        await element(By.xpath('//div[@data-key="success" and @role="alert"]//button[@title="Close"]')).safeClick();
    }

    async verifyRecordDetails(table: DataTable) {
        const hashes = table.hashes();
        for (let i = 0; i < hashes.length; i++) {
            for(let key of Object.keys(hashes[i])) {
                var fieldXPathBasedOnLabel = `${Standard.xpathActiveWorkspace}//force-record-layout-item//div[contains(@class, "slds-form-element__label")]/span[text()="${key}"]/../..//div[contains(@class, "slds-form-element__control")]/span//slot[@slot="outputField"]/descendant::*`;
                await element(By.xpath(fieldXPathBasedOnLabel)).safeValidateText(hashes[i][key]);
            }
        }
    }

    async verifyHighlightPanel(table: DataTable) {
        const hashes = table.hashes();
        for (let i = 0; i < hashes.length; i++) {
            for(let key of Object.keys(hashes[i])) {
                var fieldXPathBasedOnLabel = `${Standard.xpathActiveWorkspace}//records-lwc-highlights-panel//force-highlights-details-item/div/p[text()="${key}"]/..//slot[@force-highlightsdetailsitem_highlightsdetailsitem]/descendant::*`;
                await element(By.xpath(fieldXPathBasedOnLabel)).safeValidateText(hashes[i][key]);
            }
        }
    }

    async validationruleAlertAtField(fieldLabel: string, errMsg: string) {
        var fieldXPathBasedOnLabel = `${Standard.xpathActiveWorkspace}//records-base-record-form//label[text()="${fieldLabel}"]/../div[@role="alert"]`;
        await element(By.xpath(fieldXPathBasedOnLabel)).safeValidateText(errMsg);
    }

    async validationruleAlertOnPage(errMsg: string) {
        var weHitSnagPageLevelErrorXPath =  `//div[@role="dialog"]//force-record-edit-error//div[@class="pageLevelErrors"]/ul//li[text()="${errMsg}"]`;
        await element(By.xpath(weHitSnagPageLevelErrorXPath)).waitToBePresent();
    }

    async globalSearch(txt: string) {
        var globalsearchXPath = '//div[contains(@class, "slds-global-header__item--search")]//input[contains(@placeholder, "Search")]';
        await element(By.xpath(globalsearchXPath)).safeClear();
        await element(By.xpath(globalsearchXPath)).safeSendKeys(txt);
        await browser.sleep(1000);
        await element(By.xpath(globalsearchXPath)).safeSendKeys(Key.ENTER);
    }

    async globalSearchFoundObject(objectName: string) {
        await element(By.xpath(`//div[contains(@class, "forceSearchResultsMultiScope")]//div[contains(@class, "searchResultsGridHeader")]//h2/a[text() = "${objectName}"]`)).waitToBeVisible();
    }

    async globalSearchNoResult() {
        await element(By.xpath('//div[contains(@class, "forceSearchNoResults")]')).waitToBeVisible();
    }

    async componentFinishedLoading() {
        await element(By.xpath(`${Standard.xpathActiveWorkspace}//div[contains(@class, "forceComponentSpinner") and contains(@class, "hideSpinner")]`)).waitToBePresent();
    }

//Add by PSR Start
    async selectRecordType(recordType: string) {
        await element(By.xpath(`//div[@class="slds-form-element__control"]/label/span[text()="${recordType}"]/parent::*`)).safeClick();
    }
    async selectPicklistRecordDetailsForm(formName: string, table: DataTable) {
        if(formName)
            await element(By.xpath(`${Standard.xpathActiveWorkspace}//h2[text()="${formName}"]`)).waitToBeVisible();

        const hashes = table.hashes();
        for (let i = 0; i < hashes.length; i++) {
            for(let key of Object.keys(hashes[i])) {
                var inputFieldXPath = null;
                inputFieldXPath = `${Standard.xpathActiveWorkspace}//div[@class="slds-form-element__control"]//span[text()="${key}"]/../..`;
                inputFieldXPath +=`|${Standard.xpathActiveWorkspace}//slot[@slot='inputField']//label[text()="${key}"]/../..`;
                
                await element(By.xpath(inputFieldXPath)).safeClick();
                inputFieldXPath = `//div[@role="menu"]//li/a[text()="${hashes[i][key]}"]/../a`;
                inputFieldXPath +=`|${Standard.xpathActiveWorkspace}//slot[@slot='inputField']//label[text()="${key}"]/../..//lightning-base-combobox-item//span[@title="${hashes[i][key]}"]/../..`;
                await element(By.xpath(inputFieldXPath)).safeClick();
                 
            }
        }
    }
    async associateRecordDetailsForm(formName: string, table: DataTable) {
       
        if(formName)
        {
            await element(By.xpath(`${Standard.xpathActiveWorkspace}//h2[text()="${formName}"]`)).waitToBeVisible();
        }
        const hashes = table.hashes();
        for (let i = 0; i < hashes.length; i++) {
            for(let key of Object.keys(hashes[i])) {
                var inputFieldXPath  = `${Standard.xpathActiveWorkspace}//div[@class="slds-form-element__control"]//span[text()="${key}"]/../..//input`;
                inputFieldXPath +=`|${Standard.xpathActiveWorkspace}//slot[@slot='inputField']//label[text()="${key}"]/../..//input`;
                await element(By.xpath(inputFieldXPath)).safeSendKeys(hashes[i][key]);
              
                
                //var selectionXPath = `//div[@class="slds-form-element__control"]//span[text()="${key}"]/../..//div[@class="listContent"]//li/a//div[contains(@title, "${hashes[i][key]}")]/../..`;
                //selectionXPath +=`|${Standard.xpathActiveWorkspace}//slot[@slot='inputField']//label[text()="${key}"]/..//lightning-base-combobox//div[@role='none']`;
                //await element(By.xpath(selectionXPath)).waitToBeVisible();
                
                var lookupItemXPath = `${Standard.xpathActiveWorkspace}//div[@class="slds-form-element__control"]//span[text()="${key}"]/../..//div[@class="listContent"]//li/a//div[contains(@title, "${hashes[i][key]}")]/../../..`;
                lookupItemXPath +=`|${Standard.xpathActiveWorkspace}//slot[@slot='inputField']//label[text()="${key}"]/../..//lightning-base-combobox-item//span[contains(@title, "${hashes[i][key]}")]/../../..`;
                
                console.log(lookupItemXPath);
                await element(By.xpath(lookupItemXPath)).safeClick();
                

            }
        }
    }

      
    async selectRemoveMuliValuePickRecordDetailsForm(formName: string, table: DataTable,mode :string) {
        if(formName)
            await element(By.xpath(`${Standard.xpathActiveWorkspace}//h2[text()="${formName}"]`)).waitToBeVisible();

        const hashes = table.hashes();
        for (let i = 0; i < hashes.length; i++) {
            for(let key of Object.keys(hashes[i])) {
                var valuelist = (hashes[i][key]).split(';');
                for(let val of valuelist) 
                {
                    var inputFieldXPath  = `${Standard.xpathActiveWorkspace}//div[@class="slds-form-element__control"]//div[text()="${key}"]/..//span[text()="${mode}"]/..//li//span[@title='${val}']`;
                    inputFieldXPath +=`|${Standard.xpathActiveWorkspace}//slot[@slot='inputField']//div[text()="${key}"]/..//span[text()="${mode}"]/..//li//span[@title='${val}']`;
                    //div[@class="slds-form-element__control"]//div[text()="Regional category"]/..//li//span[@title='A2W']
                    await element(By.xpath(inputFieldXPath)).safeClick();
                    var clickMode = "Chosen";
                    if(mode=="Chosen") clickMode = "Available"
                    var moveToSelection  = `${Standard.xpathActiveWorkspace}//div[@class="slds-form-element__control"]//div[text()="${key}"]/../..//button[@title='Move selection to ${clickMode}']`;
                    moveToSelection +=`|${Standard.xpathActiveWorkspace}//slot[@slot='inputField']//div[text()="${key}"]/../..//button[@title='Move selection to ${clickMode}']`;
                    await element(By.xpath(moveToSelection)).safeClick();
                }
            }
        }
    }
   

}