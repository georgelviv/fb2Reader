require(
    [
        'tools/jquery-1.11.1.min',
        'tools/jquery.fileupload',
        'bookSave',
        'settingsPanel',
        'preloader'
    ],
main);

function main(jquery, fileupload, bookSave, settingsPanel, preloader) {
	$(document).ready(function() {

		var book = {
			fileExtension: /(fb2|epub|txt)/i,
			showBook: bookSave.show,
			saveBook: bookSave.save,
			pageSave: bookSave.savePage,
			keyPress: bookSave.keyPress,
			hideEl: bookSave.hideElement
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
				$('.linehide').remove();
				$('#status').html('File loaded ' + data.result.files[0].name);
				book.getDataInterval = setInterval(getBook, 500);
				document.body.removeEventListener('keydown', book.keyPress);
			},
			progressall: preloader.progress
		});

		function getBook() {
			$.get("/getbook?bookName=" + book.bookName).done(function(data) {
				if (data !== 'false') {
					$('#book').html(data);
					book.hideEl(false);
					book.saveBook(data);
					book.pageSave(0);
					clearInterval(book.getDataInterval);
					document.body.addEventListener('keydown', book.keyPress);
				}
			}).fail(function() {
				console.log('Error with getting book');
			});
			preloader.parsing();
		}

	});
}

