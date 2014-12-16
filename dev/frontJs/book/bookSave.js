define(['tools/jquery-1.11.1.min'], function(jquery) {
	var bookSave = {
		save: saveBookStorage,
		savePage: saveCurrenPosition,
		initKeyNav: initKeyNav,
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
			this.savePage(this.lcolumn.scrollTop());
		} else {
			$('.linehide').remove();
			this.bookDiv.scrollTop(this.bookHeight * (goPage - 1));
			this.hideBoth();
			this.pageSet();
			this.savePage(this.bookDiv.scrollTop());
		}
	}

	function reInitPage() {
		this.bookHeight = this.bookDiv.height();
		this.rcolumn.scrollTop((this.lcolumn.scrollTop() + this.bookHeight) - 30);
		this.pageSet();
	}

	function initKeyNav() {
		var self = this;
		document.body.addEventListener('keyup', keyEvent);
		document.getElementById('book-page').addEventListener('keyup', goToEv);
		document.getElementById('button-next').addEventListener('click', nextPgEv);
		document.getElementById('button-prev').addEventListener('click', prevPgEv);

		function keyEvent(e) {
			if (e.keyCode == 39) {
				self.showNextPage();
			}
			if (e.keyCode == 37) {
				self.showPrevPage();
			}
		}

		function nextPgEv(e) {
			self.showNextPage();
		}

		function prevPgEv(e) {
			self.showPrevPage();
		}

		function goToEv(e) {
			if (e.keyCode == 13) {
				self.gotoPage();
			}
		}

		$('body').on('addedBook', function() {
			document.body.removeEventListener('keyup', keyEvent);
			document.getElementById('book-page').removeEventListener('keyup', goToEv);
			document.getElementById('button-next').removeEventListener('click', nextPgEv);
			document.getElementById('button-prev').removeEventListener('click', prevPgEv);
		});
	}
});





