
import { WebDriver, Builder, Capabilities  } from "selenium-webdriver";

import { Calculator } from "./calculator";

describe("Calculator", () => {
  let calculator: Calculator;
  let driver: WebDriver;

  beforeEach(async () => {
    const capabilities = Capabilities.chrome();
    driver = await new Builder().withCapabilities(capabilities).build();
    await driver.get("http://172.20.10.8:8080");
    calculator = new Calculator("display");
  });


  afterEach(() => {
    driver.quit();
  });

  // Validating Calculator is displaying 0 before the test starts
  it("should initialize with a value of 0", () => {
    expect(calculator.getDisplayValue()).toBe("0");
  });

  // Simple operations
  it("should add two numbers", () => {
    calculator.enterNumber(1);
    calculator.enterNumber(2);
    calculator.handleOperatorInput("add");
    calculator.calculateResult();
    expect(calculator.getDisplayValue()).toBe("3");
  });

  it("should subtract two numbers", () => {
    calculator.enterNumber(10);
    calculator.enterNumber(2);
    calculator.handleOperatorInput("subtract");
    calculator.calculateResult();
    expect(calculator.getDisplayValue()).toBe("8");
  });

  it("should multiply two numbers", () => {
    calculator.enterNumber(2);
    calculator.enterNumber(3);
    calculator.handleOperatorInput("multiply");
    calculator.calculateResult();
    expect(calculator.getDisplayValue()).toBe("6");
  });

  it("should divide two numbers", () => {
    calculator.enterNumber(10);
    calculator.enterNumber(2);
    calculator.handleOperatorInput("divide");
    calculator.calculateResult();
    expect(calculator.getDisplayValue()).toBe("5");
  });

  // The calculator only accepts numbers between -9999.99 and 9999.99.
  it("should only accept numbers between -9999.99 and 9999.99", () => {
    calculator.enterNumber("10000");
    calculator.calculateResult();
    expect(calculator.getDisplayValue()).toBe("-9999.99");

    calculator.enterNumber("-10000");
    calculator.calculateResult();
    expect(calculator.getDisplayValue()).toBe("9999.99");
  });

  // Internal calculations should truncate extra digits after the second decimal digit.
  it("should truncate extra digits after the second decimal digit", () => {
    calculator.enterNumber("123.4567");
    calculator.calculateResult();
    expect(calculator.getDisplayValue()).toBe("123.45");
  });

  // Internal calculations should throw an error when the calculated number is out of range and display it on the screen.
  it("should throw an error when the calculated number is out of range", () => {
    calculator.enterNumber("10000");
    calculator.handleOperatorInput("add");
    calculator.enterNumber("1");
    calculator.calculateResult();
    expect(calculator.getDisplayValue()).toBe("The calculated number is out of range");
  });

  // The sign can be changed at any time when a number is entered.
  it("should allow the sign to be changed at any time when a number is entered", () => {
    calculator.enterNumber("10");
    calculator.toggleSign();
    expect(calculator.getDisplayValue()).toBe("-10");
  });

  // The display can be cleared at any time.
  it("should allow the display to be cleared at any time", () => {
    calculator.enterNumber("10");
    calculator.clearDisplay();
    expect(calculator.getDisplayValue()).toBe("0");
  });

  // Consecutive calculations are allowed before clearing the display
  it("should allow consecutive calculations before clearing the display", () => {
    calculator.enterNumber("10");
    calculator.handleOperatorInput("add");
    calculator.enterNumber("20");
    calculator.calculateResult();
    expect(calculator.getDisplayValue()).toBe("30");
    calculator.handleOperatorInput("add");
    calculator.enterNumber("30");
    calculator.calculateResult();
    expect(calculator.getDisplayValue()).toBe("60");
  });

  // Negative numbers
  it("should be able to handle negative numbers", () => {
    calculator.enterNumber("-10");
    calculator.calculateResult();
    expect(calculator.getDisplayValue()).toBe("-10");
  });

  // Decimal numbers
  it("should be able to handle decimal numbers", () => {
    calculator.enterNumber("12.34");
    calculator.calculateResult();
    expect(calculator.getDisplayValue()).toBe("12.34");
  });

  // Mixed numbers
  it("should be able to handle mixed numbers", () => {
    calculator.enterNumber("12.34 5");
    calculator.calculateResult();
    expect(calculator.getDisplayValue()).toBe("17.34");
  });

  // Parentheses
  it("should be able to handle parentheses", () => {
    calculator.enterNumber("(10 + 20) * 3");
    calculator.calculateResult();
    expect(calculator.getDisplayValue()).toBe("90");
  });

  // Multiple operations in a single expression
  it("should be able to handle multiple operations in a single expression", () => {
    calculator.enterNumber("10 + 20 * 3 / 4 - 5");
    calculator.calculateResult();
    expect(calculator.getDisplayValue()).toBe("25");
  });

  // Errors
  it("should throw an error when dividing by zero", () => {
    calculator.enterNumber("10");
    calculator.handleOperatorInput("divide");
    calculator.enterNumber("0");
    calculator.calculateResult();
    expect(calculator.getDisplayValue()).toBe("Error: Division by Zero");
  });

  // Invalid input
  it("should throw an error when invalid input is entered", () => {
    calculator.enterNumber("abc");
    calculator.calculateResult();
    expect(calculator.getDisplayValue()).toBe("Invalid input");
  });
});

  
// Test the calculator in different browsers and devices.
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

