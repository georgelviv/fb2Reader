define(['hidingElements', 'bookSave', 'bookFullScreen'], function(hidingElements, bookSave, bookFullScreen) {
	function Book(bookString) {
		this.bookString = bookString;
		this.bookDiv = $('#book');
		this.bookPageDiv = $('#book-page');
		this.mainDiv = $('#main');
		this.bookHeight = $('#book').height();
		this.isColumns = chekForColumns(this);
	}

	Book.prototype.hideEl = hidingElements.hide;
	Book.prototype.hideBoth = hidingElements.hideBoth;
	Book.prototype.pageSet = bookSave.pageSet;
	Book.prototype.showNextPage = bookSave.showNextPage;
	Book.prototype.showPrevPage = bookSave.showPrevPage;
	Book.prototype.initKeyNav = bookSave.initKeyNav;
	Book.prototype.saveBookString = bookSave.save;
	Book.prototype.savePage = bookSave.savePage;
	Book.prototype.gotoPage = bookSave.gotoPage;
	Book.prototype.initFullScreen = bookFullScreen.initFullScreen;
	Book.prototype.reInitPage = bookSave.reInitPage;

	return Book;
});


function chekForColumns(book) {
	var content = '';
	if (book.bookDiv.width() > 1000) {
		content = '<div class="bookcolumn" id="lcolumn" style="padding-right:20px">' + book.bookString +'</div>';
		content += '<div class="bookcolumn" id="rcolumn" style="padding-left:20px">' + book.bookString + '</div>';
		book.bookDiv.html(content);
		book.lcolumn = $('#lcolumn');
		book.rcolumn = $('#rcolumn');
		book.rcolumn.scrollTop(book.bookHeight - 30);
		book.rcolumn.append('<div id="lastp" style="height:' + book.bookDiv.height() + 'px;">');
		book.scrollHeight = book.lcolumn[0].scrollHeight;
		book.pages = Math.ceil((book.scrollHeight / book.bookHeight) / 2);
		book.initKeyNav();
		book.pageSet();
		book.initFullScreen();
		return true;
	}
	book.bookDiv.html(book.bookString);
	book.scrollHeight = book.bookDiv[0].scrollHeight;
	book.pages = Math.ceil(book.scrollHeight / book.bookHeight);
	book.initKeyNav();
	book.pageSet();
	return false;
}






