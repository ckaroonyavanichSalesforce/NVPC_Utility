import { SF } from '../Hooks/SFAutomation';
import { defineStep } from "@cucumber/cucumber";
import { appSettings } from "../../conf/app.conf";

/*defineStep('I click Log In with a Different Username', function () {
    browser.wait(EC.elementToBeClickable($('#use_new_identity')), 5000);
    element(By.id('use_new_identity')).click();
});*/

defineStep('I login to SF as {string}', async function (userKey: string) {
    var credentials = appSettings[userKey];
    await SF.standard.login(credentials.username, credentials.password);
});

defineStep('I change login user to {string}', async function (userKey: string) {
    var orgConfig = appSettings['OrgConfig'];
    
    var credentials = appSettings[userKey];
    await SF.standard.navigateTo(orgConfig["url"] + '/servlet/servlet.su?oid=' + orgConfig["orgid"] +'&suorgadminid=' +credentials["userid"] +"&targetURL=%2Fhome%2Fhome.jsp&");
});

defineStep('I click {string} tab on record details', async function (buttonName) {
    
    await SF.accountPage.clickTab(buttonName);
});


