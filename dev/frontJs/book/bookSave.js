define(function() {
	var bookSave = {
		initSaving: initSaving
	};
	return bookSave;

	function initSaving() {
		if (!localStorage) return;
		var self = this;
		var savedScroll;

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
});

