require(
    [
        'tools/jquery-1.11.1.min',
        'tools/jquery.fileupload',
        'bookSave',
        'settingsPanel'
    ],
main);

function main(jquery, fileupload, bookSave, settingsPanel) {
	$(document).ready(function() {

		var book = {
			fileExtension: /(fb2|epub|txt)/i,
			showBook: bookSave.show,
			saveBook: bookSave.save,
			pageSave: bookSave.savePage,
			keyPress: bookSave.keyPress
		};

		book.showBook();

		$('#fileselect').fileupload({
			url: '/upload',
			dataType: 'json',
			add: function(e, data) {
				var format;
				book.bookName = data.files[0].name;
				format = book.bookName.split('.');

				format = format[format.length - 1];
				if (format.match(book.fileExtension)) {
					data.submit();
				} else {
					console.log('error format');
				}
			},
			done: function (e, data) {
				$('#status').html('File loaded ' + data.result.files[0].name);
				book.getDataInterval = setInterval(getBook, 500);
				document.body.removeEventListener('keydown', book.keyPress);
			},
			progressall: function(e, data) {
				var progress = parseInt(data.loaded / data.total * 100, 10);
				$('#status').html('Loading ' + progress);
				$('#book').html('');
			}
		});

		function getBook() {
			$.get("/getbook?bookName=" + book.bookName).done(function(data) {
				if (data !== 'false') {
					$('#book').html(data);
					book.saveBook(data);
					$('#status').html('Ready ' + book.bookName);
					clearInterval(book.getDataInterval);
					document.body.addEventListener('keydown', book.keyPress);
				}
			}).fail(function() {
				console.log('Error with getting book');
			});
			$('#status').html('Parsing ' + book.bookName);
		}

	});

}