define(function() {
	var bookNavigation = {
		initNavigation: initNavigation,
		gotoPage: gotoPage
	};

	return bookNavigation;


	function gotoPage(num) {
		var goPage =  Math.max(1, Math.min(this.pages, num || this.bookPageDiv.find('input').val()));
		goPage -= 1;
		if (isNaN(goPage)) return pageSet();
		if (this.isTwoColumn) {
			this.lcolumn.scrollTop(this.fixedHeight * 2 * goPage);
			this.rcolumn.scrollTop(this.lcolumn.scrollTop() + this.fixedHeight);
			this.hideElements();
			this.scrollTop = this.lcolumn.scrollTop();
		} else {
			this.bookDiv.scrollTop(this.fixedHeight * goPage);
			this.hideElements();
			this.scrollTop = this.bookDiv.scrollTop();
		}
		$('body').trigger('pageChanged');
		this.currentPage = goPage + 1;
		this.bookPageDiv.find('input').val(this.currentPage);
	}

	function initNavigation() {
		var self = this;
		var htmlArrow = '<div id="button-prev"><i class="fa fa-chevron-left fa-2x">';
		htmlArrow += '</i></div><div id="button-next"><i class="fa fa-chevron-right fa-2x"></i></div>';
		var htmlPage = '<input type="text" style="width:' + (('' + self.pages).length * 8 + 17) +'px"><span></span>';
		this.bookPageDiv = $('#book-page');
		this.mainDiv.append(htmlArrow);
		this.bookPageDiv.html(htmlPage);

		this.bookPageDiv.find('input').val(this.currentPage);
		this.bookPageDiv.find('span').html(' / ' + this.pages);

		document.body.addEventListener('keyup', keyEvent);
		document.getElementById('book-page').addEventListener('keyup', goToEv);
		document.getElementById('button-next').addEventListener('click', nextPgEv);
		document.getElementById('button-prev').addEventListener('click', prevPgEv);

		function keyEvent(e) {
			if (e.keyCode == 39) {
				self.gotoPage(self.currentPage + 1);
			}
			if (e.keyCode == 37) {
				self.gotoPage(self.currentPage - 1);
			}
		}

		function nextPgEv(e) {
			self.gotoPage(self.currentPage + 1);
		}

		function prevPgEv(e) {
			self.gotoPage(self.currentPage - 1);
		}

		function goToEv(e) {
			if (e.keyCode == 13) {
				self.gotoPage();
			}
		}

		$('body').on('columnInit fsChange', function() {
			self.bookPageDiv.find('span').html(' / ' + self.pages);
			self.bookPageDiv.find('input').val(self.currentPage);
		});

		$('body').on('changeStyles', function() {
			if (self.isTwoColumn) {
				self.initTwoColumn();
			} else {
				self.initOneColumn();
			}
		});

		$('body').on('addedBook', function() {
			document.body.removeEventListener('keyup', keyEvent);
			document.getElementById('book-page').removeEventListener('keyup', goToEv);
			document.getElementById('button-next').removeEventListener('click', nextPgEv);
			document.getElementById('button-prev').removeEventListener('click', prevPgEv);
			setTimeout(function() {
				$('#button-next').remove();
				$('#button-prev').remove();
				$('#book-page').html('');
			}, 50);
		});
	}
});
