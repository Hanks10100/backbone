
const BaseEditor = Backbone.View.extend({
    tagName: 'input',
    className: 'form-control',
    attributes: {
        role: 'field-editor',
    },

    getValue() {
        return this.$el.val();
    },

    setValue(value) {
        this.$el.val(value);
        return this;
    },
});

module.exports = BaseEditor;
