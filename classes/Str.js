class Str {
    constructor(value) {
        this.value = new String(value);
    }

    join(other) {
        return new Str(this.value.concat(other.value));
    }

    toString() {
        return this.value;
    }

    equals(other) {
        return new Boolean(this.value === other.value);
    }

    evaluate() {
        return this.value;
    }
}

module.exports = Str;
