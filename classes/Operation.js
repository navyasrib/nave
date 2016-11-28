class Operation {
    constructor(...args) {
        this.operation = args[0];
        this.args = args.slice(1);
    }

    evaluate(object) {
        return this.operation.apply(object, this.args);
    }
}

module.exports = Operation;
