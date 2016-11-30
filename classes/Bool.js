class Bool {
    constructor(bool) {
        this.value = bool;
    }

    equals(other) {
        return this.value === other.value;
    }

    evaluate() {
        return this;
    }

    toString(){
      return this.value;
    }
}

module.exports = Bool
