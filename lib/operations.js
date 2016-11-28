var operations = {};
const classes = require('../classes');

operations.plus = function(op1, op2) {
    // console.log('-----------', op1, '----', op2);
    return new classes.Num(op1.value + op2.value);
};

operations.executeBehavior = function(...args) {
    var behavior = args[0];
    var argus = args.slice(1);
    return function() {
        return behavior.execute.apply(null, args);
    };
};

operations.print = function(...args) {
    console.log.apply(null, args.map((d) => {
        return d.evaluate().toString()
    }))
};


module.exports = operations;
