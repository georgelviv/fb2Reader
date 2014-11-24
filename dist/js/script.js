$(document).ready(function() {

	var fileExtension = 'fb2',
		bookName;

	$('#fileselect').fileupload({
		url: '/upload',
		dataType: 'json',
		add: function(e, data) {
			var format;
			bookName = data.files[0].name;
			format = bookName.split('.');
			format = format[format.length - 1];
			if (format === fileExtension) {
				data.submit();
			} else {
				console.log('error format');
			}
		},
		done: function (e, data) {
			$('#status').html('File loaded ' + data.result.files[0].name);
			getBook();
		},
		progressall: function(e, data) {
			var progress = parseInt(data.loaded / data.total * 100, 10);
			$('#status').html('Loading ' + progress);
		}
	});

	function getBook() {
		$.get("/getbook?bookName=" + bookName).done(function( data ) {
				$('#book').html(data);
		}).fail(function() {
			alert( "error" );
		});
	}

});
