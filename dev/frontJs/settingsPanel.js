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
