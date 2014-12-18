define(['tools/jquery-1.11.1.min'], function() {
 initHint();
});

function hintWord(x, y) {
	var currentP = $(document.elementFromPoint(x, y));
	currentP.html(currentP.text().replace(/\b(\w+)\b/g, "<span>$1</span>"));
	var currentWord = $(document.elementFromPoint(x, y));

	if (! /\s/g.test(currentWord.text())) {	
		var hintBlock = $('#hint-panel').addClass('hint-panel');
		hintBlock.css({"display":"block", "left":x + 'px' , "top":y, "position":"absolute"} );
		hintBlock.html(currentWord.text() + "\n <p id='jsonWiki' ></p>");
        var heightBlock = hintBlock.height();
        var widthBlock = hintBlock.width();
        var heightWindow = $(window).height();
        var widthWindow = $(window).width();
        var heightHeader = $('header').height();

        hintBlock.removeClass();
        hintBlock.addClass('hint-panel');
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
                hintBlock.addClass('hint-panel hint-right');
            } else if (x > widthWindow - widthBlock / 2  - 10) {
                hintBlock.addClass('hint-panel hint-left');
            } else {
                hintBlock.addClass('hint-panel hint-top');
            }
        }
    

		getWikiMedia(currentWord.text());
	}
}

function hideHint() {
	$('.hint-panel').css("display", "none"); 
}

function getWikiMedia(word) {
    var obj = null, key = null; //explaintext, exintro
    $.getJSON("http://en.wikipedia.org/w/api.php?action=query&prop=extracts&explaintext&exchars=115&titles=" + word + "&format=json&callback=?", function(data) {
      
       obj = data.query.pages;
       for (key in obj)  break;
        if (key == -1) {
          $('#jsonWiki').html('<p> Sorry wiki doesn`t known</p>');  
        } else {
            $('#jsonWiki').html(obj[key].extract + '<a href="http://en.wikipedia.org/wiki?curid=' + key +'"> Далі...</a>' );     
        }
         
    });


 $.getJSON("http://api.microsofttranslator.com/V2/Ajax.svc/Translate?appId=Bearer ReaderFEP&from=en&to=ua&text="
  + word + "&oncomplete=?", function(data) {
      console.log(data);         
    });
/*
    var Translate={
      baseUrl:"http://api.microsofttranslator.com/V2/Ajax.svc/",
      appId:"34b8aabb-e371-4973-a72c-b6660915eab1",
      translate:function(word,from,to,
          callback){
         var s = document.createElement("script");
         s.src =this.baseUrl+"Translate";
         s.src +="?oncomplete="+callback; 
         s.src +="&appId="+this.appId;
         s.src +="&from=" + from ;
         s.src += "&to=" + to ;
         s.src += "&text=" + word; 
         document.getElementsByTagName(
          "head")[0].appendChild(s);
     }
 }
 var callback=function(result){
   alert(result)};
   Translate.translate(word,
    "en","ua","callback");*/
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