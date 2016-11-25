var operations = {};
const classes = require('../classes');

operations.plus = function(op1, op2) {
    return new classes.Num(op1.evaluate() + op2.evaluate());
};

operations.executeBehavior = function(...args) {
    var behavior = args[0];
    var argus = args.slice(1);
    return function() {
        return behavior.execute.apply(null, args);
    };
};

operations.print = function(...args) {
    console.log.apply(null, args.map((d) => d.evaluate()))
};


module.exports = operations;
