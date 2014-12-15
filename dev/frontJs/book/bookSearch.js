define(['tools/jquery-1.11.1.min'], function(jquery) {

	var bookSearch = {
		initSearch: initSearch
	};

	return bookSearch;
});

function initSearch() {
	var searchDiv = $('#search');
	var searchDivSpan = searchDiv.find('span');
	var searchInput = searchDiv.find('input');

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
		searchInput.animate({
			width: '0'
		}, function() {
			searchDiv.removeClass('active');
		});
	});

	searchInput.on('click', function(e) {
		var searchPath = searchInput.val();
		$('#book').highlight(searchPath);
	});

	searchInput.on('keyup', function(e) {
		if (e.keyCode == 13) {
			var searchPath = searchInput.val();
			$('#book').highlight(searchPath);
		}
	});

	$('body').on('addedBook', function() {
		searchDivSpan[0].removeEventListener('click', clickSearchEv);
	});
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
