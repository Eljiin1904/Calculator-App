
import { Calculator,} from "./calculator";

// Initialize calculator instance with the display element's ID
const calculator = new Calculator("display");

// Function to add click event listeners to buttons
function addButtonClickListeners() {
    const buttonIds = [
        'btn-0', 'btn-1', 'btn-2', 'btn-3', 'btn-4', 'btn-5', 'btn-6', 'btn-7', 'btn-8', 'btn-9',
        'btn-add', 'btn-subtract', 'btn-multiply', 'btn-divide', 'btn-sign', 'btn-clear', 'btn-equal',
    ];

    buttonIds.forEach(buttonId => {
        const button = document.getElementById(buttonId);
        if (button) {
            button.addEventListener('click', () => {
                calculator.handleButtonClick(buttonId);
                
                
            });
        }
    });
}

// Add click event listeners to buttons
addButtonClickListeners();
