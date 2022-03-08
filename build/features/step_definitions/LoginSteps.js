"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SFAutomation_1 = require("../Hooks/SFAutomation");
const cucumber_1 = require("@cucumber/cucumber");
const app_conf_1 = require("../../conf/app.conf");
/*defineStep('I click Log In with a Different Username', function () {
    browser.wait(EC.elementToBeClickable($('#use_new_identity')), 5000);
    element(By.id('use_new_identity')).click();
});*/
cucumber_1.defineStep('I login to SF as {string}', async function (userKey) {
    var credentials = app_conf_1.appSettings[userKey];
    await SFAutomation_1.SF.standard.login(credentials.username, credentials.password);
});
cucumber_1.defineStep('I change login user to {string}', async function (userKey) {
    var orgConfig = app_conf_1.appSettings['OrgConfig'];
    var credentials = app_conf_1.appSettings[userKey];
    await SFAutomation_1.SF.standard.navigateTo(orgConfig["url"] + '/servlet/servlet.su?oid=' + orgConfig["orgid"] + '&suorgadminid=' + credentials["userid"] + "&targetURL=%2Fhome%2Fhome.jsp&");
});
cucumber_1.defineStep('I click {string} tab on record details', async function (buttonName) {
    await SFAutomation_1.SF.accountPage.clickTab(buttonName);
});
//# sourceMappingURL=LoginSteps.js.map