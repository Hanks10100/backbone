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

});

module.exports = FormView;
