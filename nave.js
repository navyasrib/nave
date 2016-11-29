const parser = require('./Parser');
const classes = require('./classes');
const fs = require('fs');

var text = fs.readFileSync(process.argv[2], 'utf8');
var parsed = parser.parse(text);
var tree = new classes.Behavior(parsed);

// console.log(tree)
tree.evaluate();
