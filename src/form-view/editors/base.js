
const BaseEditor = Backbone.View.extend({
    tagName: 'input',
    className: 'form-control',
    attributes: {
        role: 'field-editor',
    },

    getValue() {
        return this.$el.val();
    },

    // 获取用于显示的表单值字符串
    getOutputValue() {
        return String(this.getValue());
    },

    setValue(value) {
        this.$el.val(value);
        return this;
    },

    // 返回校验结果
    reportValidity() {
        return true;
    },
});

module.exports = BaseEditor;
