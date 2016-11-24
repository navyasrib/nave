const classes = require('../classes');
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
    if (!(value instanceof variable.type))
        throw new Error('Improper data type...');
    var identifier = getVariable(variable.identifier);
    identifier.setValue(value);
    return identifier;
};

var assignVariable = function(variableDest, variableSrc) {
    return assignValue(variableDest, variableSrc.value);
};

module.exports = {
    getVariable,
    declare,
    assignValue,
    assignVariable
}
