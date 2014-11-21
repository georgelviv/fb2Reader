$(document).ready(function() {
	$('form').submit(function(e) {
		e.preventDefault();
		var data = $("#load").val();
		console.log(data);
	});
});