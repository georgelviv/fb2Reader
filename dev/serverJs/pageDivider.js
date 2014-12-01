var exports = module.exports = {};

exports.dividePage = function(htmlString) {
	var textWithoutTeg = htmlString.replace(/<.*?>/gi, '');
	return textWithoutTeg.slice(0, textWithoutTeg / 1500);
};