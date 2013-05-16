function Calculator(options) {
    options = options || {};
    this.modes = {};

    if(_.isArray(options.modes)) {
        options.modes.forEach(function(m) {
            var mode = availableModes[m];
            if(mode) {
                Calculator.addMode(m, mode);
                return;
            }
            throw('Mode '+m+' not found!');
        }.bind(this));
	}
}

Calculator.addMode = function(name, operations) {
    Object.keys(operations).forEach(function(o) {
        Calculator.prototype[o] = operations[o];
    });
};

Calculator.prototype.add = function(a, b) {
    return a + b;
};

Calculator.prototype.sub = function(a, b) {
    return a - b;
};

Calculator.prototype.mul = function(a, b) {
    return a * b;
};

Calculator.prototype.div = function(a, b) {
    return a / b;
};

var scientificMode = {
    sin: Math.sin,
    cos: Math.cos,
    square: function(input) {
    	return input*input;
    },
    sqrt: Math.sqrt
};

var availableModes = { 'scientific': scientificMode };


