
// 将数组均匀的扩展到指定的长度
function resizeArray(array, length) {
    var ratio =  (array.length - 1) / (length - 1);
    var result = [];
    for (var i = 0; i < length; ++i) {
        result[i] = array[Math.round(i*ratio)];
    }
    return result;
}


// 将列布局数字转换成栅格布局的类名
function convertToClass(str, withOffset) {
    if (!_.isString(str)) return '';

    var prefix = ['col-xs-', 'col-sm-', 'col-md-', 'col-lg-'];
    var offset = withOffset ? 'offset-' : '';
    return _.map(resizeArray(str.split(/[\,\-\s]+/), 4), function(n, i) {
        return prefix[i] + offset + String(parseInt(n, 10));
    }).join(' ');
}


// 自动生成 bootstrap 栅格布局的类名
function getColumnClass(configs) {
    var columnClass = convertToClass(_.result(configs, 'col') || '12');
    var offsetClass = convertToClass(_.result(configs, 'offset'), true);
    return (columnClass + ' ' + offsetClass).trim();
}


// 校验标签是否为表单元素
var formElementReg = /input|select|textarea/i;
function isFormElement(element) {
    return _.isElement(element) && formElementReg.test(element.tagName);
}


module.exports = {
    resizeArray,
    convertToClass,
    getColumnClass,
    isFormElement,
}
