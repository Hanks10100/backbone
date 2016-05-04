// var Backbone = require('backbone');
const utils = require('./utils');
const { createEditor } = require('./editors');

const fieldOptions = ['name', 'type'];

const FieldView = Backbone.View.extend({
    className: 'form-group',
    attributes: {
        role: 'form-field',
    },

    // TODO: 添加更详细的表单项的 DOM 结构
    initialize(options, configs) {
        const { name, type, label } = options;
        _.extend(this, _.pick(options, fieldOptions));

        this.$label = $('<label class="control-label"></label>')
            .attr({
                'for': name,
                'role': 'field-label',
            })
            .addClass(utils.getColumnClass({col: '4,3'}))
            .html(label)

        this.editor = createEditor(options, configs);
        this.$editor = this.editor.$el;

        this.$output = $('<output class="field-output"></output>')
            .attr('role', 'field-output')
            .hide();

        const $wrapper = $('<div></div>')
            .addClass(utils.getColumnClass({col: '8,9'}))
            .append(this.$editor, this.$output);

        this.$el.attr('data-field', name).append(this.$label, $wrapper);
    },

    // 使表单元素转为普通的输出元素
    freeze: function() {
        this.$editor.hide();
        this.$output.html(this.editor.getOutputValue()).show();
        return this;
    },

    // 使表单的静态输出转为可编辑元素
    unfreeze: function() {
        this.$editor.show();
        this.$output.empty().hide();
        return this;
    },
});

module.exports = FieldView;
