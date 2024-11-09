const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

(async function testPerformanceGlitchUserFlow() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        console.log("Navigating to the login page");
        await driver.get('https://www.saucedemo.com/');
        console.log("Entering username");
        await driver.wait(until.elementLocated(By.id('user-name')), 10000).sendKeys('performance_glitch_user');
        console.log("Entering password");
        await driver.wait(until.elementLocated(By.id('password')), 10000).sendKeys('secret_sauce');
        console.log("Clicking login button");
        const loginButton = await driver.wait(until.elementLocated(By.id('login-button')), 10000);
        await driver.wait(until.elementIsVisible(loginButton), 10000);
        await driver.executeScript("arguments[0].click();", loginButton);
        console.log("Waiting for the title to ensure successful login");
        await driver.wait(until.titleIs('Swag Labs'), 10000);
        console.log("Resetting app state");
        const menuButton = await driver.wait(until.elementLocated(By.id('react-burger-menu-btn')), 10000);
        await driver.executeScript("arguments[0].click();", menuButton);
        const resetAppStateButton = await driver.wait(until.elementLocated(By.id('reset_sidebar_link')), 10000);
        await driver.executeScript("arguments[0].click();", resetAppStateButton);
        await driver.sleep(2000); 
        console.log("Filtering products by name (Z to A)");
        const filterDropdown = await driver.wait(until.elementLocated(By.className('product_sort_container')), 10000);
        await filterDropdown.click();
        const filterOption = await driver.wait(until.elementLocated(By.css('option[value="za"]')), 10000);
        await filterOption.click();
        console.log("Selecting the first product");
        const firstProductButton = await driver.wait(until.elementLocated(By.className('btn_inventory')), 10000);
        await driver.executeScript("arguments[0].click();", firstProductButton);
        await driver.sleep(1000);
        console.log("Going to cart");
        await driver.findElement(By.className('shopping_cart_link')).click();
        console.log("Clicking checkout");
        await driver.wait(until.elementLocated(By.id('checkout')), 10000).click();
        console.log("Filling out checkout information");
        await driver.wait(until.elementLocated(By.id('first-name')), 10000).sendKeys('Zakir');
        await driver.findElement(By.id('last-name')).sendKeys('Hossain');
        await driver.findElement(By.id('postal-code')).sendKeys('1234');
        await driver.findElement(By.id('continue')).click();
        console.log("Waiting for the total price to be displayed");
        const totalPriceElement = await driver.wait(until.elementLocated(By.className('summary_total_label')), 10000);
        const totalPrice = await totalPriceElement.getText();
        console.log(`Total Price: ${totalPrice}`);
        const productNameElement = await driver.wait(until.elementLocated(By.className('inventory_item_name')), 10000);
        const productName = await productNameElement.getText();
        console.log(`Product Name: ${productName}`);
        console.log("Finishing the purchase");
        await driver.findElement(By.id('finish')).click();
        const successMessageElement = await driver.wait(until.elementLocated(By.className('complete-header')), 10000);
        const successMessage = await successMessageElement.getText();
        console.log(`Success Message: ${successMessage}`);
        assert.strictEqual(successMessage, 'THANK YOU FOR YOUR ORDER');
        console.log("Resetting app state again");
        await driver.findElement(By.id('react-burger-menu-btn')).click();
        await driver.findElement(By.id('reset_sidebar_link')).click();
        console.log("Logging out");
        await driver.findElement(By.id('logout_sidebar_link')).click();
        await driver.sleep(2000);
    } catch (error) {
        console.error("An error occurred:", error);
    } finally {
        await driver.quit();
    }
})();
