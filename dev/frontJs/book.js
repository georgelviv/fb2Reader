define(
	['book/bookColumn',
	'book/bookHide',
	'book/bookNavigation',
	'book/bookFullScreen',
	'book/bookSearch',
	'book/bookSave',
	'book/bookIntro',
	'book/bookProgress'],
	function(bookColumn, bookHide, bookNavigation, bookFullScreen, bookSearch, bookSave, bookIntro, bookProgress) {
	function Book(bookString) {
		this.bookString = bookString;
		this.bookDiv = $('#book');
		this.mainDiv = $('#main');
		this.userHeight = $('#book').height();
		this.userWidth = $('#book').width() > 800;
		this.isMobile = $('#book').width() < 600;
		this.fixScroll = 5 + Number($('#book').css('lineHeight').slice(0, -2));
		initBook(this);
	}

	Book.prototype.initOneColumn = bookColumn.initOneColumn;
	Book.prototype.initColumnButtons = bookColumn.initColumnButtons;
	Book.prototype.initTwoColumn = bookColumn.initTwoColumn;
	Book.prototype.hideElements = bookHide.hideElements;
	Book.prototype.initNavigation = bookNavigation.initNavigation;
	Book.prototype.gotoPage = bookNavigation.gotoPage;
	Book.prototype.initFullScreen = bookFullScreen.initFullScreen;
	Book.prototype.initSaving = bookSave.initSaving;
	Book.prototype.initSearch = bookSearch.initSearch;
	Book.prototype.initIntro = bookIntro.initIntro;
	Book.prototype.setProgress = bookProgress.setProgress;


	return Book;
});

function initBook(book) {
	var self = book;
	self.fixedHeight = self.userHeight - self.fixScroll;
	self.currentPage = 1;
	if (self.userWidth) {
		self.initTwoColumn(true);
		self.initColumnButtons();
	} else {
		self.initOneColumn(true);
	}
	self.bookDiv.find('a:not([href^=http])').contents().unwrap();
	self.initFullScreen();
	self.initNavigation();
	self.initSaving();
	self.initSearch();
	self.initIntro();
	self.setProgress();
}
