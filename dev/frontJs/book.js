define(['hidingElements', 'bookSave'], function(hidingElements, bookSave) {
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
	Book.prototype.keyPress = bookSave.keyPress;
	Book.prototype.saveBookString = bookSave.save;
	Book.prototype.savePage = bookSave.savePage;
	Book.prototype.gotoPage = bookSave.gotoPage;
	Book.prototype.initFullScreen = initFullScreen;
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
		book.rcolumn.append('<div style="height:' + book.bookDiv.height() + 'px;">');
		book.scrollHeight = book.lcolumn[0].scrollHeight;
		book.pages = Math.ceil((book.scrollHeight / book.bookHeight) / 2);
		book.initFullScreen();
		return true;
	}
	book.bookDiv.html(book.bookString);
	book.scrollHeight = book.bookDiv[0].scrollHeight;
	book.pages = Math.ceil(book.scrollHeight / book.bookHeight);
	return false;
}

function initFullScreen() {
	if (
		document.fullscreenEnabled ||
		document.webkitFullscreenEnabled ||
		document.mozFullScreenEnabled ||
		document.msFullscreenEnabled
	) {
		var self = this;
		self.mainDiv.append('<div id="fullScreenBtn"><i class="fa fa-arrows-alt"></i></div>');
		
		document.getElementById('fullScreenBtn').onclick = function() {
			if (
				document.fullscreenElement ||
				document.webkitFullscreenElement ||
				document.mozFullScreenElement ||
				document.msFullscreenElement
			) {
				if (document.exitFullscreen) {
					document.exitFullscreen();
					onChangeFull();
				} else if (document.webkitExitFullscreen) {
					document.webkitExitFullscreen();
					onChangeFull();
				} else if (document.mozCancelFullScreen) {
					document.mozCancelFullScreen();
					onChangeFull();
				} else if (document.msExitFullscreen) {
					document.msExitFullscreen();
					onChangeFull();
				}
			
			}
			else {
				if (self.mainDiv[0].requestFullscreen) {
					self.mainDiv[0].requestFullscreen();
					onChangeFull();
				} else if (self.mainDiv[0].webkitRequestFullscreen) {
					self.mainDiv[0].webkitRequestFullscreen();
					onChangeFull();
				} else if (self.mainDiv[0].mozRequestFullScreen) {
					self.mainDiv[0].mozRequestFullScreen();
					onChangeFull();
				} else if (self.mainDiv[0].msRequestFullscreen) {
					self.mainDiv[0].msRequestFullscreen();
					onChangeFull();
				}
			
			}
		};

	}
	function onChangeFull(iconClass) {
		$('.linehide').remove();
		setTimeout(function() {
			self.reInitPage();
			self.hideBoth();
			$('#fullScreenBtn').find('i').toggleClass('fa-arrows-alt');
			$('#fullScreenBtn').find('i').toggleClass('fa-compress');
		}, 150);
	}
}


