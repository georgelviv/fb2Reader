$(document).ready(function() {

	$('#fileselect').fileupload({
		url: '/upload',
		dataType: 'json',
			done: function (e, data) {
			console.log('yes');
		}
	});


});
