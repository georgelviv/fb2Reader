define(['tools/jquery-1.11.1.min'], function() {
    // for remove hint when occurs next events
    $('body').on('addedBook pageChanged fsChange columnInit', function() {
        $('#hint').css("display", "none");
    });
   initHint();
});

function hintWord(x, y) {
	var currentP = $(document.elementFromPoint(x, y));
	currentP.html(currentP.text().replace(/\b(\w+)\b/g, "<span>$1</span>"));
	var currentWord = $(document.elementFromPoint(x, y));

	if (! /\s/g.test(currentWord.text())) {	
		var hintBlock = $('#hint');
		hintBlock.css({"display":"block", "left":x - 30 + 'px' , "top":y + 10 + 'px', "position":"absolute", "z-index":"100"} );
		hintBlock.html('<h3>' + currentWord.text() + '</h3>' + "\n <p id='jsonWiki'></p>");
        var heightBlock = hintBlock.height();
        var widthBlock = hintBlock.width();
        var heightWindow = $(window).height();
        var widthWindow = $(window).width();
        var heightHeader = $('header').height();

        hintBlock.removeClass();
        //hintBlock.addClass('hint');
        if (y < heightBlock + heightHeader + 10 ) {
            hintBlock.addClass('hint-bottom');
            if (x < widthBlock / 2 + 10) {
                hintBlock.addClass('hint-right');
            } 
            if (x > widthWindow - widthBlock / 2  - 10) {
                hintBlock.addClass('hint-left');
            } 
        } else {
            if (x < widthBlock / 2 + 10) {
                hintBlock.addClass('hint-right');
            } else if (x > widthWindow - widthBlock / 2  - 10) {
                hintBlock.addClass('hint-left');
            } else {
                hintBlock.addClass('hint-top');
            }
        }    

        getWikiMedia(currentWord.text());
        translateWord(currentWord.text());
        //console.log(translateWord(currentWord.text()));
    }
}

function hideHint() {
	$('#hint').css("display", "none"); 
}

function getWikiMedia(word) {
    var obj = null, key = null; //explaintext, exintro
    $.getJSON("http://en.wikipedia.org/w/api.php?action=query&prop=extracts&explaintext&exchars=175&titles=" + word + "&format=json&callback=?", function(data) {
      
     obj = data.query.pages;
     for (key in obj)  break;
        if (key == -1) {
          $('#jsonWiki').html('<p> Sorry wiki doesn`t known</p>');  
      } else {
        $('#jsonWiki').html(obj[key].extract + '<a href="http://en.wikipedia.org/wiki?curid=' + key +'"> More...</a>' );     
    }
    
});
}

function translateWord(word){
    var inLang = 'en';
    var outLang = 'uk';
    var APIkey = 'trnsl.1.1.20141222T001454Z.8c7163c39781738b.a70c5087d7f3180f1c30294400bfe661c74a6016';
    $.getJSON("https://translate.yandex.net/api/v1.5/tr.json/translate?key="+APIkey+"&lang="+inLang+"-"+outLang+"&text="+word+"&callback=?", function(data) {
        transText = data.text[0];
        $('#outText').text(transText);
        console.log(transText);  
    });
} 

function initHint() {
    var self = this;
    document.getElementById('book').addEventListener('click', getHintWord);

    function getHintWord(e) {
    	if (e.shiftKey/*ctrlKey*/) {
    		hintWord(e.clientX, e.clientY);
    	}  else {
    		hideHint();
    	}
    }

    document.onkeydown = function(evt) {
        evt = evt || window.event;
        if (evt.keyCode == 27) {
            hideHint();
        }
    };
    

}

