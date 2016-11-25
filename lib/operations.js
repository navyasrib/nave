var operations = {};

operations.plus = function(op1, op2) {
    return op1.evaluate() + op2.evaluate();
}

module.exports = operations;
