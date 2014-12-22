define(function () {
	var bookColumn = {
		initOneColumn: initOneColumn,
		initTwoColumn: initTwoColumn,
		initColumnButtons: initColumnButtons
	};

	return bookColumn;

	function initOneColumn() {
		this.isTwoColumn = false;
		this.bookDiv.html(this.bookString);
		this.scrollHeight = this.bookDiv[0].scrollHeight;
		this.pages = Math.ceil(this.scrollHeight / this.fixedHeight);
		if (this.scrollTop) {
			this.bookDiv.scrollTop(this.scrollTop);
			this.currentPage = Math.ceil((this.bookDiv.scrollTop() + this.fixedHeight) /  this.fixedHeight);
		}
		this.scrollTop = this.bookDiv.scrollTop();
		this.hideElements();
		$('body').trigger('columnInit');
	}
	function initTwoColumn() {
		console.time(1);
		var content = '';
		this.isTwoColumn = true;
		content = '<div class="bookcolumn" id="lcolumn" style="padding-right:20px">' + this.bookString +'</div>';
		content += '<div class="bookcolumn" id="rcolumn" style="padding-left:20px">' + this.bookString;
		content += '<div id="lastp" style="height:' + this.userHeight + 'px;"></div>';
		console.time(2);
		this.bookDiv.html(content);
		console.timeEnd(2);
		this.lcolumn = $('#lcolumn');
		this.rcolumn = $('#rcolumn');
		if (this.scrollTop) {
			this.lcolumn.scrollTop(this.scrollTop);
			this.currentPage = Math.ceil((this.lcolumn.scrollTop() + this.fixedHeight) / (this.fixedHeight * 2));
		}
		this.scrollTop = this.lcolumn.scrollTop();
		this.rcolumn.scrollTop(this.lcolumn.scrollTop() + this.fixedHeight);
		this.scrollHeight = this.lcolumn[0].scrollHeight;
		this.pages = Math.ceil(this.scrollHeight / (this.fixedHeight * 2));
		this.hideElements();
		$('body').trigger('columnInit');
		console.timeEnd(1);
	}
	function initColumnButtons() {
		var self = this;
		var scolumnDiv = $('#book-scolumn');
		var columnsHtml = '<div class="switch"><div class="count"><input type="radio" name="scolumn"';
		columnsHtml += ' id="s-one-column"><label for="s-one-column">One</label></div><div class="count">';
		columnsHtml += '<input type="radio" name="scolumn" id="s-two-column" checked><label';
		columnsHtml += ' for="s-two-column">Two</label></div></div>';

		scolumnDiv.html(columnsHtml);

		$('#s-one-column, #s-two-column').change(function() {
			if ($('#s-one-column:checked').val()) {
				self.initOneColumn();
			} else {
				self.initTwoColumn();
			}
		});

		$('body').on('addedBook', function() {
			scolumnDiv.html('');
		});
	}
});