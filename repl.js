const repl = require('repl');
const parser = require('./Parser.js')

function myEval(cmd, context, filename, callback) {
    try {
      var tree = parser.parse(cmd);
      var output = tree[0].evaluate();
    } catch(err) {
      return callback(new repl.Recoverable(err));
    }
    callback(null, output);
}

var start = repl.start({
    prompt: 'nave > ',
    eval: myEval
});

start.on('exit',function(){
  console.log('Did you like nave....????');
  process.exit();
});
