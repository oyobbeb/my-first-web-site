const input = {'array' : []};
input.getInput = function() {
    return this.array.join('');
};
input.removeAll = function(value) {
    this.array = [];
    this.array.push(value);
};

input.isEmpty = function() {
    return this.array.length === 0;
};

input.prepareCalculate = function() {
    this.array = this.array.join('').split(' ');
};

input.getValue = function() {
    var str = this.array.shift();
    var n = Number(str);
    return n;
};

input.getOperator = function() {
    var op = this.array.shift();
    if (op === "+" || op === "-" || op === "*" || op === "/") {
        return op;
    } else {
        return '$';
    }
};

const calculator = {};
calculator.calculate = function(first, second, op) {
    var ret;
    switch(op) {
        case "+":
        ret = first + second;
        break;
        case "-":
        ret = first - second;
        break;
        case "*":
        ret = first * second;
        break;
        case "/":
        ret = first / second;
        break;
        default:
        return NaN;
    }
    return ret;
};

const output = {};
output.text = document.getElementById('output');
output.print = function(str) {
    this.text.innerHTML = str;
};
output.display = function() {
    this.text.innerHTML = input.getInput();
};

const clickNumbers = function(event) {
    var str = event.target.innerHTML;
    console.log(str);

    if (str === 'BS') {
        input.array.pop();
    } else if (str === '+' || str === '-' || str === '*' || str === '/') {
        input.array.push(' ' + str + ' ')
    } else {
        input.array.push(str);
    }
    if (input.isEmpty()) {
        output.text.innerHTML = 'empty';
    } else {
        output.display();
    }
    console.log(input.getInput());
};

const showResult = function(event) {
    input.prepareCalculate();
    let result = input.getValue();
    while (!input.isEmpty()) {
        let op = input.getOperator();
        let second = input.getValue();
        result = calculator.calculate(result, second, op);
    }
    output.print(result);
    input.removeAll(result);
};