$(document).ready(function () {
	
	// Code below
	
	var file = 'arbitrary.html';
	var LOAD = 'load';
	var HTML = 'html';
	
	reload();
	
	function update(element, externalFile, externalElement, type) {
	
		place = externalFile + ' ' + externalElement;
		
		switch (type) {
			case 'load':
				$(element).load(place);
				break;
			case 'html':
				$(element).html(place);
				break;
			default:
				break;
		}
	}
	
	function reload() {
		update('body header', file, '#site-header', LOAD);
		update('#container', file, '#instructions', LOAD);
		update('footer', file, 'footer', LOAD);
	}
	// Code above
});
