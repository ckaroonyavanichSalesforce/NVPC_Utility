"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const protractor_1 = require("protractor");
const defaultTimeout = 9000;
async function scrollToElement(element) {
    const scrollToScript = 'arguments[0].scrollIntoView();';
    await protractor_1.browser.executeScript(scrollToScript, element);
}
protractor_1.ElementFinder.prototype.scrollTo = async function () {
    const self = this;
    await scrollToElement(self.getWebElement());
};
protractor_1.ElementFinder.prototype.safeClick = async function () {
    const self = this;
    const alias = self.locator();
    const timeout = defaultTimeout;
    await protractor_1.browser.wait(protractor_1.ExpectedConditions.elementToBeClickable(self), timeout, `safeClick: ${alias} is not clickable within ${timeout} ms`);
    await scrollToElement(self.getWebElement());
    // Some Material-UI controls must be skipped (for now: checkbox and radio)
    // because Material-ui creates its own image checkbox and hide the default one. Then the default one is not visible
    //const attrType = await self.getAttribute("type");
    //if (attrType !== 'checkbox' && attrType !== 'radio') {
    //    await browser.wait(EC.elementToBeClickable(self), timeout, `safeClick: ${alias} is not clickable within ${timeout} ms`);
    //}
    await self.click();
};
protractor_1.ElementFinder.prototype.safeClear = async function () {
    const self = this;
    const alias = self.locator();
    const timeout = defaultTimeout;
    await protractor_1.browser.wait(protractor_1.ExpectedConditions.presenceOf(self), timeout, `safeClear: ${alias} is not present within ${timeout} ms`);
    await scrollToElement(self.getWebElement());
    await protractor_1.browser.wait(protractor_1.ExpectedConditions.elementToBeClickable(self), timeout, `safeClear: ${alias} is not visible within ${timeout} ms`);
    await self.click();
    await self.clear();
};
protractor_1.ElementFinder.prototype.safeSendKeys = async function (text) {
    const self = this;
    const alias = self.locator();
    const timeout = defaultTimeout;
    await protractor_1.browser.wait(protractor_1.ExpectedConditions.presenceOf(self), timeout, `safeSendKeys: ${alias} is not present within ${timeout} ms`);
    await scrollToElement(self.getWebElement());
    await protractor_1.browser.wait(protractor_1.ExpectedConditions.elementToBeClickable(self), timeout, `safeSendKeys: ${alias} is not visible within ${timeout} ms`);
    await self.click();
    await self.sendKeys(text);
};
protractor_1.ElementFinder.prototype.safeValidateText = async function (exoectedText) {
    const self = this;
    const alias = self.locator();
    const timeout = defaultTimeout;
    await protractor_1.browser.wait(protractor_1.ExpectedConditions.presenceOf(self), timeout, `safeValidateText: ${alias} is not present within ${timeout} ms`);
    await scrollToElement(self.getWebElement());
    var data = await self.getText();
    chai_1.expect(data).to.equal(exoectedText);
};
protractor_1.ElementFinder.prototype.waitToBePresent = async function () {
    const self = this;
    const alias = self.locator();
    const timeout = defaultTimeout;
    await protractor_1.browser.wait(protractor_1.ExpectedConditions.presenceOf(self), timeout, `waitToBePresent: ${alias} is not present within ${timeout} ms`);
};
protractor_1.ElementFinder.prototype.waitNotToBePresent = async function () {
    const self = this;
    const alias = self.locator();
    const timeout = defaultTimeout;
    await protractor_1.browser.wait(protractor_1.ExpectedConditions.stalenessOf(self), timeout, `waitNotToBePresent: ${alias} still present after ${timeout} ms`);
};
protractor_1.ElementFinder.prototype.waitToBeVisible = async function () {
    const self = this;
    const alias = self.locator();
    const timeout = defaultTimeout;
    await protractor_1.browser.wait(protractor_1.ExpectedConditions.presenceOf(self), timeout, `waitToBeVisible: ${alias} is not present within ${timeout} ms`);
    await scrollToElement(self.getWebElement());
    await protractor_1.browser.wait(protractor_1.ExpectedConditions.visibilityOf(self), timeout, `waitToBeVisible: ${alias} is not visible within ${timeout} ms`);
};
protractor_1.ElementFinder.prototype.waitNotToBeVisible = async function () {
    const self = this;
    const alias = self.locator();
    const timeout = defaultTimeout;
    await protractor_1.browser.wait(protractor_1.ExpectedConditions.invisibilityOf(self), timeout, `waitNotToBeVisible: ${alias} still visible after ${timeout} ms`);
};
protractor_1.ElementFinder.prototype.waitToBeClickable = async function () {
    const self = this;
    const alias = self.locator();
    const timeout = defaultTimeout;
    await protractor_1.browser.wait(protractor_1.ExpectedConditions.elementToBeClickable(self), timeout, `waitTobeClickable: ${alias} is not clickable within ${timeout} ms`);
};
protractor_1.ElementFinder.prototype.waitNotToBeClickable = async function () {
    const self = this;
    const alias = self.locator();
    const timeout = defaultTimeout;
    await protractor_1.browser.wait(protractor_1.ExpectedConditions.not(protractor_1.ExpectedConditions.elementToBeClickable(self)), timeout, `waitNotToBeClickable: ${alias} still clickable after ${timeout} ms`);
};
protractor_1.ElementFinder.prototype.waitToBeSelected = async function () {
    const self = this;
    const alias = self.locator();
    const timeout = defaultTimeout;
    await protractor_1.browser.wait(protractor_1.ExpectedConditions.elementToBeSelected(self), timeout, `waitToBeSelected: ${alias} is not selected within ${timeout} ms`);
};
protractor_1.ElementFinder.prototype.waitNotToBeSelected = async function () {
    const self = this;
    const alias = self.locator();
    const timeout = defaultTimeout;
    await protractor_1.browser.wait(protractor_1.ExpectedConditions.not(protractor_1.ExpectedConditions.elementToBeSelected(self)), timeout, `waitNotToBeSelected: ${alias} is still selected after ${timeout} ms`);
};
protractor_1.ElementFinder.prototype.waitTextToBePresent = async function (text) {
    const self = this;
    const alias = self.locator();
    const timeout = defaultTimeout;
    await protractor_1.browser.wait(protractor_1.ExpectedConditions.textToBePresentInElement(self, text), timeout, `waitTextToBePresent: ${alias} does not display '${text}' within ${timeout} ms`);
};
protractor_1.ElementFinder.prototype.waitTextToBePresentInValue = async function (text) {
    const self = this;
    const alias = self.locator();
    const timeout = defaultTimeout;
    await protractor_1.browser.wait(protractor_1.ExpectedConditions.textToBePresentInElementValue(self, text), timeout, `textToBePresentInElementValue: ${alias} does not contain value '${text}' within ${timeout} ms`);
};
//# sourceMappingURL=extensions.js.map