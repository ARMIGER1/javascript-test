$(document).ready(function () {
	
	// Code below
	
	var file = 'arbitrary.html';
	
	update('body header', file, '#site-header', 'load');
	update('#container', file, '#instructions', 'load');
	update('footer', file, 'footer', 'load');
	
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
