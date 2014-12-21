define(['tools/intro.js'], function(introJs) {
	var bookProgress = {
		setProgress: setProgress
	};
	return bookProgress;

	function setProgress() {
		var self = this;
		var introHtml = '<a href="#"><i class="fa fa-info"></i></a>';
		var infoDiv = $('#info');

		$('#info').html(introHtml);

		$('#info').on('click', function() {
			startTour();
		});

		function startTour() {
			console.log('inited');
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

/*
this.pages всі стррінки
this.currentPage поточна
*/

function setProgress(progress)
{           
    var progressBarWidth =progress*$(".container").width()/ 100;  
    $(".progressbar").width(progressBarWidth).html(progress + "% ");
}