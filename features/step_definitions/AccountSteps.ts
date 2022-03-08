import { SF } from '../Hooks/SFAutomation';
import { defineStep } from "@cucumber/cucumber";

defineStep('I am in {string} account page', async function (accountName) {
    await SF.accountPage.gotoAccount(accountName);
});

defineStep('I select {string} record type', async function (recordType: string) {
    await SF.standard.selectRecordType(recordType);
});