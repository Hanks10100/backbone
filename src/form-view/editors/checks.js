const GroupEditor = require('./group');

const CheckboxEditor = GroupEditor.extend({
    className: 'field-group checkbox-group',

    getValue() {
        return this._getValueArray();
    },

    setValue(valueArray) {
        _.each(this.fields, $editor => {
            const value = $editor.data('editor-value');
            $editor.prop('checked', _.indexOf(valueArray, value) !== -1);
        });
        return this;
    },
});

const RadioEditor = GroupEditor.extend({
    className: 'field-group radio-group',

    getValue() {
        return _.first(this._getValueArray());
    },

    setValue(value) {
        _.each(this.fields, $editor => {
            $editor.prop('checked', $editor.data('editor-value') === value);
        });
        return this;
    },
});

module.exports = {
    CheckboxEditor,
    RadioEditor,
}
