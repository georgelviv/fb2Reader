define( function() {
	var bookProgress = {
		setProgress: setProgress
	};
	return bookProgress;
	
	function setProgress() {
		var self = this;
		var progresDiv = $('#progres');
		var progressBarWidth =Math.ceil(progress*$(".container").width()/ 100);
		var progress = this.currentPage * 100 / this.pages ;
		var progressHtml = '<div class="container"><div id="progressbar" width="' + progressBarWidth +'px">';
		progressHtml += '<span class="label">' + progress.toPrecision(4) + '% </span></div></div>';
		
		
		progresDiv.append(progressHtml);


		function changeProgress(){
			var progress = self.currentPage * 100 / self.pages;
			var progressBarWidth =Math.ceil(progress * $(".container").width()/ 100);
			$("#progressbar").width(progressBarWidth);
			$(".label").css("left", progress < 97 ? progressBarWidth : progressBarWidth - 40);
			$(".label").html(progress.toPrecision(4) + "%");
		}
		changeProgress();
		$('body').on('pageChanged', function(e) {
			changeProgress();
		});

		$('body').on('addedBook', function() {
			console.log('222');
			progresDiv.html('');
		});
	}
});

	
