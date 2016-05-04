// var Backbone = require('backbone');
const utils = require('./utils');
const FieldView = require('./field');

const FormView = Backbone.View.extend({
    tagName: 'form',
    className: 'form-horizontal container-fluid',
    attributes: {
        enctype: 'multipart/form-data',
    },
    events: {
        'submit': 'submit',
        'focus [role="form-editor"]': 'handleFocus',
    },
    schema: [],

    // 重写父类接口，初始化表单内容
    setElement(element) {
        if (/form/i.test(element.tagName)) {
            this.undelegateEvents();
            this._setElement(element);
            this._initFieldElement();
            this.delegateEvents();
        } else {
            // console.warn('element must be a FormElement.');
        }
        return this;
    },

    // 添加表单的内容
    _initFieldElement() {
        this.$el.append(_.map(this.schema, (fieldset, index) =>
            $('<fieldset class="row"></fieldset>')
                .attr('data-row', index + 1)
                .append(_.map(fieldset, (schema, key) =>
                    $('<div></div>')
                        .addClass(utils.getColumnClass(schema))
                        .append(this.createField(key, schema).el)
                ))
        ));
    },

    createField(key, schema) {
        const options = _.extend({ name: key }, schema);
        const field = new FieldView(options);

        this.fields = this.fields || {};
        this.fields[key] = field;

        return field;
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

    // 使表单元素转为普通的输出元素
    freeze() {
        _.each(this.fields, field => field.freeze());
        return this;
    },

    // 使表单的静态输出转为可编辑元素
    unfreeze() {
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
    submit(callback, onerror) {
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
