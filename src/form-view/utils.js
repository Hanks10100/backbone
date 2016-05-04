
// 将数组均匀的扩展到指定的长度
function resizeArray(array, length) {
    const ratio =  (array.length - 1) / (length - 1);
    const result = [];
    for (var i = 0; i < length; ++i) {
        result[i] = array[Math.round(i*ratio)];
    }
    return result;
}


// 将列布局数字转换成栅格布局的类名
function convertToClass(str, withOffset = false) {
    if (!_.isString(str)) return '';

    const prefix = ['col-xs-', 'col-sm-', 'col-md-', 'col-lg-'];
    const offset = withOffset ? 'offset-' : '';
    return _.map(resizeArray(str.split(/[\,\-\s]+/), 4), (n, i) => {
        return prefix[i] + offset + String(parseInt(n, 10));
    }).join(' ');
}


// 自动生成 bootstrap 栅格布局的类名
function getColumnClass(configs = {}) {
    const columnClass = convertToClass(configs.col || '12');
    const offsetClass = convertToClass(configs.offset, true);
    return (columnClass + ' ' + offsetClass).trim();
}


// 校验标签是否为表单元素
const formElementReg = /input|select|textarea/i;
function isFormElement(element) {
    return _.isElement(element) && formElementReg.test(element.tagName);
}


module.exports = {
    resizeArray,
    convertToClass,
    getColumnClass,
    isFormElement,
}
