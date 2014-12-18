define(
	['tools/jquery-1.11.1.min'],
	function(jquery) {
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
		if (this.isColumns) {
			this.lcolumn.scrollTop(this.lcolumn.scrollTop() + ((this.bookHeight * 2) - this.fixScroll));
			this.rcolumn.scrollTop((this.lcolumn.scrollTop() + this.bookHeight) - (this.fixScroll) / 2);
			hideAndPage(this, this.lcolumn.scrollTop());
		} else {
			this.bookDiv.scrollTop(this.bookDiv.scrollTop() + (this.bookHeight - this.fixScroll));
			hideAndPage(this, this.bookDiv.scrollTop());
		}
	}

	function showPrevPage() {
		if (this.isColumns) {
			this.lcolumn.scrollTop(this.lcolumn.scrollTop() - ((this.bookHeight * 2) - this.fixScroll));
			this.rcolumn.scrollTop((this.lcolumn.scrollTop() + this.bookHeight) - (this.fixScroll) / 2);
			hideAndPage(this, this.lcolumn.scrollTop());
		} else {
			this.bookDiv.scrollTop(this.bookDiv.scrollTop() - (this.bookHeight - this.fixScroll));
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
		var fixedHeight = this.bookHeight - this.fixScroll;
		if (this.isColumns) {
			currentPage = Math.ceil((this.lcolumn.scrollTop() + fixedHeight) / (fixedHeight * 2));
		} else {
			currentPage = Math.ceil((this.bookDiv.scrollTop() + fixedHeight) /  fixedHeight);
		}
		this.bookPageDiv.find('input').val(currentPage);
		this.bookPageDiv.find('span').html(' / ' + this.pages);
	}

	function gotoPage(num) {
		var goPage = num || Math.max(1, Math.min(this.pages, this.bookPageDiv.find('input').val()));
		goPage -= 1;
		if (isNaN(goPage)) return this.pageSet();
		if (this.isColumns) {
			this.lcolumn.scrollTop(((this.bookHeight - this.fixScroll) * 2 * goPage));
			this.rcolumn.scrollTop((this.lcolumn.scrollTop() + this.bookHeight) - (this.fixScroll) / 2);
			this.hideBoth();
			this.pageSet();
			this.savePage(this.lcolumn.scrollTop());
		} else {
			fixScroll = this.fixScroll * goPage;
			this.bookDiv.scrollTop((this.bookHeight - this.fixScroll) * goPage);
			this.hideBoth();
			this.pageSet();
			this.savePage(this.bookDiv.scrollTop());
		}
	}

	function reInitPage() {
		this.bookHeight = this.bookDiv.height();
		if (this.isColumns) {
			this.rcolumn.scrollTop((this.lcolumn.scrollTop() + this.bookHeight) - (this.fixScroll) / 2);
		}
		this.pageSet();
	}

	function initKeyNav() {
		var self = this;
		var htmlArrow = '<div id="button-prev"><i class="fa fa-chevron-left fa-2x">';
		htmlArrow += '</i></div><div id="button-next"><i class="fa fa-chevron-right fa-2x"></i></div>';
		var htmlPage = '<input type="text"><span></span>';
		self.mainDiv.append(htmlArrow);
		$('#book-page').html(htmlPage);
 
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
			setTimeout(function() {
				$('#button-next').remove();
				$('#button-prev').remove();
				$('#book-page').html('');
			}, 50);
		});
	}
});





