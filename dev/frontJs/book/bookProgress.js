define( function() {
	var bookProgress = {
		setProgress: setProgress
	};
	return bookProgress;
	
	function setProgress() {
		var self = this;
		var progress = this.currentPage * 100 / this.pages ;	
		var progressBarWidth =Math.ceil(progress*$(".container").width()/ 100);  
	    $("#progressbar").width(progressBarWidth).html('<span class="label">' + progress.toPrecision(4) + "% </span");


		function changeProgress(){
			var progress = self.currentPage * 100 / self.pages ;	
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
			$('#progressbar').html('');
		});
	}
});

	
