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
});

module.exports = {
    SelectEditor,
}
