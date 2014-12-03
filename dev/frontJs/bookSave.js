define(['tools/jquery-1.11.1.min'], function() {
	var bookSave = {
		save: saveBookStorage,
		savePage: saveCurrenPosition,
		show: showBookStorage,
		keyPress: keyPressEvent
	};

	return bookSave;
});

function saveBookStorage(data) {
	if (!!localStorage && data) {
		localStorage.setItem("book", data);
	}
}
function saveCurrenPosition(scrollTop) {
	if (!!localStorage && scrollTop) {
		localStorage.setItem("scrollTop", scrollTop);
	}
}
function showBookStorage() {
	if (!!localStorage && localStorage.getItem("book")){
		document.body.addEventListener('keydown', keyPressEvent);
		$('#book').html(localStorage.getItem("book"));
		if (localStorage.getItem("scrollTop")) {
			$('#book').scrollTop(localStorage.getItem("scrollTop"));
		}
	}
}

function keyPressEvent(e) {
	var bookScroll = $('#book')[0].scrollHeight;
	var bookHeight = $('#book').height();
	var pages = Math.ceil(bookScroll / bookHeight, bookHeight);

	if (e.keyCode == 39) {
		$('#book').scrollTop($('#book').scrollTop() + (bookHeight - 5));
		book.pageSave($('#book').scrollTop());
	}
	if (e.keyCode == 37) {
		$('#book').scrollTop($('#book').scrollTop() - (bookHeight - 5));
		book.pageSave($('#book').scrollTop());
	}
}