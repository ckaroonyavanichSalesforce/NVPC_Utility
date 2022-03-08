"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SFAutomation_1 = require("../Hooks/SFAutomation");
const cucumber_1 = require("@cucumber/cucumber");
cucumber_1.defineStep('I am in {string} account page', async function (accountName) {
    await SFAutomation_1.SF.accountPage.gotoAccount(accountName);
});
cucumber_1.defineStep('I select {string} record type', async function (recordType) {
    await SFAutomation_1.SF.standard.selectRecordType(recordType);
});
//# sourceMappingURL=AccountSteps.js.map