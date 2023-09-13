"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const calculator_1 = require("./calculator");
const selenium_webdriver_1 = require("selenium-webdriver");
describe('UI Elements Tests', () => {
    let driver;
    let calculator;
    beforeAll(async () => {
        driver = await new selenium_webdriver_1.Builder().forBrowser('chrome').build();
        await driver.get('http://172.20.10.8:8080');
        //calculator = new Calculator("display");
    });
    afterAll(async () => {
        await driver.quit();
    });
    // Define the Calculatorobject here
    const Calculator = {
        // Selectors for the calculator's HTML elements.
        input: "#display",
        buttons: {
            add: "#btn-add",
            subtract: "#btn-subtract",
            multiply: "#btn-multiply",
            divide: "#btn-divide",
            clear: "#btn-clear",
            sign: "#btn-sign",
            equal: "#btn-equal",
        },
        // Methods for interacting with the calculator's HTML elements.
        enterNumber(number) {
            driver.findElement(selenium_webdriver_1.By.css(this.input)).sendKeys(number);
        },
        clickButton(buttonName) {
            driver.findElement(selenium_webdriver_1.By.css(this.buttons[buttonName])).click();
        },
        isButtonEnabled(buttonId) {
            // Implement your logic to check if the button is enabled.
            // For example, you can use Selenium's isEnabled() method to check the button state.
            return (0, calculator_1.isButtonEnabled)(buttonId, calculator.getCurrentValue());
        },
    };
    // Test all UI elements in numerical order.
    it("The 0 button should be enabled", () => {
        expect(Calculator.isButtonEnabled("#btn-0")).toBeTruthy();
    });
    it("The 1 button should be enabled", () => {
        expect(Calculator.isButtonEnabled("#btn-1")).toBeTruthy();
    });
    it("The 2 button should be enabled", () => {
        expect(Calculator.isButtonEnabled("#btn-2")).toBeTruthy();
    });
    it("The 3 button should be enabled", () => {
        expect(Calculator.isButtonEnabled("#btn-3")).toBeTruthy();
    });
    it("The 4 button should be enabled", () => {
        expect(Calculator.isButtonEnabled("#btn-4")).toBeTruthy();
    });
    it("The 5 button should be enabled", () => {
        expect(Calculator.isButtonEnabled("#btn-5")).toBeTruthy();
    });
    it("The 6 button should be enabled", () => {
        expect(Calculator.isButtonEnabled("#btn-6")).toBeTruthy();
    });
    it("The 7 button should be enabled", () => {
        expect(Calculator.isButtonEnabled("#btn-7")).toBeTruthy();
    });
    it("The 8 button should be enabled", () => {
        expect(Calculator.isButtonEnabled("#btn-8")).toBeTruthy();
    });
    it("The 9 button should be enabled", () => {
        expect(Calculator.isButtonEnabled("#btn-9")).toBeTruthy();
    });
    it("The clear button should be enabled", () => {
        expect(Calculator.isButtonEnabled("#btn-clear")).toBeTruthy();
    });
    it("The add button should be enabled", () => {
        expect(Calculator.isButtonEnabled("#btn-add")).toBeTruthy();
    });
    it("The subtract button should be enabled", () => {
        expect(Calculator.isButtonEnabled("#btn-subtract")).toBeTruthy();
    });
    it("The multiply button should be enabled", () => {
        expect(Calculator.isButtonEnabled("#btn-multiply")).toBeTruthy();
    });
    it("The divide button should be enabled", () => {
        expect(Calculator.isButtonEnabled("#btn-divide")).toBeTruthy();
    });
    it("The sign button should be enabled", () => {
        expect(Calculator.isButtonEnabled("#btn-sign")).toBeTruthy();
    });
    it("The = button should be enabled", () => {
        expect(Calculator.isButtonEnabled("#btn-equal")).toBeTruthy();
    });
    // Test that the input field accepts only numeric values.
    test("The input field should only accept numeric values", () => {
        calculator.enterNumber("abc");
        expect(calculator.getDisplayValue()).toBe("");
    });
    // Test that the input field does not accept invalid characters, such as letters or symbols.
    test("The input field should not accept invalid characters", () => {
        calculator.enterNumber("*");
        expect(calculator.getDisplayValue()).toBe("");
    });
    // Test that the display updates correctly when a number is entered.
    test("The display should update correctly when a number is entered", () => {
        calculator.enterNumber("12");
        expect(calculator.getDisplayValue()).toBe("12");
    });
    // Test that the display updates correctly when an operation is performed.
    test("The display should update correctly when an operation is performed", () => {
        calculator.enterNumber("12");
        driver.findElement(selenium_webdriver_1.By.id("btn-add")).click();
        calculator.enterNumber("3");
        driver.findElement(selenium_webdriver_1.By.id("btn-equal")).click();
        expect(calculator.getDisplayValue()).toBe("15");
    });
    // Test that the display clears when the clear button is clicked.
    test("The display should clear when the clear button is clicked", () => {
        calculator.enterNumber("12");
        driver.findElement(selenium_webdriver_1.By.id("btn-clear")).click();
        expect(calculator.getDisplayValue()).toBe("0");
    });
    // Test that the sign button changes the sign of the number in the display.
    test("The sign button should change the sign of the number in the display", () => {
        calculator.enterNumber("12");
        driver.findElement(selenium_webdriver_1.By.id("btn-sign")).click();
        expect(calculator.getDisplayValue()).toBe("-12");
    });
    // Test that the equal button performs the desired operation.
    test("The equal button should perform the desired operation", () => {
        calculator.enterNumber("12");
        driver.findElement(selenium_webdriver_1.By.id("btn-multiply")).click();
        calculator.enterNumber("3");
        driver.findElement(selenium_webdriver_1.By.id("btn-equal")).click();
        expect(calculator.getDisplayValue()).toBe("36");
    });
    // Test that the calculator handles errors gracefully, such as dividing by zero.
    test("The calculator should handle errors gracefully", () => {
        calculator.enterNumber("12");
        driver.findElement(selenium_webdriver_1.By.id("btn-divide")).click();
        calculator.enterNumber("0");
        expect(calculator.getDisplayValue()).toBe("Cannot divide by zero");
    });
    // Test the behavior of the buttons when they are clicked outside of the calculator's input field.
    test("The buttons should not be clickable outside of the input field", async () => {
        // Click on a button outside of the input field.
        await driver.findElement(selenium_webdriver_1.By.id("btn-clear")).click();
        // Assert that the button is not clickable.
        expect(await driver.findElement(selenium_webdriver_1.By.id("btn-clear")).isEnabled()).toBeFalsy();
    });
    // Test the behavior of the calculator when the input field is empty.
    test("The calculator should not perform any operation when the input field is empty", () => {
        // Click on the equal button.
        driver.findElement(selenium_webdriver_1.By.id("btn-equal")).click();
        // Assert that the display value is still 0.
        expect(calculator.getDisplayValue()).toBe("0");
    });
    // Test the behavior of the calculator when a non-numeric character is entered into the input field.
    test("The calculator should not perform any operation when a non-numeric character is entered into the input field", () => {
        // Enter a non-numeric character into the input field.
        driver.findElement(selenium_webdriver_1.By.id("display")).sendKeys("abc");
        // Click on the equal button.
        driver.findElement(selenium_webdriver_1.By.id("btn-equal")).click();
        // Assert that the display value is still 0.
        expect(calculator.getDisplayValue()).toBe("0");
    });
    // Test the behavior of the calculator when the user tries to divide by zero.
    test("The calculator should display an error message when the user tries to divide by zero", () => {
        test("The calculator should display an error message when the user tries to divide by zero", () => {
            // Enter 10 into the input field.
            driver.findElement(selenium_webdriver_1.By.id("display")).sendKeys("10");
            // Click on the divide button.
            driver.findElement(selenium_webdriver_1.By.id("btn-divide")).click();
            // Enter 0 into the input field.
            driver.findElement(selenium_webdriver_1.By.id("display")).sendKeys("0");
            // Click on the equal button.
            driver.findElement(selenium_webdriver_1.By.id("btn-equal")).click();
        });
        // Test the behavior of the calculator when the user tries to perform an operation that is not supported.
        test("The calculator should display an error message when the user tries to perform an operation that is not supported", async () => {
            // Enter 10 into the input field.
            calculator.enterNumber("10");
            // Click on the square root button.
            await driver.findElement(selenium_webdriver_1.By.id("btn-sqrt")).click();
            // Assert that the display value is still 0 and an error message is displayed.
            expect(calculator.getDisplayValue()).toBe("0");
            expect(await driver.findElement(selenium_webdriver_1.By.id("error")).getText()).toBe("Unsupported operation");
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
    });
});
