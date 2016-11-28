const pwd = process.cwd();
const classes = require(pwd + '/classes');
var parser = require(pwd + '/Parser.js');
var lib = require(pwd + '/lib');
const assert = require('assert');
const sinon = require('mocha-sinon');


describe('test execution', function() {
    it('1 plus 2 should give 3', function() {
        var parsedValue = parser.parse('START NUM a IS 1 PLUS 2. DISPLAY a. HLT.');
        this.sinon.stub(console, 'log');
        parsedValue.execute();
        assert.ok(console.log.calledWith(3));
    });
});
