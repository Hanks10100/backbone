// var Backbone = require('backbone');
const utils = require('./utils');
const FieldView = require('./field');
const ButtonGroupView = require('./buttons');

const formEvents = {
    'submit form': 'handleSubmit',
    'focus [role="field-editor"]': 'handleFocus',
};

const FormView = Backbone.View.extend({
    schema: [],

    _setElement: function(el) {
        this.$el = el instanceof Backbone.$ ? el : Backbone.$(el);
        this.el = this.$el[0];
        this.$form = this._createFormElement();
        this.$el.html(this.$form);
        this.events = _.extend({}, this.events, formEvents);
    },

    // 添加表单的内容
    _createFormElement() {
        return $('<form class="form-horizontal container-fluid"></form>')
            .attr({
                enctype: 'multipart/form-data',
            })
            .append(_.map(this.schema, (fieldset, index) =>
                $('<fieldset class="row"></fieldset>')
                    .attr('data-row', index + 1)
                    .append(_.map(fieldset, (options, key) =>
                        $('<div></div>')
                            .addClass(utils.getColumnClass(options))
                            .append(this.createField(key, options).el)
                    ))
            ));
    },

    createField(key, options = {}, configs = {}) {
        _.extend(options, { name: key });
        if (key === 'buttons') {
            const buttonGroup = new ButtonGroupView(options, configs);
            return buttonGroup;
        } else {
            const field = new FieldView(options, configs);

            this.fields = this.fields || {};
            this.fields[key] = field;
            return field;
        }

    },

    getValue(key) {
        const fields = this.fields;
        return _.isUndefined(key)
            ? _.mapObject(fields, field => field.editor.getValue())
            : _.has(fields, key)
                ? fields[key].editor.getValue()
                : null
    },

    // 设置表单的值，merge 表示是否采用合并的方式设置值
    setValue(key, value, merge) {
        var maps = {};
        if (_.isString(key)) {
            maps[key] = value;
            merge = true;
        } else if (_.isObject(key)) {
            maps = key;
            merge = !!value;
        }

        _.each(this.fields, (field, key) => {
            if (!merge || _.has(maps, key)) {
                field.editor.setValue(maps[key]);
            }
        });

        return this;
    },

    // 获取某表单域的编辑器
    getEditor(name) {
        return _.result(this.fields[name], 'editor');
    },

    handleSubmit(event) {
        event.stopPropagation();
        event.preventDefault();
        this.submit();
        return this;
    },

    handleFocus(event) {
        // 表单域 focus 时，去除校验的提示信息
        this.showValidateTips(false);
        return this;
    },

    // 使表单元素转为普通的输出元素
    freeze() {
        this.$form.addClass('freeze');
        _.each(this.fields, field => field.freeze());
        return this;
    },

    // 使表单的静态输出转为可编辑元素
    unfreeze() {
        this.$form.removeClass('freeze');
        _.each(this.fields, field => field.unfreeze());
        return this;
    },

    // 校验表单数据
    validate(showTips) {
        return _.every(this.fields, field => field.validate(showTips));
    },

    // 可以显示或关闭校验提示信息
    showValidateTips(show) {
        _.each(this.fields, field => field.showValidateTips(show));
        return this;
    },

    // 提交表单数据
    submit() {
        if (this.validate()) {
            // TODO: 返回原生的 FormData 对象
            const formData = this.getValue();
            this.onSubmit(formData);
            this.trigger('submit', formData);
        } else {
            this.showValidateTips();
        }
        return this;
    },

    // 真正的提交表单数据，应该由子类视图实现
    onSubmit(formData) {},

});

module.exports = FormView;
