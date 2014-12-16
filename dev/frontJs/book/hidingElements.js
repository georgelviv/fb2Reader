define(['tools/jquery-1.11.1.min'], function() {
	var elementHide = {
		hide: hideEl,
		hideBoth: hideBoth
	};
	return elementHide;
});

function hideBoth() {
	var hideStr = '';
	if (this.isColumns || this.isColumns === undefined) {
		hideStr += this.hideEl(true, this.lcolumn);
		hideStr += this.hideEl(false, this.lcolumn);
		hideStr += this.hideEl(true, this.rcolumn);
		hideStr += this.hideEl(false, this.rcolumn);
		this.bookDiv.append(hideStr);
	} else {
		hideStr += this.hideEl(true, this.bookDiv);
		hideStr += this.hideEl(false, this.bookDiv);
		this.bookDiv.append(hideStr);
	}
}

function hideEl(isTop, el) {
	var bookEl = {
		bookDiv: el,
		bookBottom: Math.floor(el[0].getBoundingClientRect().bottom),
		bookTop: Math.floor(el[0].getBoundingClientRect().top),
		bookLeft: Math.floor(el[0].getBoundingClientRect().left)
	};

	var lastEl, lineHeight, lineHide, heightHide, positionEl;

	if (isTop) {
		lastEl = getHideEl(bookEl.bookTop);
		
	} else {
		lastEl = getHideEl(bookEl.bookBottom);
	}

	if (!lastEl || lastEl.tagName == 'IMG') {
		return '';
	}

	lineHeight = Math.floor($(lastEl).css('line-height').slice(0, -2));
	if (isTop) {
		heightHide = (lastEl.getBoundingClientRect().bottom - bookEl.bookTop) % lineHeight;
		positionEl = 'top:' + bookEl.bookTop + 'px;';
	} else {
		heightHide = (bookEl.bookBottom - lastEl.getBoundingClientRect().top) % lineHeight;
		positionEl = 'bottom:' + (document.body.offsetHeight - bookEl.bookBottom - 1) + 'px;';
	}

	
	if (heightHide < Math.floor($(lastEl).css('line-height').slice(0, -2))) {
		lineHide = '<div style="height:' + Math.ceil(heightHide + 1)  + 'px;background:';
		lineHide += this.bookDiv.css('background-color') + ';';

		lineHide += 'width:' + el.outerWidth() + 'px;';
		lineHide += 'left:' + bookEl.bookLeft + 'px;';
		lineHide += positionEl + '" class="linehide"></div>';
		return lineHide;
	}
	return '';

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

