define( function() {
	var bookProgress = {
		setProgress: setProgress
	};
	return bookProgress;
	
	function setProgress() {
		var self = this;
		function changeProgress(self){
			var progress = self.currentPage * 100 / self.pages ;	
			var progressBarWidth =Math.ceil(progress * $(".container").width()/ 100);  
		    $("#progressbar").width(progressBarWidth);
		    $(".label").css("left", progress < 97 ? progressBarWidth : progressBarWidth - 40);
			$(".label").html(progress.toPrecision(4) + "%");
		}
		changeProgress(self);
		$('body').on('pageChanged', function(e) {
			changeProgress(self);	
			console.log(e);
		});
		$('body').on('addedBook', function() {
			$('#progressbar').html('');
		});
	}
});

	