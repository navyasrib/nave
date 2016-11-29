var operations = {};
const classes = require('../classes');

operations.plus = function(op1, op2) {
    return new classes.Num(op1.evaluate() + op2.evaluate());
};

operations.minus = function(op1, op2) {
    return new classes.Num(op1.evaluate() - op2.evaluate());
};

operations.amplify = function(op1, op2) {
    return new classes.Num(op1.evaluate() * op2.evaluate());
};

operations.simplify = function(op1, op2) {
    return new classes.Num(op1.evaluate() / op2.evaluate());
};

operations.greaterThan = function(op1, op2) {
    return new classes.Bool(op1.evaluate() > op2.evaluate());
};

operations.lessThan = function(op1, op2) {
    return new classes.Bool(op1.evaluate() < op2.evaluate());
};

operations.equals = function(op1, op2) {
    return new classes.Bool(op1.evaluate() == op2.evaluate());
};

operations.executeBehavior = function(...args) {
    var behavior = args[0];
    var argus = args.slice(1);
    return function() {
      var result = behavior.evaluate.apply(behavior, args);
        return result.evaluate();
    };
};

operations.print = function(...args) {
    console.log.apply(null, args.map((d) => {
      var result = d.evaluate()
        return (result.evaluate ? result.evaluate() : result).toString()
    }))
};


module.exports = operations;;
