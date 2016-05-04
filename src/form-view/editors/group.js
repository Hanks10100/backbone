const BaseEditor = require('./base');

const groupOptions = ['name', 'type'];

const GroupEditor = BaseEditor.extend({
    tagName: 'div',
    className: 'checks-group',

    initialize(options = {}, configs = {}) {
        _.extend(this, _.pick(options, groupOptions));

        this.fields = [];
        this.options = _.result(options, 'options');
        _.each(this.options, opt => {
            const $editor = this.createEditor(opt);
            this.fields.push($editor);
            this.$el.append(
                $('<label class="checks-label"></label>')
                    .append($editor)
                    .append($('<span></span>').html(opt.label))
            );
        });
        return this;
    },

    createEditor(options = {}) {
        return $('<input>')
            .attr(_.pick(this, ['type', 'name']))
            .data('editor-value', options.value)
            .data('editor-label', options.label);
    },

    // 获取已经选中的编辑项
    _getValueArray() {
        return _.chain(this.fields)
            .filter($input => $input.is(':checked'))
            .map($input => $input.data('editor-value'))
            .value()
    },

    // 获取选中编辑项的文字
    getOutputValue() {
        return _.chain(this.fields)
            .filter($input => $input.is(':checked'))
            .map($input => '<span>' + $input.data('editor-label') + '</span>')
            .value()
            .join('<i class="spliter"></i>')
    },
});

module.exports = GroupEditor;
