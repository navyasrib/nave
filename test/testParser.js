const pwd = process.cwd();
const classes = require(pwd + '/classes');
var parser = require(pwd + '/Parser.js');
var lib;
const assert = require('assert');

beforeEach(() => {
    lib = require(pwd + '/lib');
});

describe('declaration', function() {
    it('Num x', function() {
        var type = classes.Num;
        var expected = lib.declare(type, 'x');
        var result = parser.parse('Num x.');

        assert.deepEqual(expected, result);
    });

    it('Str y', function() {
        var type = classes.Str;
        var expected = lib.declare(type, 'y');
        var result = parser.parse('Str y.');

        assert.deepEqual(expected, result);
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

    it('Str s. s IS "somthing".', function() {
        var type = classes.Str;
        var variable = lib.declare(type, 's');
        var string = new classes.Str('"somthing"');
        var assign = lib.assignValue(variable, string)

        var expected = [variable, assign];
        var result = parser.parse('Str s. s IS "somthing".');

        assert.deepEqual(expected, result);
    });
});
