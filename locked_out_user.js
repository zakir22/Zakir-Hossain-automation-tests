const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

(async function testLoginLockedOutUser() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('https://www.saucedemo.com/');
        await driver.findElement(By.id('user-name')).sendKeys('locked_out_user');
        await driver.findElement(By.id('password')).sendKeys('secret_sauce');
        await driver.findElement(By.id('login-button')).click();
        const errorMessageElement = await driver.wait(until.elementLocated(By.css('.error-message-container')), 5000);
        const errorMessage = await errorMessageElement.getText();
        assert.strictEqual(errorMessage, 'Epic sadface: Sorry, this user has been locked out.');
        await driver.sleep(5000);
    } finally {
        await driver.quit();
    }
})();
