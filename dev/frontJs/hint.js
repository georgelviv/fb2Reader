define(['tools/jquery-1.11.1.min'], function() {
 initHint();
});

function hintWord(x, y) {
	var currentP = $(document.elementFromPoint(x, y));
	currentP.html(currentP.text().replace(/\b(\w+)\b/g, "<span>$1</span>"));
	var currentWord = $(document.elementFromPoint(x, y));

	if (! /\s/g.test(currentWord.text())) {	
		var hintBlock = $('.hint-panel');
		hintBlock.css({"display":"block", "left":x + 'px' , "top":y - 10 + 'px', "position":"absolute"} );
		hintBlock.html(currentWord.text() + "\n <span id='jsonWiki'></span>");
		getWikiMedia(currentWord.text());
	}
}

function hideHint() {
	$('.hint-panel').css("display", "none"); 
}
/*
function createCORSRequest(method, url){
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr){
        // XHR has 'withCredentials' property only if it supports CORS
        xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined"){ // if IE use XDR
        xhr = new XDomainRequest();
        xhr.open(method, url);
    } else {
        xhr = null;
    }
    return xhr;
}
*/
function getJSON(url, successHandler, errorHandler) {
$.ajax(
        {
         url: url,
         dataType:"json",
         contentType: "application/json; charset=utf-8",
         success:function(data)
         {
           	var outdata = document.getElementById("jsonWiki");
			outdata.innerHTML = data;
         },
         error:function(jqXHR,textStatus,errorThrown)
         {
            alert("You can not send Cross Domain AJAX requests : "+errorThrown);
         }
        });

/*
	var jqxhr = $.get( url)
  .done(successHandler)
  .fail(errorHandler)*/
};


function successHandler(data) {
	var outdata = document.getElementById("jsonWiki");
	outdata.innerHTML = data;        
}

function errorHandler (status) {
    alert('Something went wrong.');
}


function getWikiMedia(word) {
		getJSON('http://en.wikipedia.org/w/api.php?action=query&prop=extracts&exchars=1000&titles=' + word + '&format=json', successHandler, errorHandler);
}




function initHint() {
var self = this;
document.getElementById('book').addEventListener('click', getHintWord);

function getHintWord(e) {
	if (e.ctrlKey) {
		hintWord(e.clientX, e.clientY);
	} else {
		hideHint();
	}
}

}