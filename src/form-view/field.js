// var Backbone = require('backbone');
const { createEditor } = require('./editors');

const FieldView = Backbone.View.extend({
    className: 'form-group',
    attributes: {
        role: 'form-field',
    },
});

module.exports = FieldView;
