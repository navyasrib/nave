const pwd = process.cwd();
const classes = require(pwd + '/classes');
var parser = require(pwd + '/Parser.js');
var lib = require(pwd + '/lib');
const assert = require('assert');


describe('declaration', function() {
    it('NUM x', function() {
        var type = classes.Num;
        var expected = lib.declare(type, 'x');
        var actual = parser.parse('NUM x.');

        assert.deepEqual(expected, actual);
    });

    it('STR y', function() {
        var type = classes.Str;
        var expected = lib.declare(type, 'y');
        var actual = parser.parse('STR y.');

        assert.deepEqual(expected, actual);
    });
});

describe('assignment', function() {

    it('z IS 10.', function() {
        try {
            parser.parse('z IS 10.');
        } catch (e) {
            var expected = 'Variable z Not Declared...'
            assert.deepEqual(expected, e.message);
            return;
        }
        assert.ok(false);
    });

    it('STR s. s IS "somthing".', function() {
        var type = classes.Str;
        var variable = lib.declare(type, 's');
        var string = new classes.Str('somthing');
        var assign = lib.assignValue(variable, string)

        var expected = [variable, assign];
        var actual = parser.parse('STR s. s IS "somthing".');

        assert.deepEqual(expected, actual);
    });

    it('STR n IS "somthing". STR v IS n.', function() {
        var type = classes.Str;
        var variableN = lib.declare(type, 'n');
        var variableV = lib.declare(type, 'v')
        var string = new classes.Str('somthing');

        var assignN = lib.assignValue(variableN, string)
        var assignV = lib.assignVariable(variableV, variableN)

        var expected = [assignN, assignV];
        var actual = parser.parse('STR n IS "somthing".\nSTR v IS n.');

        assert.deepEqual(expected, actual);
    });

    it('STR l IS "somthing". NUM k IS l.', function() {
        var expected = "Improper data type...";
        try {
            parser.parse('STR l IS "somthing". NUM k IS l.');
        } catch (e) {
            var actual = e.message;
            assert.equal(expected, actual);
            return;
        }
        assert.ok(false);
    });

});

describe('declare and Define', function() {

    it('NUM a IS 10.', function() {
        var type = classes.Num;
        var declaration = lib.declare(type, 'a');

        var expected = lib.assignValue(declaration, new classes.Num(10));
        var actual = parser.parse('NUM a IS 10.');

        assert.deepEqual(expected, actual);

    });

    it('STR s IS "somthing".', function() {
        var type = classes.Str;
        var variable = lib.declare(type, 's');
        var string = new classes.Str('somthing');

        var expected = lib.assignValue(variable, string)
        var actual = parser.parse('STR s IS "somthing".');

        assert.deepEqual(expected, actual);
    });

    it('STR b IS 9.', function() {
        try {
            parser.parse('STR b IS 9.');
        } catch (e) {
            var expected = "Improper data type...";
            var actual = e.message;
            assert.deepEqual(expected, actual);
            return;
        }
        assert.ok(false)
    });

    it('BOOLEAN c IS FALSE', function() {
        var declaration = lib.declare(classes.Bool, 'c')
        var expected = lib.assignValue(declaration, new classes.Bool(false));
        var actual = parser.parse('BOOLEAN c IS FALSE.')
        assert.deepEqual(expected, actual);
    });
});
