$(document).ready(function() {

	var fileExtension = /(fb2|epub|txt)/i;
	var bookName;
	var getInterval;

	$('#fileselect').fileupload({
		url: '/upload',
		dataType: 'json',
		formData: {
			height: $('body').height(),
			width: $('body').width()
		},
		add: function(e, data) {
			var format;
			bookName = data.files[0].name;
			format = bookName.split('.');

			format = format[format.length - 1];
			if (format.match(fileExtension)) {
				data.submit();
			} else {
				console.log('error format');
			}
		},
		done: function (e, data) {
			$('#status').html('File loaded ' + data.result.files[0].name);
			getInterval = setInterval(getBook, 500);
		},
		progressall: function(e, data) {
			var progress = parseInt(data.loaded / data.total * 100, 10);
			$('#status').html('Loading ' + progress);
			$('#book').html('');
		}
	});

	function getBook() {
		$.get("/getbook?bookName=" + bookName).done(function(data) {
			if (data !== 'false') {
				$('#book').html(data);
				$('#status').html('Ready ' + bookName);
				clearInterval(getInterval);
				// gettingPage();
			}
		}).fail(function() {
			console.log('Error with getting book');
		});
		$('#status').html('Parsing ' + bookName);
	}

	function storageSave(data, item) {
		if (typeof(Storage) !== 'undefined') {
			localStorage.setItem(item, data);
		} else {
			console.log('Local Storega no support');
		}
	}

	function storageGet(item) {
		if (typeof(Storage) !== 'undefined') {
			return localStorage.getItem(item);
		} else {
			console.log('Local Storega no support');
		}
	}

	// function gettingPage() {
	// 	var lineHeight = ($('#book').css('font-size')).slice(0, -2) * 1.5;
	// 	var scrollHeight =  Math.floor($('#book').height() / lineHeight) * lineHeight;

	// 	$('#book img').height(Math.floor(Math.min(10, $('#book img').height() / lineHeight)) * lineHeight);
	// 	$('#book').height(Math.floor($('#book').height() / lineHeight) * lineHeight);


	// 	$('body')[0].onkeydown = function(e) {
	// 		if (e.keyCode == 39) {
	// 			$('#book').scrollTop($('#book').scrollTop() + scrollHeight);
				
	// 		}
	// 		if (e.keyCode == 37) {
	// 			$('#book').scrollTop($('#book').scrollTop() - scrollHeight);
	// 		}
	// 	};
	// }

});
