var assert = require('assert');

function Foo(i) {
    this.bar = i;
}

// Create five existing objects
var foos = [0,1,2,3,4].map(function(i) {
    return new Foo(i);
});

try {
    // getBar does not exist ...
    foos[0].getBar();
} catch(e) {
    // ... so let's define it
    Foo.prototype.getBar = function() {
        return this.bar;
    }
}

// Create a new object
foos.push(new Foo(5));

// Test existing and new objects all have getBar
foos.forEach(function(foo, i) {
    assert.equal(foo.getBar(), i);
});