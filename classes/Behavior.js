class Behavior {

    constructor(statements, args) {
        this.statements = statements;
        this.args = args;
    }

    execute() {
        var obj = {};
        this.statements.forEach(function(statement) {
            statement.evaluate(obj);
        });
    }
}

module.exports = Behavior;
