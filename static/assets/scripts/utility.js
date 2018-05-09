function getFontSize(fsize) {
			if (fsize > 80) {
				return "2em";
			} else if (fsize > 50) {
				return "1.5em";
			} else if (fsize > 20) {
				return "1em";
			} else {
				return "0.5em";
			}
	}
	function addListItem(tagsize,taglink,tagtext) {
		var li = '<li style="font-size:' + tagsize + '"><a href="' + taglink + '">' + tagtext + '</a>';
		$('#blog-tagCloud').append(li);
	}