const {Builder, By, Key, until} = require('selenium-webdriver');
(async function example() {
const chrome = require('selenium-webdriver/chrome')
const options = new chrome.Options()
options.addArguments("headless");
let driver = await new Builder().forBrowser("chrome").setChromeOptions(options).build();
try {
await driver.get('http://www.google.com/ncr');
await driver.findElement(By.name('q')).sendKeys('You did it!!', Key.RETURN);
await driver.wait(until.titleIs('You did it!! - Google search'), 5000);
} finally {
await driver.quit();
}
})();