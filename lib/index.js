const classes = require('../classes');
const operations = require('./operations');
var variables = {};

var getVariable = function(identifier) {
    if (variables[identifier])
        return variables[identifier];
    // console.log("=====================", identifier);
    throw new Error(`Variable ${identifier} Not Declared...`);
};

var declare = function(type, identifier) {
    variables[identifier] = new classes.Var(type, identifier);
    return variables[identifier];
};

var assignValue = function(variable, value) {
    // console.log(variable, value, '------------')
    if (!(value instanceof variable.type || value instanceof classes.Operation))
        throw new Error('Improper data type...');
    var identifier = getVariable(variable.identifier);
    identifier.setValue(value);
    return identifier;
};

var assignVariable = function(variableDest, variableSrc) {
    return assignValue(variableDest, variableSrc.value);
};

var mathOperation = function(operator, op1, op2) {
    if (op1 instanceof classes.Num && op2 instanceof classes.Num)
        return op1[operator](op2);
    return new classes.Operation(operations[operator], op1, op2)
};

var assignment = function(dest, src) {
    return src instanceof classes.Var ? assignVariable(dest, src) : assignValue(dest, src);
};

module.exports = {
    getVariable,
    declare,
    assignValue,
    assignVariable,
    operations,
    mathOperation,
    assignment
}
