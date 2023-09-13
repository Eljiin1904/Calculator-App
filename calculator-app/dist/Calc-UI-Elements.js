"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const selenium_webdriver_1 = require("selenium-webdriver");
const calculator_1 = require("./calculator");
describe('Calculator UI Elements', () => {
    let driver;
    let calculator;
    beforeAll(async () => {
        driver = await new selenium_webdriver_1.Builder().forBrowser('chrome').build();
        await driver.get('http://172.20.10.8:8080');
        calculator = new calculator_1.Calculator('display');
    });
    afterAll(async () => {
        await driver.quit();
    });
    // Test UI elements
    test("The 1 button should be enabled", async () => {
        expect(await (0, calculator_1.isButtonEnabled)("#btn-1", calculator.getCurrentValue())).toBeTruthy();
    });
    test("The 2 button should be enabled", () => {
        expect((0, calculator_1.isButtonEnabled)("#btn-2", calculator.getCurrentValue())).toBeTruthy();
    });
    test("The 3 button should be enabled", () => {
        expect((0, calculator_1.isButtonEnabled)("#btn-3", calculator.getCurrentValue())).toBeTruthy();
    });
    test("The 4 button should be enabled", () => {
        expect((0, calculator_1.isButtonEnabled)("#btn-4", calculator.getCurrentValue())).toBeTruthy();
    });
    test("The 5 button should be enabled", () => {
        expect((0, calculator_1.isButtonEnabled)("#btn-5", calculator.getCurrentValue())).toBeTruthy();
    });
    test("The 6 button should be enabled", () => {
        expect((0, calculator_1.isButtonEnabled)("#btn-6", calculator.getCurrentValue())).toBeTruthy();
    });
    test("The 7 button should be enabled", () => {
        expect((0, calculator_1.isButtonEnabled)("#btn-7", calculator.getCurrentValue())).toBeTruthy();
    });
    test("The 8 button should be enabled", () => {
        expect((0, calculator_1.isButtonEnabled)("#btn-8", calculator.getCurrentValue())).toBeTruthy();
    });
    test("The 9 button should be enabled", () => {
        expect((0, calculator_1.isButtonEnabled)("#btn-9", calculator.getCurrentValue())).toBeTruthy();
    });
    test("The 0 button should be enabled", () => {
        expect((0, calculator_1.isButtonEnabled)("#btn-0", calculator.getCurrentValue())).toBeTruthy();
    });
    test("The addition button should be enabled", () => {
        expect((0, calculator_1.isButtonEnabled)("#btn-add", calculator.getCurrentValue())).toBeTruthy();
    });
    test("The subtraction button should be enabled", () => {
        expect((0, calculator_1.isButtonEnabled)("#btn-subtract", calculator.getCurrentValue())).toBeTruthy();
    });
    test("The multiplication button should be enabled", () => {
        expect((0, calculator_1.isButtonEnabled)("#btn-multiply", calculator.getCurrentValue())).toBeTruthy();
    });
    test("The division button should be enabled", () => {
        expect((0, calculator_1.isButtonEnabled)("#btn-divide", calculator.getCurrentValue())).toBeTruthy();
    });
    test("The clear button should be enabled", () => {
        expect((0, calculator_1.isButtonEnabled)("#btn-clear", calculator.getCurrentValue())).toBeTruthy();
    });
    test("The equal button should be enabled", () => {
        expect((0, calculator_1.isButtonEnabled)("#btn-equal", calculator.getCurrentValue())).toBeTruthy();
    });
    // Test input field validation and behavior
    test("Entering valid number within range", () => {
        calculator.clearDisplay();
        calculator.enterNumber("1234.56");
        expect(calculator.getDisplayValue()).toBe("1234.56");
    });
    test("Entering valid number with too many decimal places should truncate", () => {
        calculator.clearDisplay();
        calculator.enterNumber("1234.5678");
        expect(calculator.getDisplayValue()).toBe("1234.56");
    });
    test("Entering a number above the upper limit should display an error", () => {
        calculator.clearDisplay();
        calculator.enterNumber("10000");
        expect(calculator.getDisplayValue()).toBe("Out of Range");
    });
    test("Entering a number below the lower limit should display an error", () => {
        calculator.clearDisplay();
        calculator.enterNumber("-10000");
        expect(calculator.getDisplayValue()).toBe("Out of Range");
    });
    test("Changing sign of the number", () => {
        calculator.clearDisplay();
        calculator.enterNumber("123");
        calculator.toggleSign();
        expect(calculator.getDisplayValue()).toBe("-123");
    });
    test("Clearing the display", () => {
        calculator.clearDisplay();
        calculator.enterNumber("123");
        calculator.clearDisplay();
        expect(calculator.getDisplayValue()).toBe("0");
    });
    test("Consecutive calculations without clearing display", () => {
        calculator.clearDisplay();
        calculator.enterNumber("10");
        calculator.handleOperatorInput("add");
        calculator.enterNumber("5");
        calculator.calculateResult();
        calculator.handleOperatorInput("subtract");
        calculator.enterNumber("3");
        calculator.calculateResult();
        expect(calculator.getDisplayValue()).toBe("12");
    });
    test("Entering a valid negative number within range", () => {
        calculator.clearDisplay();
        calculator.enterNumber("-1234.56");
        expect(calculator.getDisplayValue()).toBe("-1234.56");
    });
    test("Entering a valid number with a leading zero", () => {
        calculator.clearDisplay();
        calculator.enterNumber("0.123");
        expect(calculator.getDisplayValue()).toBe("0.12");
    });
    test("Entering a valid number with a leading decimal point", () => {
        calculator.clearDisplay();
        calculator.enterNumber(".123");
        expect(calculator.getDisplayValue()).toBe("0.12");
    });
    test("Entering a valid negative number with a leading zero", () => {
        calculator.clearDisplay();
        calculator.enterNumber("-0.123");
        expect(calculator.getDisplayValue()).toBe("-0.12");
    });
    test("Entering a valid negative number with a leading decimal point", () => {
        calculator.clearDisplay();
        calculator.enterNumber("-.123");
        expect(calculator.getDisplayValue()).toBe("-0.12");
    });
    test("Entering a valid number with multiple leading zeros", () => {
        calculator.clearDisplay();
        calculator.enterNumber("000123");
        expect(calculator.getDisplayValue()).toBe("123");
    });
    test("Entering a valid number with thousands separator", () => {
        calculator.clearDisplay();
        calculator.enterNumber("1,234.56");
        expect(calculator.getDisplayValue()).toBe("1234.56");
    });
    test("Entering a valid number with thousands separator and leading zeros", () => {
        calculator.clearDisplay();
        calculator.enterNumber("00,001,234.56");
        expect(calculator.getDisplayValue()).toBe("1234.56");
    });
    test("Entering a valid number with invalid characters (should be ignored)", () => {
        calculator.clearDisplay();
        calculator.enterNumber("12a3b4.56c");
        expect(calculator.getDisplayValue()).toBe("1234.56");
    });
    // Test button behavior.
    test("Clicking '1' button", () => {
        calculator.clearDisplay();
        driver.findElement(selenium_webdriver_1.By.id("btn-1")).click();
        expect(calculator.getDisplayValue()).toBe("1");
    });
    test("Clicking '2' button", () => {
        calculator.clearDisplay();
        driver.findElement(selenium_webdriver_1.By.id("btn-2")).click();
        expect(calculator.getDisplayValue()).toBe("2");
    });
    test("Clicking '3' button", () => {
        calculator.clearDisplay();
        driver.findElement(selenium_webdriver_1.By.id("btn-3")).click();
        expect(calculator.getDisplayValue()).toBe("3");
    });
    test("Clicking '4' button", () => {
        calculator.clearDisplay();
        driver.findElement(selenium_webdriver_1.By.id("btn-4")).click();
        expect(calculator.getDisplayValue()).toBe("4");
    });
    test("Clicking '5' button", () => {
        calculator.clearDisplay();
        driver.findElement(selenium_webdriver_1.By.id("btn-5")).click();
        expect(calculator.getDisplayValue()).toBe("5");
    });
    test("Clicking '6' button", () => {
        calculator.clearDisplay();
        driver.findElement(selenium_webdriver_1.By.id("btn-6")).click();
        expect(calculator.getDisplayValue()).toBe("6");
    });
    test("Clicking '7' button", () => {
        calculator.clearDisplay();
        driver.findElement(selenium_webdriver_1.By.id("btn-7")).click();
        expect(calculator.getDisplayValue()).toBe("7");
    });
    test("Clicking '8' button", () => {
        calculator.clearDisplay();
        driver.findElement(selenium_webdriver_1.By.id("btn-8")).click();
        expect(calculator.getDisplayValue()).toBe("8");
    });
    test("Clicking '9' button", () => {
        calculator.clearDisplay();
        driver.findElement(selenium_webdriver_1.By.id("btn-9")).click();
        expect(calculator.getDisplayValue()).toBe("9");
    });
    test("Clicking 'sign' button", () => {
        calculator.clearDisplay();
        driver.findElement(selenium_webdriver_1.By.id("btn-sign")).click();
        expect(calculator.getDisplayValue()).toBe("sign");
    });
});
