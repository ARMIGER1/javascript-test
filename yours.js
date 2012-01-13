$(document).ready(function () {

	/// Global constants
	var FILE = 'arbitrary.html';
	var separator = '\n==========\n';
	console.log('DOM loaded!' + separator);
	var defaultImageSize = new Dimension(25, 50, 75);
	
	//// Init build
	build();
	
	/// Global functions
	
	// Builder
	function build() {
		console.log('Builder activated!  Building...' + separator);
		reload();
	}
	
	// Reloader
	function reload() {
		console.log('Reloader activated!' + separator);
		var myLoader = new Loader();
		myLoader.update('body header', FILE, '#site-header');
		myLoader.update('#container', FILE, '#instructions');
		myLoader.update('footer', FILE, '#copyright');
	}
	
	// Appender
	function append(parent, elementToAppend) {
		console.log('Appender activated!\nAppending ' + elementToAppend + ' to ' + parent + '...' +  separator);
		
		$(parent).append(elementToAppend);
	}
	
	/// Button actions
	$('#buildTable').click(function (e) {
		
		e.preventDefault();
		
		console.log('Build Table button clicked!');
		
		var img = new CustomImage();
		var google = img.show('http://www.google.com/favicon.ico', 'goog', 'Google Favicon');
		var yahoo = img.show('http://www.yahoo.com/favicon.ico', 'yahoo', 'Yahoo Favicon');
		var bing = img.show('http://www.bing.com/favicon.ico', 'bing', 'Bing Favicon');
        var facebook = img.show('http://www.facebook.com/favicon.ico', 'fb', 'Facebook Favicon');
        var myspace = img.show('http://www.myspace.com/favicon.ico', 'myspace', 'Myspace Favicon');
        var twitter = img.show('http://www.twitter.com/favicon.ico', 'twitter', 'Twitter Favicon');
        var stumbleUpon = img.show('http://www.stumbleupon.com/favicon.ico', 'su', 'StumbleUpon Favicon');
        var reddit = img.show('http://www.reddit.com/favicon.ico', 'reddit', 'Reddit Favicon');
        var delicious = img.show('http://www.del.icio.us/favicon.ico', 'delicio', 'Delicio.us Favicon');
        
        var searchEngines = Array(google, yahoo, bing);
        var socnets = Array(facebook, myspace, twitter);
        var sharing = Array(stumbleUpon, reddit, delicious);
        
        var tbl = new Table();
        
        var united = tbl.make('exampleTable', 3, 3, Array(searchEngines, socnets, sharing), true);
        
        append('#targetDIV', united);
        
        $('#targetDIV').html(united);
        
	});
	// Click events
	jQuery.listen('click', 'td img', function (e) {
		
		e.preventDefault();
		
		var w = $(this).width();
		var f = $(this).css('float');
		var p = $(this).css('position');
		var z = $(this).css('z-index');
		var currentWidth = $(this).width();
		var windowWidth = window.innerWidth;
		var windowHeight = window.innerHeight;
		
		if (p == 'static') {
			
			// Resize to fill page
			$(this).animate({
				opacity: 0
			}, {
				duration: 1000,
				complete: function () {
					$(this).css('background', '#000').css('position', 'absolute').css('top', 0).css('left', 0);
				}
			}).queue(function () {
				$(this).animate({
					opacity: 1,
					width: windowWidth,
					height: windowHeight
				}, {
					duration: 1000,
					complete: function () {
						// Just in case it's ever needed...
					}
				});
				$(this).dequeue();
			});
		} else {
			
			// Resize to 100x100
			$(this).animate({
				height: 100,
				width: 100,
				opacity: 0
			}, {
				duration: 1000,
				complete: function () {
					$(this).css('background', 'none').css('position', 'static');
				}
			}).queue(function () {
				
				// Turn down the opacity
				$(this).animate({
					opacity: 1
				}, {
					duration: 1000,
					complete: function () {
						// Once again, in case it's ever needed...
					}
				});
				$(this).dequeue();
			});
		}
		
	});
	
	/// Loader class
	
	/**
	  * 3 arguments will pull from an external file
	  * 2 arguments, on the other hand, will insert HTML directly.
	  */
	function Loader() {
		console.log('Loader activated!' + separator);
		
		// Update
		this.update = function () {
			console.log('Loader has initialized the updater!' + separator);
			
			// Function variables
			var element = arguments[0];
			
			if (arguments.length == 3) {
				var externalFile = arguments[1];
				var externalElement = arguments[2];
				var place = externalFile + ' ' + externalElement;
				
				console.log('Updater will now attempt to pull ' + externalElement + ' from ' + externalFile + ' and place it in [' + element + ']...');
				
				// Load attempt
				$(element).load(place, function (response, status, xhr) {
					if (status == "error") {
						var msg = 'An error appeared: ';
						console.error(msg + xhr.status + " " + xhr.statusText);
					} else if (status == "success") {
						var msg = 'Success! ';
						console.log(msg + xhr.status + " " + xhr.statusText);
					}
					
				});
			} else if (arguments.length == 2) {
				
				var markup = arguments[1];
				
				$(element).html(markup);
			}
			
		};
	}
	
	/// Dimension class
	function Dimension () {
		this.width = 0;
		this.height = 0;
		this.length = 0;
		this.maxArgs = 3;
		this.beginMsg = "A new dimension object has been created!\n";
		
		/// Argument handlers
		switch (arguments.length) {
			case 3:
				this.width = arguments[0];
				this.height = arguments[1];
				this.length = arguments[2];
				var msg = this.beginMsg + "\twidth: " + this.width + "\n\theight: " + this.height + "\n\tlength: " + this.length;
				console.log(msg + separator);
				break;
			case 2:
				this.width = arguments[0];
				this.height = arguments[1];
				var msg = this.beginMsg + "\twidth: " + this.width + "\n\theight: " + this.height + "\n\tlength: " + this.length;
				console.log(msg + separator);
				break;
			case 1:
				this.width = arguments[0];
				this.height = this.width;
				this.length = this.width;
				var msg = this.beginMsg + "\twidth: " + this.width + "\n\theight: " + this.height + "\n\tlength: " + this.length;
				console.log(msg + separator);
				break;
			case 0:
				msg = 'A new dimension object has been created with no arguments!' + separator;
				console.log(msg);
				break;
			default:
				var errmsg = 'Dimension can only take up to ' + this.maxArgs + ' arguments.';
				console.error(errmsg);
				break;
		}
		
		/// Getters
		this.getWidth = function () {
			console.log('Getting the width of the selected object...');
			return this.width;
		};
		
		this.getHeight = function () {
			console.log('Getting the height of the selected object...');
			return this.height;
		};
		
		this.getLength = function () {
			console.log('Getting the length of the selected object...');
			return this.length;
		};
		
		/// Setters
		this.setWidth = function (width) {
			console.log('Setting the width of the current object to ' + width + 'px...');
			this.width = width;
			
			console.log('Width is now ' + this.width + 'px.' + separator);
		};
		
		this.setHeight = function (height) {
			console.log('Setting the height of the current object to ' + height + 'px...');
			this.height = height;
			
			console.log('Height is now ' + this.height + 'px.' + separator);
		};
		
		this.setLength = function (length) {
			console.log('Setting the length of the current object to ' + length + 'px...');
			this.length = length;
			
			console.log('Length is now ' + this.height + 'px.' + separator);
		};
		
	}
	
	/// Point class
	function Point() {
	}
	
	/// CustomImage class
	function CustomImage() {
		
		console.log('A new CustomImage object has been created!');
		
		// Show
		this.show = function (src, unhashedID, alt) {
			
			console.log('Showing a custom image...' + separator);
			
			var result = '<img src="' + src + '" alt="' + alt + '" id="' + unhashedID + '" />';
			
			return result;
		};
		
	}
	
	/// Shuffler class
	function Shuffler() {
		
		console.log('New Shuffler created!' + separator);
		
		this.shuffle = function (type, array) {
			
			if (type == 'fisherYates') {
				
				console.log('Shuffling with the Fisher-Yates algorithm...');
				
				var i = array.length;
				
				if (i === 0) {
					return false;
				}
				
				while (--i) {
					var j = Math.floor(Math.random() * (i + 1));
					var temp_i = array[i];
					var temp_j = array[j];
					
					array[i] = temp_j;
					array[j] = temp_i;
				}
			} // End if
			
			console.log('Finished shuffling!' + separator);
		};
	}
	
	/// Table class
	function Table() {
		
		console.log('New Table object created!');
		
		/// Table maker
		this.make = function (id, rows, cols, dataArray, random) {
			
			console.log('Making a new table...');
			
			var newTable = '';
			newTable += '<table id="' + id + '">';
			newTable += '<tbody>';
			
			// Rows
			for (var i = 0; i < rows; i++) {
				
				newTable += '<tr>';
				
				// Cols
				for (var j = 0; j < cols; j++) {
					
					// Check random flag
					if (random) {
						var shuff = new Shuffler();
						shuff.shuffle('fisherYates', dataArray);
						newTable += '<td>' + dataArray[i][j] + '</td>';
					} else {
						newTable += '<td>' + dataArray[i][j] + '</td>';
					}
					
				}
				
				newTable += '</tr>';
			}
			
			newTable += '</tbody>';
			newTable += '</table>';
			
			return newTable;
		};
		
	}
	
	/// More classes if needed
	
});
