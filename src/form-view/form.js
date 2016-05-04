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
        var self = this;
        this.$el.append(_.map(this.schema, function(fieldset, index) {
            return $('<fieldset class="row"></fieldset>')
                .attr('data-row', index + 1)
                .append(_.map(fieldset, function(schema, key) {
                    var $wrapper = $('<div></div>').addClass(utils.getColumnClass(schema));
                    const field = self.createField(key, schema);
                    return $wrapper.append(field.el);
                }));
        }));
    },

    createField: function(key, schema) {
        this.fields = this.fields || {};

        var field = new FieldView(_.extend({ name: key }, schema));
        this.fields[key] = field;

        return field;
    },
});

module.exports = FormView;
