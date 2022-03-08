import { setDefaultTimeout, AfterStep, ITestStepHookParameter, Status, BeforeAll/*, Before, World, AfterAll*/ } from '@cucumber/cucumber';
import { browser } from 'protractor';
import { SF } from './SFAutomation';
import "./extensions";
import * as chai from 'chai'    
import chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised)

setDefaultTimeout(30 * 1000);

BeforeAll({ timeout: 15000 }, async function () {
    await SF.init();
});

//Before(async function (world: World) {
//});

AfterStep(async function (result: ITestStepHookParameter) {
    if (result.result?.status == Status.FAILED) {
        //capture screenshot after each scenario
        let screenshot = await browser.driver.takeScreenshot();
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