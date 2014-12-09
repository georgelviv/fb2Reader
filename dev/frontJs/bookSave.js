define(['tools/jquery-1.11.1.min', 'hidingElements'], function(jquery, elementHide) {
	var hideEl = elementHide.hide;
	var hideBoth = elementHide.hideBoth;
	var book = {
		bookDiv: $('#book')
	};
		
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
			document.body.addEventListener('keyup', keyPressEvent);
			if (chekForColumns()) {
				$("#lcolumn").html(localStorage.getItem("book"));
				$('#rcolumn').html(localStorage.getItem("book")).scrollTop($('#lcolumn').height() - 50);
				$('#rcolumn').append('<div style="height:' + book.bookDiv.height() + 'px;">');
				book.bookHeight = $('#lcolumn').height() * 2;
				book.bookScroll = $('#lcolumn')[0].scrollHeight;
				if (localStorage.getItem("scrollTop")) {
					$("#lcolumn").scrollTop(localStorage.getItem("scrollTop"));
					$("#rcolumn").scrollTop(($("#lcolumn").scrollTop() + $('#lcolumn').height()) - 50);
					hideAndPage();
				}
			} else {
				book.bookDiv.html(localStorage.getItem("book"));
				book.bookHeight = book.bookDiv.height();
				book.bookScroll = book.bookDiv[0].scrollHeight;
				if (localStorage.getItem("scrollTop")) {
					book.bookDiv.scrollTop(localStorage.getItem("scrollTop"));
					hideAndPage();
				}
			}
		} else {
			book.bookDiv.html('<div id="nobook">No book to show, please upload book</div>');
		}
	}

	function keyPressEvent(e) {
		if (e.keyCode == 39) {
			$('.linehide').remove();
			if ($('#lcolumn')[0]) {
				$("#lcolumn").scrollTop($("#lcolumn").scrollTop() + ((book.bookHeight * 2) - 60));
				$("#rcolumn").scrollTop(($("#lcolumn").scrollTop() + book.bookHeight) - 30);
				saveCurrenPosition($('#lcolumn').scrollTop());
				hideAndPage();
			} else {
				book.bookDiv.scrollTop(book.bookDiv.scrollTop() + book.bookHeight - 30);
				saveCurrenPosition(book.bookDiv.scrollTop());
				hideAndPage();
			}

		}
		if (e.keyCode == 37) {
			$('.linehide').remove();
			if ($('#lcolumn')[0]) {
				$("#lcolumn").scrollTop($("#lcolumn").scrollTop() - ((book.bookHeight * 2) - 60));
				$("#rcolumn").scrollTop(($("#lcolumn").scrollTop() + book.bookHeight) - 30);
				saveCurrenPosition($('#lcolumn').scrollTop());
				hideAndPage();
			} else {
				book.bookDiv.scrollTop(book.bookDiv.scrollTop() - book.bookHeight - 30);
				saveCurrenPosition(book.bookDiv.scrollTop());
				hideAndPage();
			}
		}
	}

	function pageSet() {
		var pages, currentPage;
		if ($('#lcolumn')[0]) {
			pages = Math.ceil(book.bookScroll / book.bookHeight);
			currentPage = Math.ceil(($('#lcolumn').scrollTop() / book.bookHeight) + 1);
		} else {
			pages = Math.ceil(book.bookScroll /  book.bookHeight);
			currentPage = Math.ceil(book.bookDiv.scrollTop() /  book.bookHeight) + 1;
		}
		$('#book-page').find('a').html(currentPage + " / " + pages);
	}

	function hideAndPage() {
		console.time('1');
		hideBoth();
		console.timeEnd('1');
		console.time('2');
		pageSet();
		console.timeEnd('2');
	}
	function chekForColumns() {
		if (book.bookDiv.width() > 1000) {
			book.bookDiv.html('<div class="bookcolumn" id="lcolumn"></div><div class="bookcolumn" id="rcolumn" ></div>');
			return true;
		}
		return false;
	}
});





