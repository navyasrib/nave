class Bool {
    constructor(bool) {
        this.value = new Boolean(bool);
    }

    equals(other) {
        return new Bool(this.value == other.value)
    }
}

module.exports = Bool
