const BaseEditor = require('./base');

const SelectEditor = BaseEditor.extend({
    tagName: 'select',
});

module.exports = {
    SelectEditor,
}
