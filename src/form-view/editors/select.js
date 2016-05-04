const BaseEditor = require('./base');

const SelectEditor = BaseEditor.extend({
    tagName: 'select',
    initialize(options = {}, configs = {}) {
        this.options = _.result(options, 'options');
        _.each(this.options, (opt, index) => {
            this.$el.append(
                $('<option></option>')
                    .prop('selected', !!opt.selected)
                    .attr('value', opt.value)
                    .attr('title', opt.text)
                    .html(opt.text)
            );
        });
        return this;
    },

    getOutputValue: function() {
        const value = this.getValue();
        const res = _.find(this.options, opt => opt.value === value);
        return res ? res.text : '';
    },
});

module.exports = {
    SelectEditor,
}
