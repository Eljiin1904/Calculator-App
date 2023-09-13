"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const selenium_webdriver_1 = require("selenium-webdriver");
const calculator_1 = require("./calculator");
describe('Functional Tests', () => {
    let driver;
    let calculator;
    beforeAll(async () => {
        driver = await new selenium_webdriver_1.Builder().forBrowser('chrome').build();
        await driver.get('http://172.20.10.8:8080');
        calculator = new calculator_1.Calculator("display"); // Make sure calculatorPage is defined
    });
    afterAll(async () => {
        await driver.quit();
    });
    it('should initialize with a value of 0', () => {
        expect(calculator.getDisplayValue()).toBe("0");
    });
    it("should add two numbers", () => {
        calculator.handleDigitInput("1");
        calculator.handleOperatorInput("add");
        calculator.handleDigitInput("2");
        calculator.calculateResult();
        expect(calculator.getDisplayValue()).toBe("3");
    });
    it("should subtract two numbers", () => {
        calculator.handleDigitInput("10");
        calculator.handleOperatorInput("subtract");
        calculator.handleDigitInput("2");
        calculator.calculateResult();
        expect(calculator.getDisplayValue()).toBe("8");
    });
    it("should multiply two numbers", () => {
        calculator.handleDigitInput("2");
        calculator.handleOperatorInput("multiply");
        calculator.handleDigitInput("3");
        calculator.calculateResult();
        expect(calculator.getDisplayValue()).toBe("6");
    });
    it("should divide two numbers", () => {
        calculator.handleDigitInput("10");
        calculator.handleOperatorInput("divide");
        calculator.handleDigitInput("2");
        calculator.calculateResult();
        expect(calculator.getDisplayValue()).toBe("5");
    });
    // Tests for the calculator's error handling.
    it("should throw an error when dividing by zero", () => {
        calculator.handleDigitInput("10");
        calculator.handleOperatorInput("divide");
        calculator.handleDigitInput("0");
        calculator.calculateResult();
        expect(calculator.getDisplayValue()).toBe("Error: Division by Zero");
    });
    it("should throw an error when invalid input is entered", () => {
        calculator.handleDigitInput("abc");
        calculator.calculateResult();
        expect(calculator.getDisplayValue()).toBe("Error: Invalid Input");
    });
    // ... (Other tests)
    // Tests for the calculator's behavior in different browsers and devices.
    describe("Different browsers and devices", () => {
        it("should work in Chrome", () => {
            // Test the calculator in Chrome.
        });
        it("should work in Firefox", () => {
            // Test the calculator in Firefox.
        });
        it("should work in Edge", () => {
            // Test the calculator in Edge.
        });
        it("should work in Safari", () => {
            // Test the calculator in Safari.
        });
        it("should work on a mobile device", () => {
            // Test the calculator on a mobile device.
        });
    });
});
