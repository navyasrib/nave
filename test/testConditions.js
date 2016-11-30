const pwd = process.cwd();
const classes = require(pwd + '/classes');
var parser = require(pwd + '/Parser.js');
var lib = require(pwd + '/lib');
const assert = require('assert');
const sinon = require('sinon');

describe("conditional operators", function() {
    it("evaluate block if true", function() {
        var print = this.sinon.stub(lib.operations, 'print');
        var parsed = parser.parse('INCASE TRUE START DISPLAY 1. HLT.');
        parsed[0].evaluate();
        var expectedArg = new classes.Num(1);

        assert.ok(print.calledWith(expectedArg));
    });

    it("evaluate block with truthy statement", function() {
        var print = this.sinon.stub(lib.operations, 'print');
        var parsed = parser.parse('INCASE 2 GREATERTHAN 1 START DISPLAY 1. HLT.');
        parsed[0].evaluate();
        var expectedArg = new classes.Num(1);

        assert.ok(print.calledWith(expectedArg));
    });

    it("evaluate block with falsey statement", function() {
        var print = this.sinon.stub(lib.operations, 'print');
        var parsed = parser.parse('INCASE 2 LESSTHAN 1 START DISPLAY 1. HLT.');
        parsed[0].evaluate();

        assert.ok(print.notCalled);
    });

    it("evaluate block with truthy statement with variables", function() {
        var print = this.sinon.stub(lib.operations, 'print');
        var parsed = new classes.Behavior(parser.parse('NUM a IS 2. NUM b IS 2. INCASE a EQUALS b START DISPLAY 1. HLT.'));
        parsed.evaluate();
        var expectedArg = new classes.Num(1);

        assert.ok(print.called);
    });
});
