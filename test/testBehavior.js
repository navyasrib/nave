const pwd = process.cwd();
const classes = require(pwd + '/classes');
var parser = require(pwd + '/Parser.js');
var lib = require(pwd + '/lib');
const assert = require('assert');

describe('behavior with start and hlt block', function() {
    it('START statements HLT', function() {
        var variableB = lib.declare(classes.Num, 'b')
        var variableA = lib.declare(classes.Num, 'a')
        var assignA = lib.assignValue(variableA, new classes.Num(2));
        var assignB = lib.assignValue(variableB, new classes.Num(6));
        var expected = [new classes.Behavior([assignA, assignB])];
        var actual = parser.parse('START NUM a IS 2. NUM b IS 3 PLUS 3. HLT.');
        assert.deepEqual(expected, actual);
    });

    it('Behavior can be assigned into variable', function() {
        var variableC = lib.declare(classes.Num, 'c')
        var variableD = lib.declare(classes.Num, 'd')
        var assignC = lib.assignValue(variableC, new classes.Num(2));
        var assignD = lib.assignValue(variableD, new classes.Num(6));
        var variableBehave = lib.declare(classes.Behavior, 'behave');
        var expected = [lib.assignValue(variableBehave, new classes.Behavior([assignC, assignD]))];

        var actual = parser.parse('BEHAVIOR behave IS START NUM c IS 2. NUM d IS 3 PLUS 3. HLT.');
        assert.deepEqual(expected, actual);
    });

    it('EXECUTE a Behavior', function() {
        var variableE = lib.declare(classes.Num, 'e')
        var variableF = lib.declare(classes.Num, 'f')
        var assignE = lib.assignValue(variableE, new classes.Num(2));
        var assignF = lib.assignValue(variableF, new classes.Num(6));
        var variableBehave = lib.declare(classes.Behavior, 'behave');
        var assignBehave = lib.assignValue(variableBehave, new classes.Behavior([assignE, assignF]));
        var operation = new classes.Operation(lib.operations.executeBehavior(assignBehave));

        var expected = [assignBehave, operation]
        var actual = parser.parse('BEHAVIOR behave IS START NUM e IS 2. NUM f IS 3 PLUS 3. HLT. EXECUTE behave.');

        assert.deepEqual(JSON.stringify(expected), JSON.stringify(actual));
    });

    it('print', function() {
        var variableG = lib.declare(classes.Num, 'g')
        var variableH = lib.declare(classes.Num, 'h')
        var assignG = lib.assignValue(variableG, new classes.Num(2));
        var assignH = lib.assignValue(variableH, new classes.Num(6));
        var addition = new classes.Operation(lib.operations.plus, assignG, assignH);
        var printOperation = new classes.Operation(lib.operations.print, addition);
        var expected = [assignG, assignH, printOperation];
        var actual = parser.parse('NUM g IS 2. NUM h IS 6. DISPLAY g PLUS h.');

        assert.deepEqual(JSON.stringify(expected), JSON.stringify(actual));
    });

});
