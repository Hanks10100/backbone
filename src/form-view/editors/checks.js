const GroupEditor = require('./group');

const CheckboxEditor = GroupEditor.extend({
    className: 'field-group checkbox-group',
});

const RadioEditor = GroupEditor.extend({
    className: 'field-group radio-group',
});

module.exports = {
    CheckboxEditor,
    RadioEditor,
}
