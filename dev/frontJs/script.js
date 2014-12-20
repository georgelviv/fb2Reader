require(
    ['tools/jquery-1.11.1.min',
	'tools/jquery.fileupload',
	'settingsPanel',
	'preloader',
    'book'],
main);

function main(jquery, fileupload, settingsPanel, preloader, Book) {
	$(document).ready(function() {

		var book;
		var bookOption = {
			fileExtension: /(fb2|epub|txt)/i,
			bookDiv: $('#book')
		};

		showBookStorage();

		$('#upload-button').on('click', function() {
			$('.file_upload').trigger('click');
		});

		$('#ex-book').on('click', function(e) {
			e.preventDefault();
			$.get("/getexamplebook").done(function(data) {
				if (data !== 'false') {
					book = new Book(data);
					onBookGet(data);
				} else {
					setTimeout(getBook, 500);
				}
			}).fail(function() {
				bookOption.bookDiv.html('<div id="nobook">Error to get book</div>');
			});
			preloader.exampleParsing();
		});

		$('#fileselect').fileupload({
			url: '/upload',
			dataType: 'json',
			add: function(e, data) {
				var format;
				bookOption.bookDiv.html('');

				if (book) {
					$('body').trigger('addedBook');
				}

				bookOption.bookName = data.files[0].name;
				format = bookOption.bookName.split('.');
				format = format[format.length - 1];
				if (format.match(bookOption.fileExtension)) {
					data.submit();
					book = '';
				} else {
					bookOption.bookDiv.html('<div id="nobook">Wrong book format</div>');
				}
			},
			done: function (e, data) {
				$('.linehide').remove();
				$('#status').html('File loaded ' + data.result.files[0].name);
				setTimeout(getBook, 500);
			},
			progressall: preloader.progress
		});

		function getBook() {
				$.get("/getbook?bookName=" + bookOption.bookName).done(function(data) {
					if (data !== 'false') {
						book = new Book(data);
						onBookGet(data);
					} else {
						setTimeout(getBook, 500);
					}
				}).fail(function() {
					bookOption.bookDiv.html('<div id="nobook">Error to get book</div>');
				});
				preloader.parsing();
		}

		function onBookGet(data) {
			book.hideBoth();
			book.saveBookString(data);
			book.savePage(0);
			book.pageSet();
		}

		function showBookStorage() {
			var noBookHtml;
			if (!!localStorage && localStorage.getItem("book")){
				book = new Book(localStorage.getItem("book"));
				if (localStorage.getItem("scrollTop")) {
					if (book.isColumns) {
						book.lcolumn.scrollTop(localStorage.getItem("scrollTop"));
						book.rcolumn.scrollTop((book.lcolumn.scrollTop() + book.bookHeight) - book.fixScroll);
						book.pageSet();
						book.hideBoth();
					} else {
						book.bookDiv.scrollTop(localStorage.getItem("scrollTop"));
						book.pageSet();
						book.hideBoth();
					}
				}
			} else {
				noBookHtml = '<div id="nobook">No book to show, please upload book<br>';
				noBookHtml += ' or <a id="ex-book" href="#">Read Alice in Wonderland</a></div>';
				bookOption.bookDiv.html(noBookHtml);
			}
		}

	});
}





