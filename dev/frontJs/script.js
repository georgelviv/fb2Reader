require(
    [
        'tools/jquery-1.11.1.min',
        'tools/jquery.fileupload',
        'settingsPanel',
        'preloader',
        'book'
    ],
main);

function main(jquery, fileupload, settingsPanel, preloader, Book) {
	$(document).ready(function() {

		var book;
		var bookOption = {
			fileExtension: /(fb2|epub|txt)/i,
			bookDiv: $('#book')
		};

		showBookStorage();
		goToEvent();
		navigateButtons();


		$('#fileselect').fileupload({
			url: '/upload',
			dataType: 'json',
			add: function(e, data) {
				var format;
				bookOption.bookDiv.html('');
				if (book) {
					document.body.removeEventListener('keyup', keyEvent);
					$('#button-prev').unbind();
					$('#button-next').unbind();
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
				bookOption.getDataInterval = setInterval(getBook, 500);
			},
			progressall: preloader.progress
		});

		function getBook() {
			$.get("/getbook?bookName=" + bookOption.bookName).done(function(data) {
				if (data !== 'false') {
					book = new Book(data);
					onBookGet(data);
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
			clearInterval(bookOption.getDataInterval);
			document.body.addEventListener('keyup', keyEvent);
			navigateButtons();
		}

		function keyEvent(e) {
			book.keyPress(e, book);
		}

		function goToEvent() {
			$('#book-page').find('input').keypress(function(e) {
				if(e.which == 13) {
					if (book) {
						book.gotoPage();
					}
				}
			});
		}

		function navigateButtons() {
			if (book) {
				$('#button-prev').on('click', function() {
					book.showPrevPage();
				});
				$('#button-next').on('click', function() {
					book.showNextPage();
				});
			}
		}

		function showBookStorage() {
			if (!!localStorage && localStorage.getItem("book")){
				book = new Book(localStorage.getItem("book"));
				if (localStorage.getItem("scrollTop")) {
					if (book.isColumns) {
						book.lcolumn.scrollTop(localStorage.getItem("scrollTop"));
						book.rcolumn.scrollTop((book.lcolumn.scrollTop() + book.bookHeight) - 50);
						book.pageSet();
						book.hideBoth();
					} else {
						book.bookDiv.scrollTop(localStorage.getItem("scrollTop"));
						book.pageSet();
						book.hideBoth();
					}
				}
				document.body.addEventListener('keyup', keyEvent);
			} else {
				bookOption.bookDiv.html('<div id="nobook">No book to show, please upload book</div>');
			}
		}

	});
}





