const repl = require('repl');
const parser = require('./Parser.js')

// const myTranslator = new Translator('en', 'fr');

function myEval(cmd, context, filename, callback) {
    var tree = parser.parse(cmd);
    callback(null, tree.evaluate());
    // callback(null, myTranslator.translate(cmd));
}

repl.start({
    prompt: '> ',
    eval: myEval
});
