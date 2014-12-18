define(
	['tools/jquery-1.11.1.min'],
	function(jquery) {
	var fullSreen = {
		fSEvent: fSEvent,
		initFullScreen: initFullScreen
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

});