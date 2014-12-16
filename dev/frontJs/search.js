define(['tools/jquery-1.11.1.min'], function() {
 init ();
});


var n = 0;
function searchWord() {
  var txt, i, found;
  var str = document.getElementById("topSearch").value;
  var searchError = document.getElementById("search-error");
  if (str == "") {
    return false; 
  }
if (window.find) {
if (!window.find(str)) {
  while (window.find(str, false, true)) {
    n++;
    console.log(n);
  }
} else {
  n++;
}
if (n == 0) {
  searchError.innerHTML = ("The following text was not found:  " + str);
}
} else if (window.document.body.createTextRange) {
	  txt = window.document.body.createTextRange();
	found = true;
	i = 0;
	while (found === true && i <= n) {
	  found = txt.findText(str);
	  if (found) {
	    txt.moveStart("character", 1);
	    txt.moveEnd("textedit");
	  }
	  i += 1;
	}
	if (found) {
	  txt.moveStart("character", -1);
	  txt.findText(str);
	  txt.select();
	  txt.scrollIntoView();
	  n++;
	} else {
		if (n > 0) {
		  n = 0;
		  searchWord(str);
		}

		searchError.innerHTML = ("The following text was not found:  " + str);
	}
}
return false;
}


/*


function searchWord() {
	var str = document.getElementById("topSearch").value;
	var searchError = document.getElementById("search-error");
	if (str == "") {
	   alert ("Please enter some text to search!");
	   return;
	}

	if (window.find) {  
	   var found = window.find(str);

	   if (!found) {
	   	searchError.innerHTML = ("The following text was not found:  " + str);
	   }
	} else {
	   searchError.innerHTML = ("Your browser does not support this example!");
	}
}
*/
function init() {
var self = this;
document.getElementById('topSearch').addEventListener('keyup', goToWord);

function goToWord(e) {
	if (e.keyCode == 13) {
		searchWord();
	}
}

	$('body').on('addedBook', function() {
		document.getElementById('topSearch').removeEventListener('keyup', goToWord);
	});
}