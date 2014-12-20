define(
	['book/hidingElements',
	'book/bookSave',
	'book/bookFullScreen',
	'book/bookSearch',
	'hint'],
	function(hidingElements, bookSave, bookFullScreen, bookSearch) {
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
	Book.prototype.initColumns = bookFullScreen.initColumns;
	Book.prototype.reInitPage = bookSave.reInitPage;
	Book.prototype.initSearch = bookSearch.initSearch;

	return Book;
});


function chekForColumns(book) {
	var content = '';
	if (book.bookDiv.width() > 800) {
		content = '<div class="bookcolumn" id="lcolumn" style="padding-right:20px">' + book.bookString +'</div>';
		content += '<div class="bookcolumn" id="rcolumn" style="padding-left:20px">' + book.bookString + '</div>';
		book.bookDiv.html(content);
		book.fixScroll = 30;
		book.lcolumn = $('#lcolumn');
		book.rcolumn = $('#rcolumn');
		book.rcolumn.scrollTop(book.bookHeight - book.fixScroll / 2);
		book.scrollHeight = book.lcolumn[0].scrollHeight;
		book.rcolumn.append('<div id="lastp" style="height:' + book.bookDiv.height() + 'px;">');
		book.pages = Math.ceil((book.scrollHeight) / ((book.bookHeight - book.fixScroll) * 2));
		book.initKeyNav();
		book.pageSet();
		book.initFullScreen();
		book.initSearch();
		book.initColumns();
		return true;
	}
	book.bookDiv.html(book.bookString);
	book.fixScroll = 30;
	book.scrollHeight = book.bookDiv[0].scrollHeight;
	book.pages = Math.ceil(book.scrollHeight / (book.bookHeight - book.fixScroll));
	book.initKeyNav();
	book.initFullScreen();
	book.initSearch();
	return false;
}




