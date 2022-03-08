"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SFAutomation_1 = require("../Hooks/SFAutomation");
const cucumber_1 = require("@cucumber/cucumber");
cucumber_1.defineStep('I navigate to {string}', async function (site) {
    await SFAutomation_1.SF.standard.navigateTo(site);
});
cucumber_1.defineStep('The current url is {string}', async function (url) {
    await SFAutomation_1.SF.standard.waitForUrlChanged(url);
});
cucumber_1.defineStep('I am in {string} object', async function (objName) {
    await SFAutomation_1.SF.standard.selectObject(objName);
});
cucumber_1.defineStep('I am in {string} object [console]', async function (objName) {
    await SFAutomation_1.SF.standard.selectObjectConsole(objName);
});
cucumber_1.defineStep('I change list view to {string}', async function (listviewName) {
    await SFAutomation_1.SF.standard.selectListView(listviewName);
});
cucumber_1.defineStep('List view shows account records', async function () {
    await SFAutomation_1.SF.standard.listviewShowRecords();
});
cucumber_1.defineStep('No records displayed', async function () {
    await SFAutomation_1.SF.standard.listviewNoRecords();
});
cucumber_1.defineStep('I click {string} button', async function (buttonName) {
    await SFAutomation_1.SF.standard.clickButton(buttonName);
});
cucumber_1.defineStep('I click {string} button on list view page', async function (buttonName) {
    await SFAutomation_1.SF.standard.clickButtonOnListView(buttonName);
});
cucumber_1.defineStep('I click {string} button on contextual menu', async function (buttonName) {
    await SFAutomation_1.SF.standard.clickButton(buttonName);
});
cucumber_1.defineStep('I click edit button of field {string} on record details', async function (fieldLabel) {
    await SFAutomation_1.SF.standard.clickEditFieldOnRecordDetails(fieldLabel);
});
cucumber_1.defineStep('I am in {string} application', async function (appName) {
    await SFAutomation_1.SF.standard.selectApplication(appName);
});
cucumber_1.defineStep('I am in {string} tab', async function (tabName) {
    await SFAutomation_1.SF.standard.selectTabInTheActivePage(tabName);
});
cucumber_1.defineStep('Fields are readonly', async function (fieldTable) {
    await SFAutomation_1.SF.standard.verifyReadonlyFields(fieldTable);
});
/* Replaced by PSR
defineStep('Fill in a {string} record details form', async function (formName: string, table: DataTable) {
    await SF.standard.fillRecordDetailsForm(formName, table);
});

defineStep('Fill in a record details form', async function (table: DataTable) {
    await SF.standard.fillRecordDetailsForm("", table);
});
*/
cucumber_1.defineStep('I close success alert with text {string}', async function (msg) {
    await SFAutomation_1.SF.standard.closeSuccessAlertWithText(msg);
});
cucumber_1.defineStep('Verify record details', async function (table) {
    await SFAutomation_1.SF.standard.verifyRecordDetails(table);
});
cucumber_1.defineStep('Verify highlight panel', async function (table) {
    await SFAutomation_1.SF.standard.verifyHighlightPanel(table);
});
cucumber_1.defineStep('Validation rule alert at field {string} with message {string}', async function (fieldLabel, errMsg) {
    await SFAutomation_1.SF.standard.validationruleAlertAtField(fieldLabel, errMsg);
});
cucumber_1.defineStep('Validation rule alert on page with message {string}', async function (errMsg) {
    await SFAutomation_1.SF.standard.validationruleAlertOnPage(errMsg);
});
cucumber_1.defineStep('I use global search to search for {string}', async function (txt) {
    await SFAutomation_1.SF.standard.globalSearch(txt);
});
cucumber_1.defineStep('Global search found matched {string} object', async function (objectName) {
    await SFAutomation_1.SF.standard.globalSearchFoundObject(objectName);
});
cucumber_1.defineStep('Global search cannot find matched result', async function () {
    await SFAutomation_1.SF.standard.globalSearchNoResult();
});
cucumber_1.defineStep('Component finished loading', async function () {
    await SFAutomation_1.SF.standard.componentFinishedLoading();
});
// Add by PSR
cucumber_1.defineStep('Fill Picklist Fields in a {string} record details form', async function (formName, table) {
    await SFAutomation_1.SF.standard.selectPicklistRecordDetailsForm(formName, table);
});
cucumber_1.defineStep('Fill Picklist Fields in a record details form', async function (table) {
    await SFAutomation_1.SF.standard.selectPicklistRecordDetailsForm("", table);
});
cucumber_1.defineStep('Fill Associate Fields in a {string} record details form', async function (formName, table) {
    await SFAutomation_1.SF.standard.fillRecordDetailsForm(formName, table);
});
cucumber_1.defineStep('Fill Associate Fields in a record details form', async function (table) {
    await SFAutomation_1.SF.standard.fillRecordDetailsForm("", table);
});
cucumber_1.defineStep('Fill Normal Fields in a {string} record details form', async function (formName, table) {
    await SFAutomation_1.SF.standard.fillRecordDetailsForm(formName, table);
});
cucumber_1.defineStep('Fill Normal Fields in a record details form', async function (table) {
    await SFAutomation_1.SF.standard.fillRecordDetailsForm("", table);
});
cucumber_1.defineStep('Fill MultiValue Fields in a {string} record details form', async function (formName, table) {
    await SFAutomation_1.SF.standard.selectRemoveMuliValuePickRecordDetailsForm(formName, table, "Available");
});
cucumber_1.defineStep('Fill MultiValue Fields in a record details form', async function (table) {
    await SFAutomation_1.SF.standard.selectRemoveMuliValuePickRecordDetailsForm("", table, "Available");
});
cucumber_1.defineStep('Remove Selections from MultiValue Fields in a {string} record details form', async function (formName, table) {
    await SFAutomation_1.SF.standard.selectRemoveMuliValuePickRecordDetailsForm(formName, table, "Chosen");
});
cucumber_1.defineStep('Remove Selections from MultiValue Fields in a record details form', async function (table) {
    await SFAutomation_1.SF.standard.selectRemoveMuliValuePickRecordDetailsForm("", table, "Chosen");
});
//# sourceMappingURL=StandardSteps.js.map