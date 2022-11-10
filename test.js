const {Builder, By, Key, until} = require('selenium-webdriver');
const assert = require('assert');

describe('Tests', function () {
    describe('google search', function () {
      it('should return search results', function () {
        const chrome = require('selenium-webdriver/chrome')
        const options = new chrome.Options()
        options.addArguments("headless");
        new Builder().forBrowser("chrome").setChromeOptions(options).build()
        .then(driver => {
          driver.get('http://www.google.com/ncr')
        .then( ()=> {
          driver.findElement(By.name('q')).sendKeys('You did it!!', Key.RETURN);
        })
        .then(()=> {
          driver.getTitle();
        })
        .then(title => {
          assert.equal(title, 'You did it!!');
        })
        })
      });
    });
  });
