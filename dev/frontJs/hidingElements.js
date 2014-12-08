define(['tools/jquery-1.11.1.min'], function() {
	var elementHide = {
		hide: hideEl,
		hideBoth: hideBoth
	};
	return elementHide;
});



function hideBoth() {
	if ($('#lcolumn')[0]) {
		hideEl(true, $('#lcolumn'));
		hideEl(false, $('#lcolumn'));
		hideEl(true, $('#rcolumn'));
		hideEl(false, $('#rcolumn'));
	} else {
		hideEl(true, $('#book'));
		hideEl(false, $('#book'));
	}
}

function hideEl(isTop, el) {
	var bookEl = {
		bookDiv: el,
		bookBottom: Math.floor(el[0].getBoundingClientRect().bottom),
		bookTop: Math.floor(el[0].getBoundingClientRect().top),
		bookLeft: Math.floor(el[0].getBoundingClientRect().left),
		footerHeight: Math.floor($('footer')[0].getBoundingClientRect().height),
		headerHeight: Math.floor($('header')[0].getBoundingClientRect().height)
	};

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
		lineHide += $('#book').css('background-color') + ';';
		lineHide += 'width:' + el.width() + 'px;';
		lineHide += 'left:' + bookEl.bookLeft + 'px;';
		lineHide += positionEl + '" class="linehide"></div>';
		el.parent().append(lineHide);
		return;
	}
	return;

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

}

