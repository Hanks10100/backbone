const { CheckboxEditor, RadioEditor } = require('./checks');
const { InputEditor, TextareaEditor } = require('./input');
const { SelectEditor } = require('./select');


// 创建编辑器视图的工厂函数
function createEditor(options = {}, configs = {}) {
    var Editor = InputEditor;
    switch (options.type) {
        case 'checkbox':     Editor = CheckboxEditor;    break;
        case 'radio':        Editor = RadioEditor;       break;
        case 'select':       Editor = SelectEditor;      break;
        case 'textarea':     Editor = TextareaEditor;    break;
    }
    return new Editor(options, configs);
}

module.exports = {
    createEditor,
}
