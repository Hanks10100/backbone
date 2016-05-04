const BaseEditor = require('./base');

const InputEditor = BaseEditor.extend({
    tagName: 'input',

    getOutputValue: function() {
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
