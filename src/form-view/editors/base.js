
const BaseEditor = Backbone.View.extend({
    tagName: 'input',
    className: 'form-control',
    attributes: {
        role: 'field-editor',
    },
});

module.exports = BaseEditor;
