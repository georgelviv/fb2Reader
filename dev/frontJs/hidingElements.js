define(['tools/jquery-1.11.1.min'], function() {
	var elementHide = {
		hide: hideEl,
		hideBoth: hideBoth
	};
	return elementHide;
});

var bookEl = {
	bookDiv: $('#book'),
	bookBottom: Math.floor($('#book')[0].getBoundingClientRect().bottom),
	bookTop: Math.floor($('#book')[0].getBoundingClientRect().top),
	footerHeight: Math.floor($('footer')[0].getBoundingClientRect().height),
	headerHeight: Math.floor($('header')[0].getBoundingClientRect().height)
};

function hideBoth() {
	hideEl(true);
	hideEl(false);
}

function hideEl(isTop) {
	var lastEl, lineHeight, lineHide, heightHide, positionEl;

	if (isTop) {
		lastEl = getHideEl(bookEl.bookTop);
	} else {
		lastEl = getHideEl(bookEl.bookBottom);
	}

	if (!lastEl || lastEl.tagName == 'IMG') {
		return;
	}

	lineHeight = Math.floor($(lastEl).css('line-height').slice(0, -2));
	if (isTop) {
		heightHide = (lastEl.getBoundingClientRect().bottom - bookEl.bookTop) % lineHeight;
		positionEl = 'top:' + bookEl.headerHeight + 'px;';
	} else {
		heightHide = (bookEl.bookBottom - lastEl.getBoundingClientRect().top) % lineHeight;
		positionEl = 'bottom:' + bookEl.footerHeight + 'px;';
	}

	
	if (heightHide < Math.floor($(lastEl).css('line-height').slice(0, -2))) {
		lineHide = '<div style="height:' + heightHide + 'px;background:';
		lineHide += bookEl.bookDiv.css('background-color') + ';';
		lineHide += positionEl + '" class="linehide"></div>';
		$('body').append(lineHide);
		return;
	}
	return;
}

function getHideEl(checkElPos) {
	var bookScroll = bookEl.bookDiv[0].scrollHeight;
	
	var findedEl;
	findChild(bookEl.bookDiv);

	return findedEl;

	function findChild(parent) {
		var child = parent.children();
		var element = '';
		// Check for which iteration is faster, from start or from end
		var loopInc = (bookScroll - bookEl.bookDiv.scrollTop()) > (bookScroll / 2);
		var i = loopInc ? 0:(child.length - 1);

		for (;(loopInc) ? (i < child.length):(i >= 0); loopInc ? (i++):(i--)) {
			if (child[i].nodeType !== 1) { continue; }
			var top = child[i].getBoundingClientRect().top;
			var bottom = child[i].getBoundingClientRect().bottom;
			if (top < checkElPos && checkElPos < bottom) {
				if ($(child[i]).children().not('em, strong, br, sup, sub, emphasis, a').length) {
					element = child[i];
					break;
				} else {
					findedEl = child[i];
					break;
				}
			}
		}

		if (element) {
			findChild($(element));
		} else {
			return;
		}
	}
}
