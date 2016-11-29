class Behavior {

    constructor(statements, args) {
        this.statements = statements;
        this.args = args;
    }

    evaluate() {
        var obj = {};
        this.statements.forEach(function(statement) {
            statement.evaluate(obj);
        });
    }
}

module.exports = Behavior;
