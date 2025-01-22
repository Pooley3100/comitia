const { Builder, By, Browser } = require('selenium-webdriver');

async function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe('Selenium Form Tests', () => {
  let driver;

  beforeEach(async () => {
    driver = await new Builder().forBrowser(Browser.SAFARI).build();
  });

  afterEach(async () => {
    await driver.quit();
  });

  test('Create Question', async () => {
    await driver.get('http://localhost:3000/create');
    await driver.manage().setTimeouts({ implicit: 500 });
    let create = await driver.findElement(By.id('qButton'));
    await create.click();

    await wait(100);

    let questionBox = await driver.findElement(By.id('qBox'));
    let detailsBox = await driver.findElement(By.id('detailsBox'));
    let submitButton = await driver.findElement(By.css('button[type="submit"]'));

    await questionBox.sendKeys('Selenium is a good test framework?');
    await detailsBox.sendKeys('Some say Cypress is better');
    await submitButton.click();

    await wait(1000);

    let publicButton = await driver.findElement(By.id('publicButton'));
    await publicButton.click();

    await wait(500);
    await driver.get('http://localhost:3009');
    await wait(500);

    // Search for text in list
    let listItems = await driver.findElements(By.id('forumList')); // Replace with the actual class name of the list items
    let searchText = 'Selenium is a good test framework?';
    let found = false;

    for (let item of listItems) {
      let itemText = await item.getText();
      if (itemText.includes(searchText)) {
        found = true;
        console.log(`Found the text: ${itemText}`);
        break;
      }
    }


  });

  test('Create Question with Too Large Input', async () => {
    await driver.get('http://localhost:3000/create');
    await driver.manage().setTimeouts({ implicit: 500 });
    let create = await driver.findElement(By.id('qButton'));
    await create.click();

    await wait(100);

    let questionBox = await driver.findElement(By.id('qBox'));
    let detailsBox = await driver.findElement(By.id('detailsBox'));
    let submitButton = await driver.findElement(By.css('button[type="submit"]'));

    // Generate a very large string
    let largeString = 'A'.repeat(1000); // Adjust the size as needed to trigger validation failure

    await questionBox.sendKeys(largeString);
    await detailsBox.sendKeys('This is a test with a very large input string.');
    await submitButton.click();

    await wait(1000);

    // Check for validation error message
    let errorText = null;
    try {
      let errorMessage = await driver.findElement(By.id('error-msg')); // Replace with the actual ID or class of the error message element
      errorText = await errorMessage.getText();
      console.log(`Error message: ${errorText}`);
    } catch (err) {
      console.log('error not found')
    }

    expect(errorText).toBe("String must contain at most 50 character(s)"); // Adjust the expected error message as needed
  });


});