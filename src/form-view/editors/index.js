const FishEditor = require('./fish');
const { CheckboxEditor, RadioEditor } = require('./checks');
const { InputEditor, TextareaEditor } = require('./input');
const { SelectEditor } = require('./select');

function parseType(options = {}) {
    const type = options.type || options.name;
    const res = type.split('.');
    return {
        catagory: res.length > 1 ? res[0] : null,
        type: _.last(res).toLowerCase(),
    }
}

// 创建编辑器视图的工厂函数
function createEditor(options = {}, configs = {}) {
    const { catagory, type } = parseType(options);
    var Editor = InputEditor;
    switch (catagory) {
        case 'fish': Editor = FishEditor; break;

        case 'XTag':
            if (window.XTag) Editor = XTag.getComponent('x', catagory);
        break;

        default: switch (type) {
            case 'checkbox':     Editor = CheckboxEditor;    break;
            case 'radio':        Editor = RadioEditor;       break;
            case 'select':       Editor = SelectEditor;      break;
            case 'textarea':     Editor = TextareaEditor;    break;
        }
    }
    return new Editor(options, configs);
}

module.exports = {
    createEditor,
}
