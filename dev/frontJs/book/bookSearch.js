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

	searchInput.on('keyup', function(e) {
		if (e.keyCode == 13) {
			onSearchSubmit();
		}
	});

	$('body').on('addedBook', function() {
		searchDivSpan[0].removeEventListener('click', clickSearchEv);
	});

	function onSearchSubmit() {
		var searchPath = searchInput.val();
		if (oldSearch != searchPath) {
			$('#book').removeHighlight();
			oldSearch = searchPath;
			if (searchPath.length > 2) {
				$('#book').highlight(searchPath);
				// if (!$('#search .scancel')[0]){
				// 	searchDiv.append('<span class="scancel"><i class="fa fa-times"></i></span>');
				// }
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
  this.parentNode.firstChild.nodeName;
  with (this.parentNode) {
   replaceChild(this.firstChild, this);
   normalize();
  }
 }).end();
};
