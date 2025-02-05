// Show calculator when button is clicked
function startCalculator() {
    document.getElementById('landing-page').style.display = 'none';
    document.getElementById('calculator-container').style.display = 'flex';
}

// Append characters to the display
function appendToDisplay(value) {
    document.getElementById('display').value += value;
}

// Clear display
function clearDisplay() {
    document.getElementById('display').value = '';
}

// Function to calculate factorial
function factorial(n) {
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

// Function to safely evaluate expressions
function calculateResult() {
    let expression = document.getElementById('display').value;

    try {
        // Replace `^` with `Math.pow`
        expression = expression.replace(/(\d+)\^(\d+)/g, "Math.pow($1,$2)");

        // Replace factorial (`!`) with function calls
        expression = expression.replace(/(\d+)!/g, function(match, num) {
            return factorial(parseInt(num));
        });

        // Replace `√(x)` with `Math.sqrt(x)`
        expression = expression.replace(/√(\d+)/g, "Math.sqrt($1)");

        // Evaluate the modified expression
        let result = eval(expression);

        // Display the result
        document.getElementById('display').value = result;
    } catch (error) {
        document.getElementById('display').value = "Error";
    }
}

// Keyboard support
document.addEventListener("keydown", function(event) {
    let key = event.key;

    if ("0123456789+-*/().".includes(key)) {
        appendToDisplay(key);
    } else if (key === "Enter") {
        calculateResult();
    } else if (key === "Backspace") {
        let display = document.getElementById('display');
        display.value = display.value.slice(0, -1);
    } else if (key === "Escape") {
        clearDisplay();
    } else if (key === "^") {
        appendToDisplay("^");
    } else if (key === "!") {
        appendToDisplay("!");
    }
});
