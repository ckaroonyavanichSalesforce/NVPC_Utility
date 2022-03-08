import { SF } from '../Hooks/SFAutomation';
import { DataTable, defineStep } from "@cucumber/cucumber";

defineStep('I navigate to {string}', async function (site) {
    await SF.standard.navigateTo(site);
});

defineStep('The current url is {string}', async function (url) {
    await SF.standard.waitForUrlChanged(url);
});

defineStep('I am in {string} object', async function (objName) {
    await SF.standard.selectObject(objName);
});

defineStep('I am in {string} object [console]', async function (objName) {
    await SF.standard.selectObjectConsole(objName);
});

defineStep('I change list view to {string}', async function (listviewName) {
    await SF.standard.selectListView(listviewName);
});

defineStep('List view shows account records', async function () {
    await SF.standard.listviewShowRecords();
});

defineStep('No records displayed', async function () {
    await SF.standard.listviewNoRecords();
});

defineStep('I click {string} button', async function (buttonName) {
    await SF.standard.clickButton(buttonName);
});

defineStep('I click {string} button on list view page', async function (buttonName) {
    await SF.standard.clickButtonOnListView(buttonName);
});

defineStep('I click {string} button on contextual menu', async function (buttonName) {
    await SF.standard.clickButton(buttonName);
});

defineStep('I click edit button of field {string} on record details', async function (fieldLabel) {
    await SF.standard.clickEditFieldOnRecordDetails(fieldLabel);
});




defineStep('I am in {string} application', async function (appName) {
    await SF.standard.selectApplication(appName);
});

defineStep('I am in {string} tab', async function (tabName) {
    await SF.standard.selectTabInTheActivePage(tabName);
});

defineStep('Fields are readonly', async function (fieldTable) {
    await SF.standard.verifyReadonlyFields(fieldTable);
});
/* Replaced by PSR
defineStep('Fill in a {string} record details form', async function (formName: string, table: DataTable) {
    await SF.standard.fillRecordDetailsForm(formName, table);
});

defineStep('Fill in a record details form', async function (table: DataTable) {
    await SF.standard.fillRecordDetailsForm("", table);
});
*/
defineStep('I close success alert with text {string}', async function (msg: string) {
    await SF.standard.closeSuccessAlertWithText(msg);
});

defineStep('Verify record details', async function (table: DataTable) {
    await SF.standard.verifyRecordDetails(table);
});

defineStep('Verify highlight panel', async function (table: DataTable) {
    await SF.standard.verifyHighlightPanel(table);
});

defineStep('Validation rule alert at field {string} with message {string}', async function (fieldLabel: string, errMsg: string) {
    await SF.standard.validationruleAlertAtField(fieldLabel, errMsg);
});

defineStep('Validation rule alert on page with message {string}', async function (errMsg: string) {
    await SF.standard.validationruleAlertOnPage(errMsg);
});

defineStep('I use global search to search for {string}', async function (txt: string) {
    await SF.standard.globalSearch(txt);
});

defineStep('Global search found matched {string} object', async function (objectName: string) {
    await SF.standard.globalSearchFoundObject(objectName);
});

defineStep('Global search cannot find matched result', async function () {
    await SF.standard.globalSearchNoResult();
});

defineStep('Component finished loading', async function () {
    await SF.standard.componentFinishedLoading();
});

// Add by PSR
defineStep('Fill Picklist Fields in a {string} record details form', async function (formName: string, table: DataTable) {
    await SF.standard.selectPicklistRecordDetailsForm(formName, table);
});
defineStep('Fill Picklist Fields in a record details form', async function (table: DataTable) {
    await SF.standard.selectPicklistRecordDetailsForm("", table);
});

defineStep('Fill Associate Fields in a {string} record details form', async function (formName: string, table: DataTable) {
    await SF.standard.fillRecordDetailsForm(formName, table);
});

defineStep('Fill Associate Fields in a record details form', async function ( table: DataTable) {
    await SF.standard.fillRecordDetailsForm("", table);
});

defineStep('Fill Normal Fields in a {string} record details form', async function (formName: string, table: DataTable) {
    await SF.standard.fillRecordDetailsForm(formName, table);
});

defineStep('Fill Normal Fields in a record details form', async function (table: DataTable) {
    await SF.standard.fillRecordDetailsForm("", table);
});

defineStep('Fill MultiValue Fields in a {string} record details form', async function (formName: string, table: DataTable) {
    await SF.standard.selectRemoveMuliValuePickRecordDetailsForm( formName,  table,"Available");
});

defineStep('Fill MultiValue Fields in a record details form', async function ( table: DataTable) {
    await SF.standard.selectRemoveMuliValuePickRecordDetailsForm( "",  table,"Available");
});

defineStep('Remove Selections from MultiValue Fields in a {string} record details form', async function (formName: string, table: DataTable) {
    await SF.standard.selectRemoveMuliValuePickRecordDetailsForm( formName,  table,"Chosen");
});

defineStep('Remove Selections from MultiValue Fields in a record details form', async function ( table: DataTable) {
    await SF.standard.selectRemoveMuliValuePickRecordDetailsForm( "",  table,"Chosen");
});


