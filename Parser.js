var jison = require("jison").Parser;
var grammer = require('fs').readFileSync('./grammar.jison', 'utf8');

class Parser {
    constructor(grammer) {
        this.parser = new jison(grammer)
    }

    parse(exp) {
        return this.parser.parse(exp);
    }
}

module.exports = new Parser(grammer);
