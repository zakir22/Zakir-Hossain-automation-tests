const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

(async function testStandardUserFlow() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        console.log("Navigating to the login page...");
        await driver.get('https://www.saucedemo.com/');
        
        console.log("Entering username...");
        await driver.wait(until.elementLocated(By.id('user-name')), 10000).sendKeys('standard_user');
        
        console.log("Entering password...");
        await driver.wait(until.elementLocated(By.id('password')), 10000).sendKeys('secret_sauce');
        
        console.log("Clicking login button...");
        const loginButton = await driver.wait(until.elementLocated(By.id('login-button')), 10000);
        await driver.wait(until.elementIsVisible(loginButton), 10000);
        await driver.executeScript("arguments[0].click();", loginButton);

        console.log("Waiting for the title to ensure successful login...");
        await driver.wait(until.titleIs('Swag Labs'), 10000);

        // Additional wait to ensure everything is loaded after login
        await driver.sleep(2000); // Wait 2 seconds

        console.log("Waiting for the menu button to be clickable...");
        const menuButton = await driver.wait(until.elementLocated(By.id('react-burger-menu-btn')), 10000);
        await driver.wait(until.elementIsVisible(menuButton), 10000);
        await driver.executeScript("arguments[0].scrollIntoView(true);", menuButton);
        await menuButton.click();

        console.log("Resetting app state...");
        const resetAppStateButton = await driver.wait(until.elementLocated(By.id('reset_sidebar_link')), 10000);
        await driver.wait(until.elementIsVisible(resetAppStateButton), 10000);
        await driver.executeScript("arguments[0].click();", resetAppStateButton); // Use JavaScript to click

        console.log("Waiting for the product list to be displayed...");
        await driver.wait(until.elementLocated(By.className('inventory_list')), 10000);

        const itemsToAdd = ['item_4_title_link', 'item_0_title_link', 'item_5_title_link'];
        for (const item of itemsToAdd) {
            console.log(`Adding item ${item} to cart...`);
            const itemButton = await driver.wait(until.elementLocated(By.id(item)), 10000);
            await driver.wait(until.elementIsVisible(itemButton), 10000);
            await driver.executeScript("arguments[0].click();", itemButton);
            await driver.sleep(1000);

            const addToCartButton = await driver.wait(until.elementLocated(By.className('btn_inventory')), 10000);
            await driver.executeScript("arguments[0].click();", addToCartButton);
            
            console.log("Navigating back to the items list...");
            await driver.navigate().back();
            await driver.wait(until.titleIs('Swag Labs'), 10000);
        }

        // Proceed to cart and checkout
        console.log("Going to cart...");
        await driver.findElement(By.className('shopping_cart_link')).click();
        console.log("Clicking checkout...");
        await driver.wait(until.elementLocated(By.id('checkout')), 10000).click();

        // Wait for the checkout page to load
        console.log("Filling out checkout information...");
        await driver.wait(until.elementLocated(By.id('first-name')), 10000).sendKeys('John');
        await driver.findElement(By.id('last-name')).sendKeys('Doe');
        await driver.findElement(By.id('postal-code')).sendKeys('12345');
        await driver.findElement(By.id('continue')).click();

        // Wait for the total price to be displayed
        console.log("Waiting for the total price to be displayed...");
        const totalPriceElement = await driver.wait(until.elementLocated(By.className('summary_total_label')), 10000);
        const totalPrice = await totalPriceElement.getText();
        console.log(`Total Price: ${totalPrice}`);
       assert.strictEqual(totalPrice, 'Total: $97.17'); // Replace with actual price

        // Finish the purchase
        console.log("Finishing the purchase...");
        await driver.findElement(By.id('finish')).click();
        const successMessageElement = await driver.wait(until.elementLocated(By.className('complete-header')), 10000);
        const successMessage = await successMessageElement.getText();
        console.log(`Success Message: ${successMessage}`);
        assert.strictEqual(successMessage, 'THANK YOU FOR YOUR ORDER');
        

        // Reset and logout
        console.log("Logging out...");
        await driver.findElement(By.id('react-burger-menu-btn')).click();
        await driver.findElement(By.id('reset_sidebar_link')).click();
        await driver.findElement(By.id('logout_sidebar_link')).click();

        // Wait for a few seconds before quitting the driver
        await driver.sleep(30000);
    } catch (error) {
        console.error("An error occurred:", error);
    } finally {
        await driver.quit();
    }
})();
