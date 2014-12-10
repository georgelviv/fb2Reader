define(['tools/jquery-1.11.1.min'], function(jquery) {
	var bookSave = {
		save: saveBookStorage,
		savePage: saveCurrenPosition,
		keyPress: keyPressEvent
	};

	return bookSave;

	function saveBookStorage(data) {
		if (!!localStorage && data) {
			localStorage.setItem("book", data);
		}
	}
	function saveCurrenPosition(scrollTop) {
		if (!!localStorage) {
			localStorage.setItem("scrollTop", scrollTop);
		}
	}

	function keyPressEvent(e, book) {
		if (e.keyCode == 39) {
			$('.linehide').remove();
			if (book.isColumns) {
				book.lcolumn.scrollTop(book.lcolumn.scrollTop() + ((book.bookHeight * 2) - 60));
				book.rcolumn.scrollTop((book.lcolumn.scrollTop() + book.bookHeight) - 30);
				hideAndPage(book, book.lcolumn.scrollTop());
			} else {
				book.bookDiv.scrollTop(book.bookDiv.scrollTop() + book.bookHeight - 30);
				hideAndPage(book, book.bookDiv.scrollTop());
			}

		}
		if (e.keyCode == 37) {
			$('.linehide').remove();
			if (book.isColumns) {
				book.lcolumn.scrollTop(book.lcolumn.scrollTop() - ((book.bookHeight * 2) - 60));
				book.rcolumn.scrollTop((book.lcolumn.scrollTop() + book.bookHeight) - 30);
				hideAndPage(book, book.lcolumn.scrollTop());
			} else {
				book.bookDiv.scrollTop(book.bookDiv.scrollTop() - book.bookHeight - 30);
				hideAndPage(book, book.bookDiv.scrollTop());
			}
		}
	}

	function hideAndPage(book, scroll) {
		book.hideBoth();
		book.pageSet();
		book.savePage(scroll);
	}
});





