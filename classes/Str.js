class Str {
    constructor(value) {
        this.value = new String(value);
    }

    join(other) {
        return this.value.concat(other.value)
    }

    toString() {
        return this.value;
    }

    equals(other) {
        return new Boolean(this.value === other.value);
    }
}

module.exports = Str;

var trim = function(string) {
    return string.slice(1, string.length - 1);
};
