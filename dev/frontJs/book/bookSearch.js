define(['tools/jquery-1.11.1.min'], function(jquery) {

	var bookSearch = {
		initSearch: initSearch
	};

	return bookSearch;
});

function initSearch() {
	var oldSearch = '';
	var searchDiv = $('#search');
	var searchDivSpan = searchDiv.find('.sbutton');
	var searchInput = searchDiv.find('input');
	var searchCancel = $('.scancel');

	searchDivSpan[0].addEventListener('click', clickSearchEv);

	function clickSearchEv(e) {
		e.preventDefault();
		if (!searchDiv.hasClass('active')) {
			searchInput.animate({
				width: '200px',
			});
			searchDiv.addClass('active');
			searchInput.focus();
		} else {
			searchInput.animate({
				width: '0'
			}, function() {
				searchDiv.removeClass('active');

			});
		}
	}

	searchInput.focusout(function() {
		if (searchDiv.hasClass('active')) {
			searchInput.animate({
				width: '0'
			}, function() {
				searchDiv.removeClass('active');
			});
		}
	});

	searchInput.on('click', function(e) {
		onSearchSubmit();
	});

	searchCancel.on('click', function(e) {
		e.preventDefault();
		searchInput.val('');
		$('#book').removeHighlight();
		searchCancel.removeClass('show');
		oldSearch = '';
	});


	searchInput.on('keyup', function(e) {
		if (e.keyCode == 13) {
			onSearchSubmit();
		}
	});

	$('body').on('addedBook', function() {
		searchDivSpan[0].removeEventListener('click', clickSearchEv);
	});

	function onSearchSubmit() {
		var searchPath = searchInput.val().trim();
		if (!searchPath.length) return searchCancel.removeClass('show');
		if (oldSearch != searchPath) {
			$('#book').removeHighlight();
			oldSearch = searchPath;
			if (searchPath.length > 2) {
				$('#book').highlight(searchPath);
				searchCancel.addClass('show');
				$('.serror').remove();
			} else {
				if (!$('.serror')[0]) {
					searchDiv.append('<div class="serror">Pleas write more than 3 characters</div>');
				}
			}
		}
	}
}



jQuery.fn.highlight = function(pat) {
 function innerHighlight(node, pat) {
  var skip = 0;
  if (node.nodeType == 3) {
   var pos = node.data.toUpperCase().indexOf(pat);
   if (pos >= 0) {
    var spannode = document.createElement('span');
    spannode.className = 'highlight';
    var middlebit = node.splitText(pos);
    var endbit = middlebit.splitText(pat.length);
    var middleclone = middlebit.cloneNode(true);
    spannode.appendChild(middleclone);
    middlebit.parentNode.replaceChild(spannode, middlebit);
    skip = 1;
   }
  }
  else if (node.nodeType == 1 && node.childNodes && !/(script|style)/i.test(node.tagName)) {
   for (var i = 0; i < node.childNodes.length; ++i) {
    i += innerHighlight(node.childNodes[i], pat);
   }
  }
  return skip;
 }
 return this.length && pat && pat.length ? this.each(function() {
  innerHighlight(this, pat.toUpperCase());
 }) : this;
};

jQuery.fn.removeHighlight = function() {
 return this.find("span.highlight").each(function() {
	this.parentNode.replaceChild(this.firstChild, this);
	this.normalize();
 }).end();
};
