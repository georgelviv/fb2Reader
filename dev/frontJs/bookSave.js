define(['tools/jquery-1.11.1.min'], function(jquery) {
	var bookSave = {
		save: saveBookStorage,
		savePage: saveCurrenPosition,
		keyPress: keyPressEvent,
		showNextPage: showNextPage,
		showPrevPage: showPrevPage
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
			book.showNextPage();
		}
		if (e.keyCode == 37) {
			book.showPrevPage();
		}
	}

	function showNextPage() {
		$('.linehide').remove();
		if (this.isColumns) {
			this.lcolumn.scrollTop(this.lcolumn.scrollTop() + ((this.bookHeight * 2) - 60));
			this.rcolumn.scrollTop((this.lcolumn.scrollTop() + this.bookHeight) - 30);
			hideAndPage(this, this.lcolumn.scrollTop());
		} else {
			this.bookDiv.scrollTop(this.bookDiv.scrollTop() + this.bookHeight - 30);
			hideAndPage(this, this.bookDiv.scrollTop());
		}
	}

	function showPrevPage() {
		$('.linehide').remove();
		if (this.isColumns) {
			this.lcolumn.scrollTop(this.lcolumn.scrollTop() - ((this.bookHeight * 2) - 60));
			this.rcolumn.scrollTop((this.lcolumn.scrollTop() + this.bookHeight) - 30);
			hideAndPage(this, this.lcolumn.scrollTop());
		} else {
			this.bookDiv.scrollTop(this.bookDiv.scrollTop() - this.bookHeight - 30);
			hideAndPage(this, this.bookDiv.scrollTop());
		}
	}

	function hideAndPage(book, scroll) {
		book.hideBoth();
		book.pageSet();
		book.savePage(scroll);
	}
});





