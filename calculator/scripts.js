let buttons = document.querySelectorAll('button');
let display = document.querySelector('.calculator-screen');
display.value = '0';
        
let first_number = '';
let second_number = '';
let result = '';
let operator = '';
        
function updateDisplay(value, condition) {
    if (condition) {
        display.value += value;
    } else {
        display.value = value;
    }
    display.scrollLeft = display.scrollWidth;
}
        
buttons.forEach(button => {
    button.addEventListener('click', () => {
        let val = button.value;
        if (val >= '0' && val <= '9' || val == '.') {
            if (!operator) {
                if (display.value === '0') {
                    updateDisplay('', false);
                }
                if(val === '.' && first_number.includes('.')) return;
                first_number += val;
                updateDisplay(val, true);
            } else {
                if(val === '.' && second_number.includes('.')) return;
                second_number += val;
                updateDisplay(val, true);
                    }
        } else if (val == 'AC') {
            updateDisplay('0', false);
            first_number = '';
            second_number = '';
            result = '';
            operator = '';
        }else if (val == 'DEL') {
            if (!operator) {
                first_number = first_number.slice(0, -1);
                updateDisplay(first_number || '0', false);
            } else if (second_number) {
                second_number = second_number.slice(0, -1);
                if (second_number) {
                    updateDisplay(first_number + operator + second_number, false); 
                    } else {
                    updateDisplay(first_number + operator, false);
                }
            } else if (operator) {
                operator = '';
                updateDisplay(first_number, false);
            }
        }else if (val == '=') {
            if (operator && second_number && first_number) {
                first_number = parseFloat(first_number);
                second_number = parseFloat(second_number);
                switch (operator) {
                    case '+':
                        result = first_number + second_number;
                        break;
                    case '-':
                        result = first_number - second_number;
                        break;
                    case '*':
                        result = first_number * second_number;
                        break;
                    case '/':
                        result = first_number / second_number;
                        break;
                    default:
                        alert('Something went wrong!');
                }
                updateDisplay(result, false);
                first_number = result.toString();
                second_number = '';
                result = '';
                operator = '';
            } else {
                alert('Please enter numbers and operators properly!');
            }
        } else {
            if (!operator) {
                if (first_number) {
                    operator = val;
                    updateDisplay(operator, true);
                } else {
                    alert('No number input!');
                }
            }else if(second_number){
                alert('operator already selected!')
            }else {
               operator = val;
               updateDisplay(first_number + operator, false);
            }
        }
    });
});