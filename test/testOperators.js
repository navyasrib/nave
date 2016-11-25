const pwd = process.cwd();
const classes = require(pwd + '/classes');
var parser = require(pwd + '/Parser.js');
var lib = require(pwd + '/lib');
const assert = require('assert');

describe('operators', function() {
    it('plus', function() {
        var declaration = lib.declare(classes.Num, 'a')
        var expected = lib.assignValue(declaration, new classes.Num(12));
        var actual = parser.parse('NUM a IS 2 PLUS 10.')
        assert.deepEqual(expected, actual);
    });

    it('negate', function() {
        var declaration = lib.declare(classes.Num, 'b')
        var expected = lib.assignValue(declaration, new classes.Num(8));
        var actual = parser.parse('NUM b IS MINUS 2 PLUS 10.')
        assert.deepEqual(expected, actual);
    });

    it('greaterthan', function() {
        var declaration = lib.declare(classes.Bool, 'c')
        var expected = lib.assignValue(declaration, new classes.Bool(true));
        var actual = parser.parse('BOOLEAN c IS 12 GREATERTHAN 10.')
        assert.deepEqual(expected, actual);
    });

    it('string join', function() {
        var declaration = lib.declare(classes.Str, 'd')
        var expected = lib.assignValue(declaration, new classes.Str('hello world'));
        var actual = parser.parse('STR d IS "hello" JOIN " world".')
        assert.deepEqual(expected, actual);
    });

    it('plus with variable', function() {
        var declarationE = lib.declare(classes.Num, 'e');
        var declarationF = lib.declare(classes.Num, 'f');
        var number = new classes.Num(12);

        var assignE = lib.assignValue(declarationE, number);
        var operation = new classes.Operation(lib.operations.plus, assignE, new classes.Num(3));
        var assignF = lib.assignValue(declarationF, operation);

        var expected = [assignE, assignF];
        var actual = parser.parse('NUM e IS 12. NUM f IS e PLUS 3.')

        assert.equal(JSON.stringify(expected), JSON.stringify(actual));
    });

    it('plus with multiple variables', function() {
        var declarationG = lib.declare(classes.Num, 'g');
        var declarationH = lib.declare(classes.Num, 'h');
        var declarationI = lib.declare(classes.Num, 'i');
        var numberG = new classes.Num(12);
        var numberH = new classes.Num(3);

        var assignG = lib.assignValue(declarationG, numberG);
        var assignH = lib.assignValue(declarationH, numberH);
        var operationHI = new classes.Operation(lib.operations.plus, assignH, new classes.Num(4));
        var operationGHI = new classes.Operation(lib.operations.plus, assignG, operationHI);


        var assignI = lib.assignValue(declarationI, operationGHI);

        var expected = [assignG, assignH, assignI];
        var actual = parser.parse('NUM g IS 12. NUM h IS 3. NUM i IS g PLUS h PLUS 4.')

        assert.equal(JSON.stringify(expected), JSON.stringify(actual));
    });

    it('plus with multiple numbers', function() {
        var declaration = lib.declare(classes.Num, 'aa')
        var expected = lib.assignValue(declaration, new classes.Num(12));
        var actual = parser.parse('NUM aa IS 2 PLUS 1 PLUS 5 PLUS 4.')
        assert.deepEqual(expected, actual);
    });
});
