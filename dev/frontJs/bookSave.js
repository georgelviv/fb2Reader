define(['tools/jquery-1.11.1.min'], function(jquery) {
	var bookSave = {
		save: saveBookStorage,
		savePage: saveCurrenPosition,
		keyPress: keyPressEvent,
		showNextPage: showNextPage,
		showPrevPage: showPrevPage,
		pageSet: pageSet,
		gotoPage: gotoPage,
		reInitPage: reInitPage
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
	function pageSet() {
		var currentPage;
		if (this.isColumns) {
			currentPage = Math.ceil(this.lcolumn.scrollTop() / (this.bookHeight * 2)) + 1;
		} else {
			currentPage = Math.ceil(this.bookDiv.scrollTop() /  this.bookHeight) + 1;
		}
		this.bookPageDiv.find('input').val(currentPage);
		this.bookPageDiv.find('span').html(' / ' + this.pages);
	}

	function gotoPage() {
		var goPage = Math.max(1, Math.min(this.pages, this.bookPageDiv.find('input').val()));
		if (isNaN(goPage)) return this.pageSet();
		if (this.isColumns) {
			$('.linehide').remove();
			this.lcolumn.scrollTop(this.bookHeight * ((goPage - 1) * 2));
			this.rcolumn.scrollTop((this.lcolumn.scrollTop() + this.bookHeight) - 30);
			this.hideBoth();
			this.pageSet();
		} else {
			$('.linehide').remove();
			this.bookDiv.scrollTop(this.bookHeight * (goPage - 1));
			this.hideBoth();
			this.pageSet();
		}
		
	}
	function reInitPage() {
		this.bookHeight = this.bookDiv.height();
		this.rcolumn.scrollTop((this.lcolumn.scrollTop() + this.bookHeight) - 30);
	}
});





