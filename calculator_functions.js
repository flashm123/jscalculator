
function writeNumber(number) {
    var displayer = document.getElementById("display");

    if (displayer.value == 0)
        displayer.value = number;
    else
        displayer.value += number;
}

function clearDisplay() {
    document.getElementById("display").value = 0;
}


function displayOperation(operation) {
    var displayer = document.getElementById("display");
    var lastSymbol = displayer.value.charAt(displayer.value.length - 1);

    if (parseInt(lastSymbol) || lastSymbol=='0')
        displayer.value += operation;
}


function Evaluate() {
    var displayer = document.getElementById("display");

    var expression = String(displayer.value);

    if (expression.includes("*") || (expression.includes("+")) || (expression.includes("-")) || (expression.includes("/"))) {
        var npaExpr = toReversePolishNotation(expression);
    }

    var numStack = new Array();

    for (var i = 0; i < npaExpr.length; i++) {
        if (parseInt(npaExpr[i])) {
            numStack.push(npaExpr[i]);
        }
        else {
            switch (npaExpr[i]) {
                case "+":
                    {
                        numStack.push(parseFloat(numStack.pop()) + parseFloat(numStack.pop()));
                        break;
                    }
                case "-":
                    {
                        var num1 = parseFloat(numStack.pop());
                        var num2 = parseFloat(numStack.pop());
                        numStack.push(num2 - num1);
                        break;
                    }
                case "*":
                    {
                        numStack.push(parseFloat(numStack.pop()) * parseFloat(numStack.pop()));
                        break;
                    }
                case "/":
                    {
                        var num1 = parseFloat(numStack.pop());
                        var num2 = parseFloat(numStack.pop());
                        numStack.push(num2 / num1);
                        break;
                    }
                default:
                    break;
            }
        }
    }
    displayer.value = numStack.pop();
}

function toReversePolishNotation(expression) {

    if (!parseInt(expression[expression.length - 1]) && (expression[expression.length - 1] != '0')) { //toReversePolishТotation
        expression = expression.substring(0, expression.length - 1);
    }

    var operationPriorities = {
        "+": 1,
        "-": 1,
        "*": 2,
        "/": 2
    };

    var operationStack = [];
    var expressionList = new Array();

    var num = "";

    for (var i = 0; i < expression.length; i++) {
        if (parseInt(expression[i]) || (expression[i]=='0') || (expression[i] =='.')) {
            num += expression[i];
        }
        else {
            if (num) {
                expressionList.push(num);
                num = "";
            }
            if (operationStack.length == 0)
                operationStack.push(expression[i]);
            else {
                //Check priorities
                var topSymbol = operationStack[operationStack.length - 1];
                var currentOp = expression[i];

                var topOperationPriority = operationPriorities[topSymbol];
                var currOperationPriority = operationPriorities[currentOp];

                while (topOperationPriority >= currOperationPriority) {
                    expressionList.push(operationStack.pop());
                    if (operationStack.length != 0) {
                        topOperationPriority = operationPriorities[operationStack[operationStack.length - 1]];
                    }
                    else break;
                }
                operationStack.push(currentOp);
            }
        }
    }
    if (num) {
        expressionList.push(num);
    }
    while (operationStack.length > 0) {
        expressionList.push(operationStack.pop());
    }
    return expressionList;
}














