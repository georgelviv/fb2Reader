define(['tools/jquery-1.11.1.min', 'hidingElements'], function(jquery, elementHide) {
	var hideEl = elementHide.hide;
	var hideBoth = elementHide.hideBoth;
	var bookDiv = $('#book');
		
	var bookSave = {
		save: saveBookStorage,
		savePage: saveCurrenPosition,
		show: showBookStorage,
		keyPress: keyPressEvent,
		hideElement: hideEl
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
	function showBookStorage() {
		if (!!localStorage && localStorage.getItem("book")){
			document.body.addEventListener('keydown', keyPressEvent);
			bookDiv.html(localStorage.getItem("book"));
			if (localStorage.getItem("scrollTop")) {
				bookDiv.scrollTop(localStorage.getItem("scrollTop"));
				hideAndPage();
			}
		}
	}

	function keyPressEvent(e) {
		var bookScroll = bookDiv[0].scrollHeight;
		var bookHeight = bookDiv.height();
		var pages = Math.ceil(bookScroll / bookHeight, bookHeight);
		$('.linehide').remove();

		if (e.keyCode == 39) {
			bookDiv.scrollTop(bookDiv.scrollTop() + bookHeight);
			saveCurrenPosition(bookDiv.scrollTop());
			hideAndPage();
		}
		if (e.keyCode == 37) {
			bookDiv.scrollTop(bookDiv.scrollTop() - bookHeight);
			saveCurrenPosition(bookDiv.scrollTop());
			hideAndPage();
		}
	}

	function pageSet() {
		var bookScroll = bookEl.bookDiv[0].scrollHeight;
		var bookHeight = bookEl.bookDiv.height();
		var pages = Math.ceil(bookScroll / bookHeight, bookHeight);
		var currentPage = Math.ceil(bookDiv.scrollTop() / bookHeight) + 1;
		$('#book-page').find('a').html(currentPage + " / " + pages);
	}

	function hideAndPage() {
		hideBoth();
		pageSet();
	}
});





