define( function() {
	var bookProgress = {
		setProgress: setProgress
	};
	return bookProgress;

	function setProgress() {
		var self = this;
		//var introHtml = '<a href="#"><i class="fa fa-info"></i></a>';
		var progress = this.currentPage * 100 / this.pages ;	
		var progressBarWidth =Math.ceil(progress*$(".container").width()/ 100);  
	    $("#progressbar").width(progressBarWidth).html('<span class="label">' + progress.toPrecision(4) + "% </span");

		$('body').on('addedBook', function() {
			$('#progressbar').html('');
		});
	}
});

/*
this.pages всі стррінки
this.currentPage поточна


function setProgress(progress)
{           
    var progressBarWidth =progress*$(".container").width()/ 100;  
    $(".progressbar").width(progressBarWidth).html(progress + "% ");
}*/