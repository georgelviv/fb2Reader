define(function() {
	var bookFullScreen = {
		initFullScreen: initFullScreen
	};

	return bookFullScreen;

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
				$('body').trigger('fsChange');
				reInitPage();
				self.fSDiv.find('i').toggleClass('fa-arrows-alt');
				self.fSDiv.find('i').toggleClass('fa-compress');
			}, 180);
		}

		function reInitPage() {
			self.bookHeight = self.bookDiv.height();
			self.fixedHeight = self.bookHeight - self.fixScroll;
			if (self.isTwoColumn) {
				self.rcolumn.scrollTop(self.lcolumn.scrollTop() + self.fixedHeight);
				self.pages = Math.ceil((self.scrollHeight) / (self.fixedHeight * 2));
			} else {
				self.pages = Math.ceil(self.scrollHeight / self.fixedHeight);
			}
			self.hideElements();
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
			self.mainDiv.append('<div id="fullScreenBtn"><i class="fa fa-arrows-alt"></i></div>');
			self.fSDiv = $('#fullScreenBtn');
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
});