const BaseEditor = require('./base');

const fieldOptions = ['name', 'type'];

const InputEditor = BaseEditor.extend({
    tagName: 'input',

    initialize(options, configs) {
        _.extend(this, _.pick(options, fieldOptions));
        this.$el.attr(_.pick(options, ['type', 'placeholder']));
        return this;
    },

    getOutputValue() {
        var outputValue = String(this.getValue());

        // TODO: 根据不同情况转义输出字符串
        switch (this.type) {
            case 'password': outputValue = outputValue.replace(/./g,'*');
        }

        return outputValue;
    },
});

const TextareaEditor = BaseEditor.extend({
    tagName: 'textarea',
});

module.exports = {
    InputEditor,
    TextareaEditor,
}
