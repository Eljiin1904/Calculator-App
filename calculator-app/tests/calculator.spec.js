"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mocha_1 = require("jest");
const calculator_1 = require("./calculator");
(0, mocha_1.describe)("Calculator", () => {
    let calculator;
    beforeEach(() => {
        calculator = new calculator_1.Calculator();
    });
    (0, mocha_1.it)("should add two numbers", () => {
        calculator.enterNumber("1");
        calculator.enterNumber("2");
        calculator.clickAddButton();
        expect(calculator.getDisplayValue()).toBe("3");
    });
    (0, mocha_1.it)("should subtract two numbers", () => {
        calculator.enterNumber("10");
        calculator.enterNumber("2");
        calculator.clickSubtractButton();
        expect(calculator.getDisplayValue()).toBe("8");
    });
    (0, mocha_1.it)("should multiply two numbers", () => {
        calculator.enterNumber("10");
        calculator.enterNumber("2");
        calculator.clickMultiplyButton();
        expect(calculator.getDisplayValue()).toBe("20");
    });
    (0, mocha_1.it)("should divide two numbers", () => {
        calculator.enterNumber("10");
        calculator.enterNumber("2");
        calculator.clickDivideButton();
        expect(calculator.getDisplayValue()).toBe("5");
    });
});
