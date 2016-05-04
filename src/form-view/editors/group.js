const BaseEditor = require('./base');

const GroupEditor = BaseEditor.extend({
    tagName: 'div',
    className: 'checks-group',
});

module.exports = GroupEditor;
