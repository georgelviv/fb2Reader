$(document).ready(function() {

	var fileExtension = 'fb2';

	$('#fileselect').fileupload({
		url: '/upload',
		dataType: 'json',
		add: function(e, data) {
			var format = data.files[0].name.split('.');
			format = format[format.length - 1];
			if (format === fileExtension) {
				data.submit();
			} else {
				console.log('error format');
			}
		},
		done: function (e, data) {
			$('form').html('File loaded ' + data.result.files[0].name);
			getBook();
		},
		progressall: function(e, data) {
			var progress = parseInt(data.loaded / data.total * 100, 10);
			$('form').html('Loading ' + progress);
		}
	});

	function getBook() {
		console.log(2);
		$.get("/getbook").done(function( data ) {
				$('#book').html(data);
		}).fail(function() {
			alert( "error" );
		});
	}

});
