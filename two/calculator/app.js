$(function() {

    var CalculatorModel = Backbone.Model.extend({
        initialize: function() {
            this.clear();
            this.set({
                input: null,
                operation: null,
                calculator: new Calculator({
                    modes: ["scientific"]
                })
            });
        },

        perform: function(nextOperation, a) {
            var input = this.get('input');
            var calc = this.get('calculator');
            var currentOperation = this.get('operation');
            this.set({ operation: nextOperation||currentOperation });

            if(!input) {
                this.set({ input: a });
                return;
            }

            try {
                this.set({ input: calc[currentOperation](input, a) });
            } catch(e) {
                throw("Operation "+currentOperation+" does not exist");
            }
        },

        clear: function() {
            this.set({
                input: null,
                operation: null
            });
        }
    });

    var CalculatorView = new (Backbone.View.extend({

        el: $("#calculator").get(0),

        model: new CalculatorModel,

        events: {
            "click .digits a": "addDigit",
            "click .clear a": "clear",
            "click .total a": "totalize",
            "click .operations a": "addOperation"
        },

        initialize: function() {
            this.listenTo(this.model, 'change:input', this.setInput);
        },

        setInput: function(a,b,c) {
            var val = b||a;
            this.$el.find('input').val(val);
            this.input = val;
        },

        getResult: function() {
            return this.get('result');
        },

        addDigit: function(e, b) {
            var digit = e.target.text;
            var input = this.getInput();
            
            if(!digit) return;

            if(!input) {
                this.setInput(digit);
            } else {
                this.setInput(input+''+digit);
            }
        },

        addOperation: function(e) {
            this.$el.find('.btn-info').removeClass('btn-info');
            this.operation = $(e.target).closest('li').attr('id');
            $(e.target).addClass('btn-info');
            this.totalize();
        },

        totalize: function() {
            if(!this.input) return;
            this.model.perform(this.operation, parseFloat(this.getInput()));
            this.input = null;
        },

        getInput: function() {
            return this.input;
        }

    }))();

});
