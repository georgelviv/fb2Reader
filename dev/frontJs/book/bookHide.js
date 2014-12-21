define(function() {
	var bookHide = {
		hideElements: hideElements
	};
	return bookHide;
});

function hideElements() {
	$('.linehide, .imgShow, .ornament').remove();
	$('img').css('opacity', 1);
	var hideStr = '';
	if (this.isTwoColumn) {
		hideStr += hideEl(true, this.lcolumn, this);
		hideStr += hideEl(false, this.lcolumn, this);
		hideStr += hideEl(true, this.rcolumn, this);
		hideStr += hideEl(false, this.rcolumn, this);
		this.bookDiv.append(hideStr);
	} else {
		hideStr += hideEl(true, this.bookDiv, this);
		hideStr += hideEl(false, this.bookDiv, this);
		this.bookDiv.append(hideStr);
	}
}

function hideEl(isTop, el, book) {
	var self = book;
	var bookEl = {
		bookDiv: el,
		bookBottom: Math.floor(el[0].getBoundingClientRect().bottom),
		bookTop: Math.floor(el[0].getBoundingClientRect().top),
		bookLeft: Math.floor(el[0].getBoundingClientRect().left)
	};

	var lastEl, lineHeight, lineHide, heightHide, positionEl;
	var fixPix = 0;

	if (isTop) {
		lastEl = getHideEl(bookEl.bookTop);
	} else {
		lastEl = getHideEl(bookEl.bookBottom);
	}

	if (!lastEl) {
		return '';
	}

	if (lastEl.tagName == 'IMG') {
		imageFix(isTop, lastEl, bookEl);
		return '';
	}

	lineHeight = Math.floor($(lastEl).css('line-height').slice(0, -2));
	if (isTop) {
		heightHide = (lastEl.getBoundingClientRect().bottom - bookEl.bookTop) % lineHeight;
		positionEl = 'top:0px;';
	} else {
		heightHide = (bookEl.bookBottom - lastEl.getBoundingClientRect().top) % lineHeight;
		positionEl = 'bottom:0px;';
	}

	
	if (heightHide < Math.floor($(lastEl).css('line-height').slice(0, -2))) {
		lineHide = '<div style="height:' + Math.ceil(heightHide + 1)  + 'px;background:';
		lineHide += self.bookDiv.css('background-color') + ';';

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
					if ($(child[i]).children().not('em, strong, br, sup, sub, emphasis, a, span').length) {
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

	function imageFix(isTop, imgEl, bookObj) {
		var imgClone = $(imgEl).clone();
		var imgTop = imgEl.getBoundingClientRect().top;
		var imgBottom = imgEl.getBoundingClientRect().bottom;
		var imgHeight = imgEl.height;
		var ornament = $('<div class="ornament"></div>');
		var heightDiff;
		var makedHeight;
		var isShow;
		imgEl.style.opacity = 0;
		if (isTop) {
			heightDiff = Math.abs(imgTop - bookObj.bookTop);
			makedHeight = imgHeight - heightDiff;
			isShow = makedHeight >= heightDiff;
			if (isShow) {
				imgClone.css({
					height: makedHeight + 'px',
					top: 2 + 'px',
					maxWidth: '100%'
				});
				imgClone.addClass('imgShow');
				bookObj.bookDiv.append(imgClone);
			} else {
				ornament.css({
					height: makedHeight + 'px',
					top: 2 + 'px',
					width: el.outerWidth() + 'px'
				});
				if (makedHeight > 40) {
					ornament.addClass('ornament1');
				}
				bookObj.bookDiv.append(ornament);
			}
		} else {
			heightDiff = imgBottom - bookObj.bookBottom;
			makedHeight = imgHeight - heightDiff;
			isShow = (bookObj.bookBottom - imgTop) > heightDiff;
			if (isShow) {
				imgClone.css({
					height: makedHeight + 'px',
					top: $(imgEl).position().top + 'px',
					maxWidth: '100%'
				});
				imgClone.addClass('imgShow');
				bookObj.bookDiv.append(imgClone);
			} else {
				ornament.css({
					height: makedHeight + 'px',
					top: $(imgEl).position().top + 'px',
					width: el.outerWidth() + 'px'
				});
				if (makedHeight > 40) {
					ornament.addClass('ornament1r');
				}
				bookObj.bookDiv.append(ornament);
			}
		}
	}

}
