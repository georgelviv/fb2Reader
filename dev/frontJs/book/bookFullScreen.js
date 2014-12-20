define(
	['tools/jquery-1.11.1.min'],
	function(jquery) {
	var fullSreen = {
		fSEvent: fSEvent,
		initFullScreen: initFullScreen,
		initColumns: initSColumns
	};

	return fullSreen;

	function fSEvent(self) {
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
		function onChangeFull(iconClass) {
			$('.linehide').remove();
			setTimeout(function() {
				self.reInitPage();
				self.hideBoth();
				self.fSDiv.find('i').toggleClass('fa-arrows-alt');
				self.fSDiv.find('i').toggleClass('fa-compress');
			}, 180);
		}
	}

	function initFullScreen() {
		var self = this;
		if (
			document.fullscreenEnabled ||
			document.webkitFullscreenEnabled ||
			document.mozFullScreenEnabled ||
			document.msFullscreenEnabled
		) {
			if (!self.fSDiv) {
				self.mainDiv.append('<div id="fullScreenBtn"><i class="fa fa-arrows-alt"></i></div>');
				self.fSDiv = $('#fullScreenBtn');
			}
			self.fSDiv[0].addEventListener('click', clickFSEvent);
		}
		function clickFSEvent(e) {
			fSEvent(self);
		}
		$('body').on('addedBook', function() {
			self.fSDiv[0].removeEventListener('click', clickFSEvent);
			self.fSDiv.remove();
		});
	}

	function initSColumns() {
		var self = this;
		var scolumnDiv = $('#book-scolumn');
		var columnsHtml = '<div class="switch"><div class="count"><input type="radio" name="scolumn"';
		columnsHtml += ' id="s-one-column"><label for="s-one-column">One</label></div><div class="count">';
		columnsHtml += '<input type="radio" name="scolumn" id="s-two-column" checked><label';
		columnsHtml += ' for="s-two-column">Two</label></div></div>';

		scolumnDiv.html(columnsHtml);

		$('#s-one-column, #s-two-column').change(function() {
			if ($('#s-one-column:checked').val()) {
				initOneColumn(self);
			} else {
				initTwoColumn(self);
			}
		});

		$('body').on('addedBook', function() {
			scolumnDiv.html('');
		});
	}

	function initOneColumn(self) {
		var currentPage = self.lcolumn.scrollTop();
		self.bookDiv.html(self.bookString);
		self.scrollHeight = self.bookDiv[0].scrollHeight;
		self.bookDiv.scrollTop(currentPage);
		self.pages = Math.ceil(self.scrollHeight / (self.bookHeight - self.fixScroll));
		self.isColumns = false;
		self.pageSet();
		self.hideBoth();
	}
	function initTwoColumn(self) {
		var content = '';
		var currentPage = self.bookDiv.scrollTop();
		content = '<div class="bookcolumn" id="lcolumn" style="padding-right:20px">' + self.bookString +'</div>';
		content += '<div class="bookcolumn" id="rcolumn" style="padding-left:20px">' + self.bookString + '</div>';
		self.bookDiv.html(content);
		self.isColumns = true;
		self.lcolumn = $('#lcolumn');
		self.rcolumn = $('#rcolumn');
		self.lcolumn.scrollTop(currentPage);
		self.rcolumn.scrollTop((self.lcolumn.scrollTop() + self.bookHeight) - self.fixScroll);
		self.scrollHeight = self.lcolumn[0].scrollHeight;
		self.rcolumn.append('<div id="lastp" style="height:' + self.bookDiv.height() + 'px;">');
		self.pages = Math.ceil((self.scrollHeight) / ((self.bookHeight - self.fixScroll) * 2));
		self.pageSet();
		self.hideBoth();
	}

});