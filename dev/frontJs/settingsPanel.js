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

$('#fonts').change(function()
	{
		var option = $(this).find('option:selected').val();
		$('#book').css("font-family", option);
	});

$('#fontSize').change(function()
	{
		var option = $(this).find('option:selected').val();
		$('#book').css("font-size", parseInt(option, 10));
	});

$('#fontStyle').change(function()
	{
		var option = $(this).find('option:selected').val();
		$('#book').css("font-style", option);
	});
$('#fontWeight').change(function()
	{
		var option = $(this).find('option:selected').val();
		$('#book').css("font-weight", parseInt(option, 10));
	});

$('#fontColor').change(function()
	{
		var option = $(this).find('option:selected').val();
		$('#book').css("color", option);
	});


$('#lineHeight').change(function()
	{
		var option = $(this).find('option:selected').val();
		$('#book').css("line-height", parseInt(option, 10));
	});

$('#letterSpacing').change(function()
	{
		var option = $(this).find('option:selected').val();
		$('#book').css("letter-spacing", parseInt(option, 10));
	});

$('#wordSpacing').change(function()
	{
		var option = $(this).find('option:selected').val();
		$('#book').css("word-spacing", parseInt(option, 10));
	});


}

