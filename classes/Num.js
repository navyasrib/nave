class Num {
    constructor(value) {
        this.value = Number(value);
    }

    toString() {
        return this.value;
    }

    plus(numeral) {
        return new Num(this.value + numberal.value);
    }

    minus(numberal) {
        return new Num(this.value - numberal.value);
    }

    amplify(numberal) {
        return new Num(this.value * numberal.value);
    }

    simplify(numberal) {
        return new Num(this.value / numberal.value);
    }

    greaterThan(numberal) {
        return new Boolean(this.value > numberal.value);
    }

    lessThan(numberal) {
        return new Boolean(this.value < numberal.value);
    }

    equals(numberal) {
        return new Boolean(this.value === numeral.value);
    }
}

module.exports = Num;
