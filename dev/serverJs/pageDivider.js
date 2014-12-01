<<<<<<< HEAD
var exports = module.exports = {};

exports.dividePage = function(htmlString) {
	var textWithoutTeg = htmlString.replace(/<.*?>/gi, '');
	return textWithoutTeg.slice(0, textWithoutTeg / 1500);
=======
var exports = module.exports = {};

exports.dividePage = function(htmlString) {
	var textWithoutTeg = htmlString.replace(/<.*?>/gi, '');
	return textWithoutTeg.slice(0, textWithoutTeg / 1500);
>>>>>>> f0c05408982cc2ba59e9d12952fa7120847dc2c4
};