define(['tools/jquery-1.11.1.min'], function() {
  settingPanel();
});

function settingPanel() {
/*window.onload = function() {

document.onclick = function(e) {
    var target = e && e.target || window.event.srcElement;
    var dataToggleSettingsPanel = target.getAttribute('data-toggle-settings-panel');
        if (!dataToggleSettingsPanel) return;
        	var elem = document.getElementById(dataToggleSettingsPanel);
          	elem.style.display = elem.offsetHeight ? 'none' : 'block';
       }
 };
*/
<<<<<<< HEAD
/*
 $(document).ready(function() {       
=======

 $(document).ready(function() {
>>>>>>> 83b877b21b36647d9f8ddfd1cfdd556b920cd609
      var allSections = $('#footer > settings-panel').hide();
      $('footer > .menu').click(function() {
        allSections.slideUp();
          $(this).next().slideToggle();
        $(this).parent().toggleClass('open');
       // $(this).parent().next().slideDown();
        return false;
      });
												
<<<<<<< HEAD
}); */	

$(document).ready(function() {
     var allSections = $('#footer > settings-panel').hide();
     $('footer > .menu').click(function() {
       allSections.slideUp();
         $(this).next().slideToggle();
       $(this).parent().toggleClass('open');
      // $(this).parent().next().slideDown();
       return false;
     });

});
=======
});

}
>>>>>>> 83b877b21b36647d9f8ddfd1cfdd556b920cd609
