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
});
