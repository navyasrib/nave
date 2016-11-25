class Operation {
    constructor(operation, argument) {
        this.operation = operation;
        this.args = argument;
    }

    evaluate() {
        this.operation(this.argument.evaluate())
    }
}

module.exports = Operation;
