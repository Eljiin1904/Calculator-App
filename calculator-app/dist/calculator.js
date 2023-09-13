"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isButtonEnabled = exports.Calculator = void 0;
class Calculator {
    currentValue = 0;
    previousValue = 0;
    operator = null;
    displayElement = null;
    constructor(displayId) {
        this.displayElement = document.getElementById(displayId);
        if (this.displayElement) {
            this.displayElement.value = this.currentValue.toString();
        }
        this.initializeButtonListeners();
    }
    initializeButtonListeners() {
        const buttons = [
            'btn-0', 'btn-1', 'btn-2', 'btn-3', 'btn-4', 'btn-5', 'btn-6', 'btn-7', 'btn-8', 'btn-9',
            'btn-add', 'btn-subtract', 'btn-multiply', 'btn-divide', 'btn-clear', 'btn-equal', 'btn-sign'
        ];
        buttons.forEach(buttonId => {
            const button = document.getElementById(buttonId);
            if (button) {
                button.addEventListener('click', () => this.handleButtonClick(buttonId));
            }
        });
    }
    handleButtonClick(buttonId) {
        if (this.displayElement) {
            const currentValue = parseFloat(this.displayElement.value);
            switch (buttonId) {
                case 'btn-0':
                case 'btn-1':
                case 'btn-2':
                case 'btn-3':
                case 'btn-4':
                case 'btn-5':
                case 'btn-6':
                case 'btn-7':
                case 'btn-8':
                case 'btn-9':
                    const digit = buttonId.split('-')[1];
                    this.handleDigitInput(digit);
                    break;
                case 'btn-add':
                case 'btn-subtract':
                case 'btn-multiply':
                case 'btn-divide':
                    const operator = buttonId.split('-')[1];
                    this.handleOperatorInput(operator);
                    break;
                case 'btn-equal':
                    this.calculateResult();
                    this.updateDisplay();
                    break;
                case 'btn-sign':
                    this.toggleSign();
                    this.updateDisplay();
                    break;
                case 'btn-clear':
                    this.clearDisplay();
                    this.updateDisplay();
                    break;
            }
        }
    }
    handleDigitInput(digit) {
        if (this.displayElement) {
            const currentValue = parseFloat(this.displayElement.value);
            if (currentValue >= -9999.99 && currentValue <= 9999.99) {
                if (currentValue === 0) {
                    this.currentValue = parseFloat(digit);
                }
                else {
                    this.currentValue = parseFloat(currentValue.toString() + digit);
                }
            }
            else {
                if (this.displayElement) {
                    this.displayElement.value = "Out of Range";
                }
            }
        }
    }
    handleOperatorInput(operator) {
        this.operator = operator;
        this.previousValue = this.currentValue;
        this.currentValue = 0;
    }
    calculateResult() {
        switch (this.operator) {
            case 'add':
                this.currentValue = this.previousValue + this.currentValue;
                break;
            case 'subtract':
                this.currentValue = this.previousValue - this.currentValue;
                break;
            case 'multiply':
                this.currentValue = this.previousValue * this.currentValue;
                break;
            case 'divide':
                if (this.currentValue !== 0) {
                    this.currentValue = this.previousValue / this.currentValue;
                }
                else {
                    if (this.displayElement) {
                        this.displayElement.value = "Error: Division by Zero";
                    }
                }
                break;
        }
        this.operator = null;
    }
    toggleSign() {
        this.currentValue = -this.currentValue;
    }
    clearDisplay() {
        this.currentValue = 0;
        this.previousValue = 0;
        this.operator = null;
        if (this.displayElement) {
            this.displayElement.value = "0";
        }
    }
    updateDisplay() {
        if (this.displayElement) {
            this.displayElement.value = this.currentValue.toString();
        }
    }
    enterNumber(input) {
        if (/^-?\d+(\.\d*)?$/.test(input.toString())) {
            const newValue = parseFloat(input.toString());
            if (!isNaN(newValue)) {
                this.currentValue = newValue;
                this.updateDisplay();
            }
        }
    }
    // Add a getter method for currentValue
    getCurrentValue() {
        return this.currentValue;
    }
    // Add a getter method for displayElement
    getDisplayValue() {
        return this.displayElement ? this.displayElement.value : "0";
    }
}
exports.Calculator = Calculator;
// Add this function outside the Calculator class to check if a button should be enabled or disabled.
function isButtonEnabled(buttonId, currentValue) {
    // You can implement your logic here to determine if the button should be enabled.
    // For example, you can disable the "divide" button if the currentValue is 0 to prevent division by zero.
    if (buttonId === 'btn-divide' && currentValue === 0) {
        return false;
    }
    return true; // Enable the button by default.
}
exports.isButtonEnabled = isButtonEnabled;
