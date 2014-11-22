$(document).ready(function() {

	$('form').submit(function(e) {
		e.preventDefault();
		var file = document.getElementById('fileselect').files[0];

		$('form').html('loading...');
		console.log(file);

		$.post('/upload', function(file) {
			console.log(file);
		});
		
	});


});
