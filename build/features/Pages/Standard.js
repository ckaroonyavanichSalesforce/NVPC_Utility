"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Standard = void 0;
//import { expect } from 'chai';
const protractor_1 = require("protractor");
class Standard {
    async navigateTo(url) {
        await protractor_1.browser.get(url);
    }
    async login(username, password) {
        await protractor_1.$('#username').safeSendKeys(username);
        await protractor_1.$('#password').safeSendKeys(password);
        await protractor_1.$('#Login').safeClick();
    }
    async clickButton(buttonName) {
        await protractor_1.element(protractor_1.By.xpath(`${Standard.xpathActiveWorkspace}//a[@role="button"]//div[@title="${buttonName}"] | ${Standard.xpathActiveWorkspace}//button[text()="${buttonName}"]`)).safeClick();
    }
    async clickButtonOnListView(buttonName) {
        // The buton can be on the main list view page which does not stay under xpathActiveWorkspace
        await protractor_1.element(protractor_1.By.xpath(`${Standard.xpathObjectHome}//a[@role="button"]//div[@title="${buttonName}"] | ${Standard.xpathObjectHome}//button[string()="${buttonName}"]`)).safeClick();
    }
    async clickButtonOnContextualMenu(buttonName) {
        await protractor_1.element(protractor_1.By.xpath(`${Standard.xpathContextualMenu}//div[@role="button" and @title="${buttonName}"] | ${Standard.xpathContextualMenu}//button[string()="${buttonName}"]`)).safeClick();
    }
    async clickEditFieldOnRecordDetails(fieldLabel) {
        var fieldXPathBasedOnLabel = `${Standard.xpathActiveWorkspace}//force-record-layout-item//div[contains(@class, "slds-form-element__label")]/span[text()="${fieldLabel}"]/../..//div[contains(@class, "slds-form-element__control")]/button[contains(@title, "Edit ${fieldLabel}")]`;
        await protractor_1.element(protractor_1.By.xpath(fieldXPathBasedOnLabel)).scrollTo();
        await protractor_1.element(protractor_1.By.xpath(fieldXPathBasedOnLabel)).safeClick();
    }
    urlChanged(url) {
        return async function () {
            const actualUrl = await protractor_1.browser.getCurrentUrl();
            return url != actualUrl;
        };
    }
    ;
    async waitForUrlChanged(url, timeout = 20000) {
        await protractor_1.browser.wait(this.urlChanged(url), timeout);
    }
    async waitForListViewFinishLoading() {
        var isListviewPresent = await protractor_1.element(protractor_1.By.xpath(`//div[contains(@class, "listViewContainer")]//div[contains(@class, "slds-spinner_container")]`)).isPresent();
        if (isListviewPresent)
            await protractor_1.element(protractor_1.By.xpath(`//div[contains(@class, "listViewContainer")]//div[contains(@class, "slds-spinner_container") and contains(@class, "slds-hide")]`)).waitToBePresent();
        await protractor_1.browser.sleep(1000);
    }
    ;
    async selectObject(objName) {
        await protractor_1.element(protractor_1.By.xpath(`//a[@title="${objName}"]/parent::*`)).safeClick();
        await protractor_1.element(protractor_1.By.xpath(`//nav/ol/li/span[text()="${objName}"]`)).waitToBeVisible();
        await this.waitForListViewFinishLoading();
    }
    async selectObjectConsole(objName) {
        await protractor_1.element(protractor_1.By.xpath('//button[@title="Show Navigation Menu"]')).safeClick();
        await protractor_1.element(protractor_1.By.xpath(`//li[@class="slds-listbox__item"]//span[text()="${objName}"]`)).safeClick();
        await this.waitForListViewFinishLoading();
    }
    async selectListView(listviewName) {
        await protractor_1.element(protractor_1.By.xpath('//button[@title="Select List View"]')).safeClick();
        await protractor_1.element(protractor_1.By.xpath(`//li/a/span[text()="${listviewName}"]`)).safeClick();
        await this.waitForListViewFinishLoading();
    }
    async listviewShowRecords() {
        await protractor_1.element(protractor_1.By.xpath(`//div[contains(@class, "listViewContent")]//table/tbody/tr[position()=1]`)).waitToBeVisible();
    }
    async listviewNoRecords() {
        await protractor_1.element(protractor_1.By.xpath(`//span[text()="No items to display."]`)).waitToBeVisible();
    }
    async clickAppLauncher() {
        await protractor_1.element(protractor_1.By.xpath('//span[text()="App Launcher"]/parent::*')).safeClick();
    }
    async selectApplication(appName) {
        await this.clickAppLauncher();
        await protractor_1.element(protractor_1.By.xpath('//input[@placeholder="Search apps and items..."]')).safeSendKeys(appName);
        await protractor_1.element(protractor_1.By.xpath(`//one-app-launcher-menu-item/a[@data-label="${appName}"]/parent::*`)).safeClick();
        await protractor_1.element(protractor_1.By.xpath(`//div[contains(@class, "appName")]/span[@title="Service Console"]`)).waitToBeVisible();
        await protractor_1.browser.sleep(2000);
    }
    async selectTabInTheActivePage(tabName) {
        await protractor_1.element(protractor_1.By.xpath(`${Standard.xpathActiveWorkspace}//lightning-tab-bar//li[@title="${tabName}"]/a`)).safeClick();
    }
    async verifyReadonlyFields(table) {
        const raw = table.raw();
        for (let i = 0; i < raw.length; i++) {
            var fieldname = raw[0];
            var fieldXPathBasedOnLabel = `${Standard.xpathActiveWorkspace}//force-record-layout-item//div[contains(@class, "slds-form-element__label")]/span[text()="${fieldname}"]/../..//div[contains(@class, "slds-form-element__control")]/span[contains(@class, "is-read-only")]/node()`;
            await protractor_1.element(protractor_1.By.xpath(fieldXPathBasedOnLabel)).waitToBePresent();
        }
    }
    async fillRecordDetailsForm(formName, table) {
        protractor_1.browser.driver.manage().window().maximize();
        if (formName)
            await protractor_1.element(protractor_1.By.xpath(`//h2[text()="${formName}"]`)).waitToBeVisible();
        const hashes = table.hashes();
        for (let i = 0; i < hashes.length; i++) {
            for (let key of Object.keys(hashes[i])) {
                var inputFieldXPath = null;
                inputFieldXPath = `//lightning-input//label[text()="${key}"]/..//input`;
                inputFieldXPath += `|//slot[@slot='inputField']//label[text()="${key}"]/../..//input`;
                await protractor_1.element(protractor_1.By.xpath(inputFieldXPath)).safeClear();
                await protractor_1.element(protractor_1.By.xpath(inputFieldXPath)).safeSendKeys(hashes[i][key]);
            }
        }
    }
    async closeSuccessAlertWithText(msg) {
        await protractor_1.element(protractor_1.By.xpath(`//div[@data-key="success" and @role="alert"]//span[contains(@class, "toastMessage") and contains(string(),"${msg}")]`)).waitToBeVisible();
        await protractor_1.element(protractor_1.By.xpath('//div[@data-key="success" and @role="alert"]//button[@title="Close"]')).safeClick();
    }
    async verifyRecordDetails(table) {
        const hashes = table.hashes();
        for (let i = 0; i < hashes.length; i++) {
            for (let key of Object.keys(hashes[i])) {
                var fieldXPathBasedOnLabel = `${Standard.xpathActiveWorkspace}//force-record-layout-item//div[contains(@class, "slds-form-element__label")]/span[text()="${key}"]/../..//div[contains(@class, "slds-form-element__control")]/span//slot[@slot="outputField"]/descendant::*`;
                await protractor_1.element(protractor_1.By.xpath(fieldXPathBasedOnLabel)).safeValidateText(hashes[i][key]);
            }
        }
    }
    async verifyHighlightPanel(table) {
        const hashes = table.hashes();
        for (let i = 0; i < hashes.length; i++) {
            for (let key of Object.keys(hashes[i])) {
                var fieldXPathBasedOnLabel = `${Standard.xpathActiveWorkspace}//records-lwc-highlights-panel//force-highlights-details-item/div/p[text()="${key}"]/..//slot[@force-highlightsdetailsitem_highlightsdetailsitem]/descendant::*`;
                await protractor_1.element(protractor_1.By.xpath(fieldXPathBasedOnLabel)).safeValidateText(hashes[i][key]);
            }
        }
    }
    async validationruleAlertAtField(fieldLabel, errMsg) {
        var fieldXPathBasedOnLabel = `${Standard.xpathActiveWorkspace}//records-base-record-form//label[text()="${fieldLabel}"]/../div[@role="alert"]`;
        await protractor_1.element(protractor_1.By.xpath(fieldXPathBasedOnLabel)).safeValidateText(errMsg);
    }
    async validationruleAlertOnPage(errMsg) {
        var weHitSnagPageLevelErrorXPath = `//div[@role="dialog"]//force-record-edit-error//div[@class="pageLevelErrors"]/ul//li[text()="${errMsg}"]`;
        await protractor_1.element(protractor_1.By.xpath(weHitSnagPageLevelErrorXPath)).waitToBePresent();
    }
    async globalSearch(txt) {
        var globalsearchXPath = '//div[contains(@class, "slds-global-header__item--search")]//input[contains(@placeholder, "Search")]';
        await protractor_1.element(protractor_1.By.xpath(globalsearchXPath)).safeClear();
        await protractor_1.element(protractor_1.By.xpath(globalsearchXPath)).safeSendKeys(txt);
        await protractor_1.browser.sleep(1000);
        await protractor_1.element(protractor_1.By.xpath(globalsearchXPath)).safeSendKeys(protractor_1.Key.ENTER);
    }
    async globalSearchFoundObject(objectName) {
        await protractor_1.element(protractor_1.By.xpath(`//div[contains(@class, "forceSearchResultsMultiScope")]//div[contains(@class, "searchResultsGridHeader")]//h2/a[text() = "${objectName}"]`)).waitToBeVisible();
    }
    async globalSearchNoResult() {
        await protractor_1.element(protractor_1.By.xpath('//div[contains(@class, "forceSearchNoResults")]')).waitToBeVisible();
    }
    async componentFinishedLoading() {
        await protractor_1.element(protractor_1.By.xpath(`${Standard.xpathActiveWorkspace}//div[contains(@class, "forceComponentSpinner") and contains(@class, "hideSpinner")]`)).waitToBePresent();
    }
    //Add by PSR Start
    async selectRecordType(recordType) {
        await protractor_1.element(protractor_1.By.xpath(`//div[@class="slds-form-element__control"]/label/span[text()="${recordType}"]/parent::*`)).safeClick();
    }
    async selectPicklistRecordDetailsForm(formName, table) {
        if (formName)
            await protractor_1.element(protractor_1.By.xpath(`${Standard.xpathActiveWorkspace}//h2[text()="${formName}"]`)).waitToBeVisible();
        const hashes = table.hashes();
        for (let i = 0; i < hashes.length; i++) {
            for (let key of Object.keys(hashes[i])) {
                var inputFieldXPath = null;
                inputFieldXPath = `${Standard.xpathActiveWorkspace}//div[@class="slds-form-element__control"]//span[text()="${key}"]/../..`;
                inputFieldXPath += `|${Standard.xpathActiveWorkspace}//slot[@slot='inputField']//label[text()="${key}"]/../..`;
                await protractor_1.element(protractor_1.By.xpath(inputFieldXPath)).safeClick();
                inputFieldXPath = `//div[@role="menu"]//li/a[text()="${hashes[i][key]}"]/../a`;
                inputFieldXPath += `|${Standard.xpathActiveWorkspace}//slot[@slot='inputField']//label[text()="${key}"]/../..//lightning-base-combobox-item//span[@title="${hashes[i][key]}"]/../..`;
                await protractor_1.element(protractor_1.By.xpath(inputFieldXPath)).safeClick();
            }
        }
    }
    async associateRecordDetailsForm(formName, table) {
        if (formName) {
            await protractor_1.element(protractor_1.By.xpath(`${Standard.xpathActiveWorkspace}//h2[text()="${formName}"]`)).waitToBeVisible();
        }
        const hashes = table.hashes();
        for (let i = 0; i < hashes.length; i++) {
            for (let key of Object.keys(hashes[i])) {
                var inputFieldXPath = `${Standard.xpathActiveWorkspace}//div[@class="slds-form-element__control"]//span[text()="${key}"]/../..//input`;
                inputFieldXPath += `|${Standard.xpathActiveWorkspace}//slot[@slot='inputField']//label[text()="${key}"]/../..//input`;
                await protractor_1.element(protractor_1.By.xpath(inputFieldXPath)).safeSendKeys(hashes[i][key]);
                //var selectionXPath = `//div[@class="slds-form-element__control"]//span[text()="${key}"]/../..//div[@class="listContent"]//li/a//div[contains(@title, "${hashes[i][key]}")]/../..`;
                //selectionXPath +=`|${Standard.xpathActiveWorkspace}//slot[@slot='inputField']//label[text()="${key}"]/..//lightning-base-combobox//div[@role='none']`;
                //await element(By.xpath(selectionXPath)).waitToBeVisible();
                var lookupItemXPath = `${Standard.xpathActiveWorkspace}//div[@class="slds-form-element__control"]//span[text()="${key}"]/../..//div[@class="listContent"]//li/a//div[contains(@title, "${hashes[i][key]}")]/../../..`;
                lookupItemXPath += `|${Standard.xpathActiveWorkspace}//slot[@slot='inputField']//label[text()="${key}"]/../..//lightning-base-combobox-item//span[contains(@title, "${hashes[i][key]}")]/../../..`;
                console.log(lookupItemXPath);
                await protractor_1.element(protractor_1.By.xpath(lookupItemXPath)).safeClick();
            }
        }
    }
    async selectRemoveMuliValuePickRecordDetailsForm(formName, table, mode) {
        if (formName)
            await protractor_1.element(protractor_1.By.xpath(`${Standard.xpathActiveWorkspace}//h2[text()="${formName}"]`)).waitToBeVisible();
        const hashes = table.hashes();
        for (let i = 0; i < hashes.length; i++) {
            for (let key of Object.keys(hashes[i])) {
                var valuelist = (hashes[i][key]).split(';');
                for (let val of valuelist) {
                    var inputFieldXPath = `${Standard.xpathActiveWorkspace}//div[@class="slds-form-element__control"]//div[text()="${key}"]/..//span[text()="${mode}"]/..//li//span[@title='${val}']`;
                    inputFieldXPath += `|${Standard.xpathActiveWorkspace}//slot[@slot='inputField']//div[text()="${key}"]/..//span[text()="${mode}"]/..//li//span[@title='${val}']`;
                    //div[@class="slds-form-element__control"]//div[text()="Regional category"]/..//li//span[@title='A2W']
                    await protractor_1.element(protractor_1.By.xpath(inputFieldXPath)).safeClick();
                    var clickMode = "Chosen";
                    if (mode == "Chosen")
                        clickMode = "Available";
                    var moveToSelection = `${Standard.xpathActiveWorkspace}//div[@class="slds-form-element__control"]//div[text()="${key}"]/../..//button[@title='Move selection to ${clickMode}']`;
                    moveToSelection += `|${Standard.xpathActiveWorkspace}//slot[@slot='inputField']//div[text()="${key}"]/../..//button[@title='Move selection to ${clickMode}']`;
                    await protractor_1.element(protractor_1.By.xpath(moveToSelection)).safeClick();
                }
            }
        }
    }
}
exports.Standard = Standard;
// public static xpathActiveWorkspace: string = '//div[@role="tabpanel" and contains(@class, "oneWorkspace") and contains(@class, "active")]';
Standard.xpathActiveWorkspace = '';
Standard.xpathObjectHome = '//div[contains(@class, "oneConsoleObjectHome")]';
Standard.xpathContextualMenu = '//div[contains(@class, "uiPopupTarget") and contains(@class, "visible")]';
//# sourceMappingURL=Standard.js.map