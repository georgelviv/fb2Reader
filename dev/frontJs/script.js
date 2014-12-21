require(
    ['tools/jquery-1.11.1.min',
	'tools/jquery.fileupload',
	'tools/slidebars',
	'tools/highlight.pack.js',
	'settingsPanel',
	'preloader',
    'book',
    'hint'],
main);

function main(jquery, fileupload, slidebars, highlight, settingsPanel, preloader, Book) {
	$(document).ready(function() {

		var bookDiv = $('#book');
		var fileExtension = /(fb2|epub|txt)/i;
		var bookName;

		$.slidebars(); // init Sidebar for mobile

		showBookStorage();
		hljs.initHighlightingOnLoad(); //init Highlight

		$('pre.programlisting').each(function(i, block) {
			hljs.highlightBlock(block);
		});

		$('#upload-button').on('click', function() {
			$('.file_upload').trigger('click');
		});
		$('#upload-buttons').on('click', function() {
			$('.file_uploads').trigger('click');
		});

		$('#ex-book').on('click', function(e) {
			e.preventDefault();
			getExample();
			preloader.exampleParsing();
		});



		$('#fileselect').fileupload({
			url: '/upload',
			dataType: 'json',
			add: function(e, data) {
				var format;
				bookName = data.files[0].name;
				bookDiv.html('');
				$('body').trigger('addedBook');
				format = bookName.split('.');
				format = format[format.length - 1];
				if (format.match(fileExtension)) {
					data.submit();
					book = '';
				} else {
					bookDiv.html('<div id="nobook">Wrong book format</div>');
				}
			},
			done: function (e, data) {
				$('.linehide').remove();
				$('#status').html('File loaded ' + data.result.files[0].name);
				setTimeout(getBook, 500);
			},
			progressall: preloader.progress
		});

		function getBook() {
				$.get("/getbook?bookName=" + bookName).done(function(data) {
					if (data !== 'false') {
						new Book(data);
					} else {
						setTimeout(getBook, 500);
					}
				}).fail(function() {
					bookDiv.html('<div id="nobook">Error to get book</div>');
				});
				preloader.parsing();
		}

		function showBookStorage() {
			var noBookHtml;
			if (!!localStorage && localStorage.getItem("book")){
				new Book(localStorage.getItem("book"));
			} else {
				noBookHtml = '<div id="nobook">No book to show, please upload book<br>';
				noBookHtml += ' or <a id="ex-book" href="#">Read Alice in Wonderland</a></div>';
				bookDiv.html(noBookHtml);
			}
		}

		function getExample() {
			$.get("/getexamplebook").done(function(data) {
				if (data !== 'false') {
					new Book(data);
				} else {
					setTimeout(getExample, 500);
				}
			}).fail(function() {
				bookDiv.html('<div id="nobook">Error to get book</div>');
			});
		}

	});
}