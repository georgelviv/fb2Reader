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
			if (chekForColumns()) {
				$("#lcolumn").html(localStorage.getItem("book"));
				$('#rcolumn').html(localStorage.getItem("book")).scrollTop($('#lcolumn').height() - 50);
				$('#rcolumn').append('<div style="height:' + bookDiv.height() + 'px;">');
				if (localStorage.getItem("scrollTop")) {
					$("#lcolumn").scrollTop(localStorage.getItem("scrollTop"));
					$("#rcolumn").scrollTop(($("#lcolumn").scrollTop() + $('#lcolumn').height()) - 50);
					hideAndPage();
				}
			} else {
				bookDiv.html(localStorage.getItem("book"));
				if (localStorage.getItem("scrollTop")) {
					bookDiv.scrollTop(localStorage.getItem("scrollTop"));
					hideAndPage();
				}
			}
		}
	}

	function keyPressEvent(e) {
		var bookHeight;
		if ($('#lcolumn')) {
			bookHeight = $('#lcolumn').height();
		} else {
			bookHeight = bookDiv.height();
		}
		$('.linehide').remove();

		if (e.keyCode == 39) {
			if ($('#lcolumn')[0]) {
				$("#lcolumn").scrollTop($("#lcolumn").scrollTop() + ((bookHeight * 2) - 50));
				$("#rcolumn").scrollTop(($("#lcolumn").scrollTop() + bookHeight) - 30);
				saveCurrenPosition($('#lcolumn').scrollTop());
				hideAndPage();
			} else {
				bookDiv.scrollTop(bookDiv.scrollTop() + bookHeight);
				saveCurrenPosition(bookDiv.scrollTop());
				hideAndPage();
			}

		}
		if (e.keyCode == 37) {
			if ($('#lcolumn')[0]) {
				$("#lcolumn").scrollTop($("#lcolumn").scrollTop() - ((bookHeight * 2) - 50));
				$("#rcolumn").scrollTop(($("#lcolumn").scrollTop() + bookHeight) - 30);
				saveCurrenPosition($('#lcolumn').scrollTop());
				hideAndPage();
			} else {
				bookDiv.scrollTop(bookDiv.scrollTop() - bookHeight);
				saveCurrenPosition(bookDiv.scrollTop());
				hideAndPage();
			}
		}
	}

	function pageSet() {
		var bookScroll, bookHeight, pages, currentPage;
		if ($('#lcolumn')[0]) {
			bookScroll = $('#lcolumn')[0].scrollHeight;
			bookHeight = $('#lcolumn').height();
			pages = Math.ceil((bookScroll / bookHeight) / 2);
			currentPage = Math.ceil((($('#lcolumn').scrollTop() / 2) / bookHeight) + 1);
		} else {
			bookScroll = bookDiv[0].scrollHeight;
			bookHeight = bookDiv.height();
			pages = Math.ceil(bookScroll / bookHeight, bookHeight);
			currentPage = Math.ceil(bookDiv.scrollTop() / bookHeight) + 1;
		}
		$('#book-page').find('a').html(currentPage + " / " + pages);
	}

	function hideAndPage() {
		hideBoth();
		pageSet();
	}
	function chekForColumns() {
		if (bookDiv.width() > 1000) {
			bookDiv.html('<div class="bookcolumn" id="lcolumn"></div><div class="bookcolumn" id="rcolumn" ></div>');
			return true;
		}
		return false;
	}
});





