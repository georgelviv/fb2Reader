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

	var styleString = '';
	$('#fonts').change(function()
	{
		var option = $(this).find('option:selected').val();
		if (option == 'null') {
			$('#book').css("font-family",  "Arial");
		}
		$('#book').css("font-family", option);
		$('body').trigger('changeStyles');
	});

	$('#fontSize, #sfontSize').change(function()
	{
		var option = $(this).find('option:selected').val();
		if (option == 'default') {
			$('#book').css("font-size",  16);
		}
		$('#book').css("font-size", parseInt(option, 10));
		$('body').trigger('changeStyles');
	});

	$('#fontStyle').change(function()
	{
		var option = $(this).find('option:selected').val();
		if (option == 'null') {
			$('#book').css("font-style",  "normal");
		}
		$('#book').css("font-style", option);
		$('body').trigger('changeStyles');
	});
	$('#fontWeight').change(function()
	{
		var option = $(this).find('option:selected').val();
		if (option == 'null') {
			$('#book').css("font-weight",  "200");
		}
		$('#book').css("font-weight", parseInt(option, 10));
		$('body').trigger('changeStyles');
	});

	$('#fontColor').change(function()
	{
		var option = $(this).find('option:selected').val();
		if (option == 'null') {
			$('#book').css("color",  "black");
		}
		$('#book').css("color", option);
		$('body').trigger('changeStyles');
	});


	$('#lineHeight').change(function()
	{
		var option = $(this).find('option:selected').val();
		if (option == 'null') {
			$('#book').css("line-height",  "1");
		}
		$('#book').css("line-height", parseInt(option, 10));
		$('body').trigger('changeStyles');
	});

	$('#letterSpacing').change(function()
	{
		var option = $(this).find('option:selected').val();
		if (option == '0') {
			$('#book').css("line-spacing",  "1");
		}
		$('#book').css("letter-spacing", parseInt(option, 10));
		$('body').trigger('changeStyles');
	});

	$('#wordSpacing').change(function()
	{
		var option = $(this).find('option:selected').val();
		if (option == '0') {
			$('#book').css("word-spacing", "1");
		}
		$('#book').css("word-spacing", parseInt(option, 10));
		$('body').trigger('changeStyles');
	});
	
	$('#backgroundColor').change(function()
	{
		var option = $(this).find('option:selected').val();
		if (option == 'null') {
			$('#main, #book').css("background-color",  "#ecf0f1");
		} 

		$('#main, #book').css("background-color", option);		
		$('body').trigger('changeStyles');
	});

	$('#nightMode').change(function()
	{
		 var current = $('#nightMode').val();
	      if (current != 'null') {
	          $('#main, #book').addClass('nightMode');
	      } else {
	         $('#main, #book').removeClass();
	      }
		$('body').trigger('changeStyles');
	});

	$('#textures').change(function()
	{
		var option = $(this).find('option:selected').val();
		if (option != 'null') {
			$('#main, #book').css("background-image",  "url('"+option+"')");
		}	
		$('#main, #book').css("background-image",  "url('"+option+"')");
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

