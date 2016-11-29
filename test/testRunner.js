const pwd = process.cwd();
const classes = require(pwd + '/classes');
var parser = require(pwd + '/Parser.js');
var lib = require(pwd + '/lib');
const assert = require('assert');
const sinon = require('mocha-sinon');


describe('test execution', function() {
    it('1 plus 2 should give 3', function() {
        var print = this.sinon.stub(lib.operations, 'print');
        var parsedValue = parser.parse('START NUM a IS 1 PLUS 2. DISPLAY a. HLT.');
        
        parsedValue[0].evaluate();
        var expectedArg = new classes.Var(classes.Num, 'a');
        expectedArg.setValue(new classes.Num(3));

        assert.ok(print.calledWith(expectedArg));
    });

    it('printing variables', function() {
        var print = this.sinon.stub(lib.operations, 'print');
        var parsedValue = parser.parse('START NUM x IS 1. DISPLAY x PLUS 12. HLT.');

        var varx = new classes.Var(classes.Num, 'x')
        varx.setValue(new classes.Num(1));
        expectedArg = new classes.Operation(lib.operations.plus, varx, new classes.Num(12));

        parsedValue[0].evaluate();

        assert.ok(print.calledWith(expectedArg));
    });
});
