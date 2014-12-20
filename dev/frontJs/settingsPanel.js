define(['tools/jquery-1.11.1.min'], function() {
	settingPanel();
});

function settingPanel() {
	$(document).ready(function() {
		var allSections = $('.settings-panel');
		$('footer > .menu').click(function() {
			allSections.toggle();
			return false;
		});

	});
/*
function myFunction(selectTag) {
    var listValue = selectTag.options[selectTag.selectedIndex].text;
    document.getElementById("book").style.fontFamily = listValue;
}
*/
	var styleString = '';
	$('#fonts').change(function()
	{
		var option = $(this).find('option:selected').val();
		$('#book').css("font-family", option);
		$('body').trigger('changeStyles');
	});

	$('#fontSize').change(function()
	{
		var option = $(this).find('option:selected').val();
		$('#book').css("font-size", parseInt(option, 10));
		$('body').trigger('changeStyles');
	});

	$('#fontStyle').change(function()
	{
		var option = $(this).find('option:selected').val();
		$('#book').css("font-style", option);
		$('body').trigger('changeStyles');
	});
	$('#fontWeight').change(function()
	{
		var option = $(this).find('option:selected').val();
		$('#book').css("font-weight", parseInt(option, 10));
		$('body').trigger('changeStyles');
	});

	$('#fontColor').change(function()
	{
		var option = $(this).find('option:selected').val();
		$('#book').css("color", option);
		$('body').trigger('changeStyles');
	});


	$('#lineHeight').change(function()
	{
		var option = $(this).find('option:selected').val();
		$('#book').css("line-height", parseInt(option, 10));
		$('body').trigger('changeStyles');
	});

	$('#letterSpacing').change(function()
	{
		var option = $(this).find('option:selected').val();
		$('#book').css("letter-spacing", parseInt(option, 10));
		$('body').trigger('changeStyles');
	});

	$('#wordSpacing').change(function()
	{
		var option = $(this).find('option:selected').val();
		$('#book').css("word-spacing", parseInt(option, 10));
		$('body').trigger('changeStyles');
	});
	
	$('#backgroundColor').change(function()
	{
		var option = $(this).find('option:selected').val();
		$('#book').css("background", option);
		$('body').trigger('changeStyles');
	});

	$('#nightMode').change(function()
	{
		 var current = $('#nightMode').val();
	      if (current != 'null') {
	          $('#book').addClass('nightMode');
	      } else {
	         $('#book').removeClass();
	      }

		$('body').trigger('changeStyles');
	});
	

/*
	function saveBookStyle(styleString) {
		if (!!localStorage && styleString) {
			localStorage.setItem("book", styleString);
		}
	}
*/
}

