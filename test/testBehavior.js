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
        var expected = new classes.Behavior([assignA, assignB]);
        var actual = parser.parse('START NUM a IS 2. NUM b IS 3 PLUS 3. HLT.');
        assert.deepEqual(expected, actual);
    });
});
