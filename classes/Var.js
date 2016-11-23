class Var {
    constructor(type, identifier) {
        this.identifier = identifier;
        this.type = type;
        this.value = undefined;
    }

    isOfType(other) {
        return other instanceof Var && other.type == this.type;
    }

    setValue(value) {
        this.value = value;
    }
}

module.exports = Var;
