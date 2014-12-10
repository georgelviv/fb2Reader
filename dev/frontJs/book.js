define(['hidingElements', 'bookSave'], function(hidingElements, bookSave) {
	function Book(bookString) {
		this.bookString = bookString;
		this.bookDiv = $('#book');
		this.bookPageDiv = $('#book-page');
		this.bookHeight = $('#book').height();
		this.isColumns = chekForColumns(this);
	}

	Book.prototype.hideEl = hidingElements.hide;
	Book.prototype.hideBoth = hidingElements.hideBoth;
	Book.prototype.pageSet = pageSet;
	Book.prototype.showNextPage = bookSave.showNextPage;
	Book.prototype.showPrevPage = bookSave.showPrevPage;
	Book.prototype.keyPress = bookSave.keyPress;
	Book.prototype.saveBookString = bookSave.save;
	Book.prototype.savePage = bookSave.savePage;
	Book.prototype.gotoPage = gotoPage;

	return Book;
});


function chekForColumns(book) {
	var content = '';
	if (book.bookDiv.width() > 1000) {
		content = '<div class="bookcolumn" id="lcolumn">' + book.bookString +'</div>';
		content += '<div class="bookcolumn" id="rcolumn">' + book.bookString + '</div>';
		book.bookDiv.html(content);
		book.lcolumn = $('#lcolumn');
		book.rcolumn = $('#rcolumn');
		book.rcolumn.scrollTop(book.bookHeight - 30);
		book.rcolumn.append('<div style="height:' + book.bookDiv.height() + 'px;">');
		book.scrollHeight = book.lcolumn[0].scrollHeight;
		book.pages = Math.ceil((book.scrollHeight / book.bookHeight) / 2);
		return true;
	}
	book.bookDiv.html(book.bookString);
	book.scrollHeight = book.bookDiv[0].scrollHeight;
	book.pages = Math.ceil(book.scrollHeight / book.bookHeight);
	return false;
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


