define(['tools/intro.js'], function(introJs) {
	var bookIntro = {
		initIntro: initIntro
	};
	return bookIntro;

	function initIntro() {
		var self = this;
		var introHtml = '<a href="#"><i class="fa fa-info"></i></a>';
		var infoDiv = $('#info');

		$('#info').html(introHtml);

		$('#info').on('click', function() {
			startTour();
		});

		function startTour() {
			var tour = introJs();
			tour.setOption('tooltipPosition', 'auto');
			tour.setOption('positionPrecedence', ['left', 'right', 'bottom', 'top']);
			tour.start();
		}

		$('body').on('addedBook', function() {
			$('#info').html('');
		});
	}
});