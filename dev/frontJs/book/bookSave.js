define(function() {
	var bookSave = {
		initSaving: initSaving
	};
	return bookSave;

	function initSaving() {
		if (!localStorage) return;
		var self = this;
		var savedScroll;
		var bookBytesLength = countBytes(this.bookString);

		if (bookBytesLength > 4000000) {
			console.log('Book size is too long to save to localStorage:' + bookBytesLength + ' bytes.');
			return ;
		}

		localStorage.setItem("book", this.bookString);


		if (localStorage.getItem("scrollTop")) {
			savedScroll = Number(localStorage.getItem("scrollTop"));
			if (this.isTwoColumn) {
				this.currentPage = Math.ceil((savedScroll + this.fixedHeight) / (this.fixedHeight * 2));
			} else {
				this.currentPage = Math.ceil((savedScroll + this.fixedHeight) /  this.fixedHeight);
			}
			this.gotoPage(this.currentPage);
		}

		$('body').on('pageChanged', function() {
			if (self.isTwoColumn) {
				localStorage.setItem("scrollTop", self.lcolumn.scrollTop());
			} else {
				localStorage.setItem("scrollTop", self.bookDiv.scrollTop());
			}
		});

		$('body').on('addedBook', function() {
			localStorage.setItem("scrollTop", 0);
		});
	}

	function countBytes(string) {
		return unescape( // convert a single `%xx` escape into the corresponding character
			encodeURI(string) // URL-encode the string (this uses UTF-8)
		).length; // read out the length (i.e. the number of `%xx` escapes)
	}

});

