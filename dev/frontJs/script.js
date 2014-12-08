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
			hideEl: bookSave.hideElement,
			bookDiv: $('#book')
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
					onBookGet(data);
				}
			}).fail(function() {
				console.log('Error with getting book');
			});
			preloader.parsing();
		}

		function onBookGet(data) {
			if (chekForColumns()) {
				$('#lcolumn').html(data);
				$('#rcolumn').html(data).scrollTop($('#lcolumn').height() - 30);
				$('#rcolumn').append('<div style="height:' + book.bookDiv.height() + 'px;">');
				book.hideEl(false, $('#lcolumn'));
				book.hideEl(false, $('#rcolumn'));
				book.hideEl(true, $('#rcolumn'));
			} else {
				book.bookDiv.html(data);
				book.hideEl(false, book.bookDiv);
			}
			book.saveBook(data);
			book.pageSave(0);
			pageSet();
			clearInterval(book.getDataInterval);
			document.body.addEventListener('keydown', book.keyPress);
		}

		function pageSet() {
			var bookScroll, bookHeight, pages;
			if ($('#lcolumn')[0]) {
				bookScroll = $('#lcolumn')[0].scrollHeight;
				bookHeight = $('#lcolumn').height();
				pages = Math.ceil((bookScroll / bookHeight) / 2);
			} else {
				bookScroll = book.bookDiv[0].scrollHeight;
				bookHeight = book.bookDiv.height();
				pages = Math.ceil(bookScroll / bookHeight);
			}
			$('#book-page').find('a').html("1 / " + pages);
		}

		function chekForColumns() {
			if (book.bookDiv.width() > 1000) {
				book.bookDiv.html('<div class="bookcolumn" id="lcolumn"></div><div class="bookcolumn" id="rcolumn" ></div>');
				return true;
			}
			return false;
		}

	});
}



