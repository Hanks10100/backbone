
const InputEditor = Framework.View.extend({
    tagName: 'input',
});

const TextareaEditor = EditorView.extend({
    tagName: 'textarea',
});

module.exports = {
    InputEditor,
    TextareaEditor,
}
