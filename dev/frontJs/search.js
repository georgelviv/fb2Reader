define(['tools/jquery-1.11.1.min'], function() {
  searchWord();
});

 function searchWord() {
	var str = document.getElementById("topSearch").value;
	if (str == "") {
	    alert ("Please enter some text to search!");
	    return;
	}

	if (window.find) {  
	    var found = window.find(str);
	    if (!found) {
	        alert ("The following text was not found:\n" + str);
	    }
	}
	else {
	    alert ("Your browser does not support this example!");
	}
}

function init() {
		var self = this;
		document.body.addEventListener('keyup', keyEvent);
		document.getElementById('topSearch').addEventListener('keyup', goToWord);

		function keyEvent(e) {

		function goToWord(e) {
			if (e.keyCode == 13) {
				self.searchWord();
			}
		}

		$('body').on('addedBook', function() {
			document.body.removeEventListener('keyup', keyEvent);
			document.getElementById('topSearch').removeEventListener('keyup', goToWord);
		});
	}
});
