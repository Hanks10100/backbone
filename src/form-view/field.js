// var Backbone = require('backbone');
const utils = require('./utils');
const { createEditor } = require('./editors');

const FieldView = Backbone.View.extend({
    className: 'form-group',
    attributes: {
        role: 'form-field',
    },

    // TODO: 添加更详细的表单项的 DOM 结构
    initialize: function(options, configs) {
        var name = options.name;
        this.type = options.type;
        this.$label = $('<label class="control-label"></label>')
            .attr('for', name)
            .attr('role', 'field-label')
            .html(options.label)
            .addClass(utils.getColumnClass({col: '4,3'}))

        this.editor = createEditor.apply(this, arguments);
        this.$editor = this.editor.$el;

        this.$output = $('<output class="field-output"></output>')
            .attr('role', 'field-output').hide();
        var $wrapper = $('<div></div>').addClass(utils.getColumnClass({col: '8,9'}));

        this.$el.attr('data-field', name);
        this.$el.append(this.$label, $wrapper.append(this.editor.$el, this.$output));
    },
});

module.exports = FieldView;
