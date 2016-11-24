const Bool = require('./Bool');

class Num {
    constructor(value) {
        this.value = Number(value);
    }

    toString() {
        return this.value;
    }

    plus(numeral) {
        return new Num(this.value + numeral.value);
    }

    minus(numeral) {
        return new Num(this.value - numeral.value);
    }

    amplify(numeral) {
        return new Num(this.value * numeral.value);
    }

    simplify(numeral) {
        return new Num(this.value / numeral.value);
    }

    greaterThan(numeral) {
        return new Bool(this.value > numeral.value);
    }

    lessThan(numeral) {
        return new Bool(this.value < numeral.value);
    }

    equals(numeral) {
        return new Bool(this.value === numeral.value);
    }

    negate() {
        return new Num(-this.value);
    }
}

module.exports = Num;
