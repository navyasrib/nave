class Operation {
    constructor(...args) {
        this.operation = args[0];
        this.args = args.slice(1);
    }

    evaluate() {
        return this.operation.apply({}, this.args.map((d) => d.value || d.evaluate()));
    }
}

module.exports = Operation;
