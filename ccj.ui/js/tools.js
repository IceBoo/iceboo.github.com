// 在Function原型上添加函数
Function.prototype.addMethod = function(name, fn) {
	this.prototype[name] = fn;
}

// 字符串转化为整数,参数可选：指定需要保留n位小数
String.addMethod('toNumber', function(n) {
	var num = parseFloat(this);
	return n ? num.toFixed(n) : num;
})

