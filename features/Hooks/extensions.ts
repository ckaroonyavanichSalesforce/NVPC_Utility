import { expect } from 'chai';
import { ElementFinder, browser, ExpectedConditions as EC, WebElement } from 'protractor'

declare module 'protractor' {
    interface ElementFinder {
        safeClick(): Promise<void>;

        safeClear(): Promise<void>;
        safeSendKeys(text: string): Promise<void>;

        scrollTo(): Promise<void>;

        waitToBePresent(): Promise<void>;
        waitNotToBePresent(): Promise<void>;

        waitToBeVisible(): Promise<void>;
        waitNotToBeVisible(): Promise<void>;

        waitToBeClickable(): Promise<void>;
        waitNotToBeClickable(): Promise<void>;

        waitToBeSelected(): Promise<void>;
        waitNotToBeSelected(): Promise<void>;

        waitTextToBePresent(text: string): Promise<void>;
        waitTextToBePresentInValue(text: string): Promise<void>;
    }
}

const defaultTimeout = 9000;

async function scrollToElement(element: WebElement) {
    const scrollToScript = 'arguments[0].scrollIntoView();';
    await browser.executeScript(scrollToScript, element);
}

ElementFinder.prototype.scrollTo = async function (): Promise<void> {
    const self = this as ElementFinder;
    await scrollToElement(self.getWebElement());
}

ElementFinder.prototype.safeClick = async function (): Promise<void> {
    const self = this as ElementFinder;
    const alias = self.locator();
    const timeout = defaultTimeout;

    await browser.wait(EC.elementToBeClickable(self), timeout, `safeClick: ${alias} is not clickable within ${timeout} ms`);
    await scrollToElement(self.getWebElement());

    // Some Material-UI controls must be skipped (for now: checkbox and radio)
    // because Material-ui creates its own image checkbox and hide the default one. Then the default one is not visible
    //const attrType = await self.getAttribute("type");
    //if (attrType !== 'checkbox' && attrType !== 'radio') {
    //    await browser.wait(EC.elementToBeClickable(self), timeout, `safeClick: ${alias} is not clickable within ${timeout} ms`);
    //}

    await self.click();
}

ElementFinder.prototype.safeClear = async function (): Promise<void> {
    const self = this as ElementFinder;
    const alias = self.locator();
    const timeout = defaultTimeout;

    await browser.wait(EC.presenceOf(self), timeout, `safeClear: ${alias} is not present within ${timeout} ms`);
    await scrollToElement(self.getWebElement());
    await browser.wait(EC.elementToBeClickable(self), timeout, `safeClear: ${alias} is not visible within ${timeout} ms`);
    await self.click();
    await self.clear();
}

ElementFinder.prototype.safeSendKeys = async function (text: string): Promise<void> {
    const self = this as ElementFinder;
    const alias = self.locator();
    const timeout = defaultTimeout;

    await browser.wait(EC.presenceOf(self), timeout, `safeSendKeys: ${alias} is not present within ${timeout} ms`);
    await scrollToElement(self.getWebElement());
    await browser.wait(EC.elementToBeClickable(self), timeout, `safeSendKeys: ${alias} is not visible within ${timeout} ms`);
    await self.click();
    await self.sendKeys(text);
}

ElementFinder.prototype.safeValidateText = async function (exoectedText: string): Promise<void> {
    const self = this as ElementFinder;
    const alias = self.locator();
    const timeout = defaultTimeout;

    await browser.wait(EC.presenceOf(self), timeout, `safeValidateText: ${alias} is not present within ${timeout} ms`);
    await scrollToElement(self.getWebElement());
    var data = await self.getText();
    expect(data).to.equal(exoectedText);
}

ElementFinder.prototype.waitToBePresent = async function (): Promise<void> {
    const self = this as ElementFinder;
    const alias = self.locator();
    const timeout = defaultTimeout;

    await browser.wait(EC.presenceOf(self), timeout, `waitToBePresent: ${alias} is not present within ${timeout} ms`);
}

ElementFinder.prototype.waitNotToBePresent = async function (): Promise<void> {
    const self = this as ElementFinder;
    const alias = self.locator();
    const timeout = defaultTimeout;

    await browser.wait(EC.stalenessOf(self), timeout, `waitNotToBePresent: ${alias} still present after ${timeout} ms`);
}

ElementFinder.prototype.waitToBeVisible = async function (): Promise<void> {
    const self = this as ElementFinder;
    const alias = self.locator();
    const timeout = defaultTimeout;

    await browser.wait(EC.presenceOf(self), timeout, `waitToBeVisible: ${alias} is not present within ${timeout} ms`);
    await scrollToElement(self.getWebElement());
    await browser.wait(EC.visibilityOf(self), timeout, `waitToBeVisible: ${alias} is not visible within ${timeout} ms`);
}

ElementFinder.prototype.waitNotToBeVisible = async function (): Promise<void> {
    const self = this as ElementFinder;
    const alias = self.locator();
    const timeout = defaultTimeout;

    await browser.wait(EC.invisibilityOf(self), timeout, `waitNotToBeVisible: ${alias} still visible after ${timeout} ms`);
}

ElementFinder.prototype.waitToBeClickable = async function (): Promise<void> {
    const self = this as ElementFinder;
    const alias = self.locator();
    const timeout = defaultTimeout;

    await browser.wait(EC.elementToBeClickable(self), timeout, `waitTobeClickable: ${alias} is not clickable within ${timeout} ms`);
}

ElementFinder.prototype.waitNotToBeClickable = async function (): Promise<void> {
    const self = this as ElementFinder;
    const alias = self.locator();
    const timeout = defaultTimeout;

    await browser.wait(EC.not(EC.elementToBeClickable(self)), timeout, `waitNotToBeClickable: ${alias} still clickable after ${timeout} ms`);
}

ElementFinder.prototype.waitToBeSelected = async function (): Promise<void> {
    const self = this as ElementFinder;
    const alias = self.locator();
    const timeout = defaultTimeout;

    await browser.wait(EC.elementToBeSelected(self), timeout, `waitToBeSelected: ${alias} is not selected within ${timeout} ms`);
}

ElementFinder.prototype.waitNotToBeSelected = async function (): Promise<void> {
    const self = this as ElementFinder;
    const alias = self.locator();
    const timeout = defaultTimeout;

    await browser.wait(EC.not(EC.elementToBeSelected(self)), timeout, `waitNotToBeSelected: ${alias} is still selected after ${timeout} ms`);
}

ElementFinder.prototype.waitTextToBePresent = async function (text: string): Promise<void> {
    const self = this as ElementFinder;
    const alias = self.locator();
    const timeout = defaultTimeout;

    await browser.wait(EC.textToBePresentInElement(self, text), timeout, `waitTextToBePresent: ${alias} does not display '${text}' within ${timeout} ms`);
}

ElementFinder.prototype.waitTextToBePresentInValue = async function (text: string): Promise<void> {
    const self = this as ElementFinder;
    const alias = self.locator();
    const timeout = defaultTimeout;

    await browser.wait(EC.textToBePresentInElementValue(self, text), timeout, `textToBePresentInElementValue: ${alias} does not contain value '${text}' within ${timeout} ms`);
}

