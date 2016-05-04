const BaseEditor = require('./base');

const InputEditor = BaseEditor.extend({
    tagName: 'input',
});

const TextareaEditor = BaseEditor.extend({
    tagName: 'textarea',
});

module.exports = {
    InputEditor,
    TextareaEditor,
}
