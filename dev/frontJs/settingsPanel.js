define(['tools/jquery-1.11.1.min'], function() {
  settingPanel();
});

function settingPanel() {
$(document).ready(function() {
     var allSections = $('.settings-panel');
     $('footer > .menu').click(function() {
      allSections.toggle();
      // $(this).next().slideToggle();
      // $(this).parent().next().slideDown();
       return false;
     });

});

}

