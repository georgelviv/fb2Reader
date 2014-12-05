define(['tools/jquery-1.11.1.min'], function() {
	var preloader = {
		progress: progressLoading,
		parsing: parsingBook
	};
	return preloader;
});


function progressLoading(e, data) {
	var preloaderString = '<div id="preloader"><div id="preloader_1" class="preloader">' +
							'</div><div id="preloader_2" class="preloader"></div>' +
							'<div id="preloader_3" class="preloader"></div>' +
							'<div id="preloader_4" class="preloader"></div>' +
							'<div id="preloader_5" class="preloader"></div>' +
							'<div id="preloader_6" class="preloader"></div>' +
							'<div id="preloader_7" class="preloader"></div>' +
							'<div id="preloader_8" class="preloader"></div></div>';
	var progress = parseInt(data.loaded / data.total * 100, 10);
	var loader = $('<div id="loader"></div>').html(preloaderString + '<p id="bookstatus">Loading ' + progress + '%</p>');
	$('#book').html('');
	$('#book').append(loader);
	$('#book-page').find('a').html('');
}

function parsingBook(bookName) {
	$('#bookstatus').html('Parsing book');
}