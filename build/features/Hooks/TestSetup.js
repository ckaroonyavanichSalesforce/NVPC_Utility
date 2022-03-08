"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const cucumber_1 = require("@cucumber/cucumber");
const protractor_1 = require("protractor");
const SFAutomation_1 = require("./SFAutomation");
require("./extensions");
const chai = tslib_1.__importStar(require("chai"));
const chai_as_promised_1 = tslib_1.__importDefault(require("chai-as-promised"));
chai.use(chai_as_promised_1.default);
cucumber_1.setDefaultTimeout(30 * 1000);
cucumber_1.BeforeAll({ timeout: 15000 }, async function () {
    await SFAutomation_1.SF.init();
});
//Before(async function (world: World) {
//});
cucumber_1.AfterStep(async function (result) {
    if (result.result?.status == cucumber_1.Status.FAILED) {
        //capture screenshot after each scenario
        let screenshot = await protractor_1.browser.driver.takeScreenshot();
        this.attach(screenshot, 'image/png');
    }
});
/*After(async function (result: ITestCaseHookParameter) {
    if (result.result?.status == Status.FAILED) {
        //capture screenshot after each scenario
        let screenshot = await browser.driver.takeScreenshot();
        this.attach(screenshot, 'image/png');
    }
});*/
//AfterAll({ timeout: 15000 }, async function () {
//});
//# sourceMappingURL=TestSetup.js.map