require(
    [
        'tools/jquery-1.11.1.min',
        'tools/jquery.fileupload',
        'settingsPanel'
    ],
main);

function main() {
	$(document).ready(function() {

		var book = {
			fileExtension: /(fb2|epub|txt)/i,
			showBook: showBookStorage,
			saveBook: saveBookStorage,
			pageSave: saveCurrenPosition
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
				document.body.removeEventListener('keydown', keyPressEvent);
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
					document.body.addEventListener('keydown', keyPressEvent);
				}
			}).fail(function() {
				console.log('Error with getting book');
			});
			$('#status').html('Parsing ' + book.bookName);
		}

		function keyPressEvent(e) {
			var bookScroll = $('#book')[0].scrollHeight;
			var bookHeight = $('#book').height();
			var pages = Math.ceil(bookScroll / bookHeight, bookHeight);

			if (e.keyCode == 39) {
				$('#book').scrollTop($('#book').scrollTop() + (bookHeight - 5));
				saveCurrenPosition($('#book').scrollTop());
			}
			if (e.keyCode == 37) {
				$('#book').scrollTop($('#book').scrollTop() - (bookHeight - 5));
				book.pageSave($('#book').scrollTop());
			}
		}

		function saveBookStorage(data) {
			if (!!localStorage && data) {
				localStorage.setItem("book", data);
			}
		}
		function saveCurrenPosition(scrollTop) {
			if (!!localStorage && scrollTop) {
				localStorage.setItem("scrollTop", scrollTop);
			}
		}
		function showBookStorage() {
			if (!!localStorage && localStorage.getItem("book")){
				document.body.addEventListener('keydown', keyPressEvent);
				$('#book').html(localStorage.getItem("book"));
				if (localStorage.getItem("scrollTop")) {
					$('#book').scrollTop(localStorage.getItem("scrollTop"));
				}
			}
		}

	});

}