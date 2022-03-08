"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountPage = void 0;
//import { expect } from 'chai';
const protractor_1 = require("protractor");
class AccountPage {
    async gotoAccount(accountName) {
    }
    async clickTab(tabName) {
        await protractor_1.element(protractor_1.By.xpath(`//lightning-tab-bar//a[text()="${tabName}"]`)).safeClick();
    }
}
exports.AccountPage = AccountPage;
//# sourceMappingURL=AccountPage.js.map