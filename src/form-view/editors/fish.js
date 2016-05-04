
const FishEditor = Backbone.View.extend({
    tagName: 'div',
    className: 'fish-component',

    initialize(options = {}, configs = {}) {
    },

    getValue() {
    },

    getOutputValue() {
    },

    setValue(value) {
        return this;
    },

    // 返回校验结果
    reportValidity() {
        return true;
    },
});

module.exports = FishEditor;
