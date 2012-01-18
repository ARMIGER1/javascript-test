$(document).ready(function () {
    
	/// Global constants
	var FILE = 'arbitrary.html';
	var separator = '\n==========\n';
	var DOMLoadMsg = 'DOM Loaded!' + separator;
	
	// Log DOM loaded
	console.log(DOMLoadMsg);
	
	//// Init build
	build();
	
	/**
	 * Builder
	 */
	function build() {
		var activatedMsg = 'Builder activated!  Building...' + separator;
		console.log(activatedMsg);
		reload();
	}
	
	/**
	 * Reloader
	 */
	function reload() {
		var activatedMsg = 'Reloader activated!' + separator;
		console.log(activatedMsg);
		var myLoader = new Loader();
		myLoader.update('body header', FILE, '#site-header');
		myLoader.update('#container', FILE, '#instructions');
		myLoader.update('footer', FILE, '#copyright');
	}
	
	/**
	 * Appender
	 */
	function append(parent, element) {
		var activatedMsg = 'Appender activated!\nAppending ' + element + ' to ' + parent + '...' + separator;
		
		console.log(activatedMsg);
		
		$(parent).append(element);
		
	}
	
	function show_table() {
		
		var img = new CustomImage();
		
		// Test
		var kawaii = img.show('_images/kawaiibg.png', 'test', 'Test Pic', true);
    	
    	var google = img.show('http://placehold.it/1680x1050&text=Google', 'goog', 'Google Panel', true);
    	var yahoo = img.show('http://placehold.it/1680x1050&text=Yahoo', 'yahoo', 'Yahoo Panel', true);
    	var bing = img.show('http://placehold.it/1680x1050/FFA615/ffffff/&text=Bing', 'bing', 'Bing Panel', true);
    	var facebook = img.show('http://placehold.it/1680x1050/3B5998/ffffff/&text=Facebook', 'fb', 'Facebook Panel', true);
    	var myspace = img.show('http://placehold.it/1680x1050/000000/ffffff/&text=Myspace', 'myspace', 'Myspace Panel', true);
    	var twitter = img.show('http://placehold.it/1680x1050/60D7FF/ffffff/&text=Twitter', 'twitter', 'Twitter Panel', true);
    	var stumbleupon = img.show('http://placehold.it/1680x1050&text=StumbleUpon', 'su', 'StumbleUpon Panel', true);
    	var reddit = img.show('http://placehold.it/1680x1050&text=Reddit', 'reddit', 'Reddit Panel', true);
    	var delicious = img.show('http://placehold.it/1680x1050&text=Del.icio.us', 'delicio', 'Del.icio.us Panel', true);
    	
    	var searchEngines = Array(google, yahoo, bing);
    	var socnets = Array(facebook, myspace, twitter);
    	var sharing = Array(stumbleupon, reddit, delicious);
    	
    	var tbl = new Table();
    	
    	var united = tbl.make('exampleTable', 3, 3, Array(searchEngines, socnets, sharing), true);
    	
    	append('#targetDIV', united);
    	
    	$('#targetDIV').html(united);
    	
    	var drag_me = new Dragger();
    	
    	drag_me.makeDraggable('[draggable=draggable]');
	}
	
	// ========== Click Actions ==========
	jQuery.listen('dblclick', 'td img', function (e) {
		
		e.preventDefault();
		
		var w = $(this).width();
		var f = $(this).css('float');
		var p = $(this).css('position');
		var z = $(this).css('z-index');
		var p_temp;
		var count = 0;
		var currentWidth = w;
		var windowWidth = window.innerWidth;
		var windowHeight = window.innerHeight;
		
		//
		if (w == 100) {
			$(this).animate({
				opacity: 0
			}, {
				duration: 1000,
				complete: function () {
					$(this).css({position: 'absolute', top: 0, left: 0}).css('z-index', 99);
				}
			}).queue(function () {
				$(this).animate({
					opacity: 1,
					width: windowWidth,
					height: windowHeight
				}, {
					duration: 1000,
					complete: function () {
					}
				});
				$(this).dequeue();
			});
		} else {
			$(this).animate({
				width: 100,
				height: 100,
				opacity: 0
			}, {
				duration: 1000,
				complete: function () {
					$(this).css({position: 'static'}).css('z-index', 'auto');
				}
			}).queue(function () {
				$(this).animate({
					opacity: 1
				}, {
					duration: 1000,
					complete: function () {
					}
				});
				$(this).dequeue();
			});
		}
		
		//alert(w + ', ' + z);
	});
	
	// ========== Button Actions ==========
	
	/**
	 * Build table button
     */
    $('#buildTable').click(function (e) {
    	
    	e.preventDefault();
    	
    	show_table();
    	
    });
	
	// ========== Classes ==========
	
	/**
	 * Dragger class
	 */
	function Dragger() {
		
		var activatedMsg = 'New Draggable object created!';
		console.log(activatedMsg);
		
		this.makeDraggable = function (element) {
			
			var notification = 'Making ' + element + ' draggable...';
			console.log(notification);
			
			$(element).on('mousedown', function (evt) {
				var offset = {x: evt.offsetX || evt.originalEvent.layerX, y: evt.offsetY || evt.originalEvent.layerY};
				
				// Bind on mousemove only if element is currently being dragged
				$(document).on({
					// Delegate the mousemove event to the draggable element
					'mousemove.drag': $.proxy(function (evt) {
						$(this).css('position', 'absolute');
						$(this).css({left: evt.pageX - offset.x, top: evt.pageY - offset.y});
					}, this),
					
					// Unbind namespaced events on mouseup
					'mouseup.drag': function (evt) {
						$(document).off('.drag');
					}
				});
				
				return false;
			});
		};
	}
	
	/**
	 * Loader class
	 */
	function Loader() {
		var activatedMsg = 'Loader activated!' + separator;
		console.log(activatedMsg);
		
		/**
		 * Update function
		 */
		this.update = function () {
			
			var initMsg = 'Loader has initialized the updater!' + separator;
			console.log(initMsg);
			
			// Function variables
			var element = arguments[0];
			
			if (arguments.length == 3) {
				
				var externalFile = arguments[1];
				var externalElement = arguments[2];
				var place = externalFile + ' ' + externalElement;
				
				var msg = 'Updater will now attempt to pull ' + externalElement + ' from ' + externalFile + ' and place it in [' + element + ']...' + separator;
				
				// Log it!
				console.log(msg);
				
				// Load attempt
				$(element).load(place, function (response, status, xhr) {
					if (status == 'error') {
						var msg = 'An error appeared: ';
						console.error(msg + xhr.status + ' ' + xhr.statusText);
					} else if (status == 'success') {
						var msg = 'Success!';
						console.log(msg + xhr.status + ' ' + xhr.statusText);
					}
				});
				
			} else if (arguments.length == 2) {
				
				var markup = arguments[1];
				
				$(element).html(markup);
			}
			
		};
		
		
	}
	
	/**
	 * Dimension class
	 */
	function Dimension() {
		
		this.width = 0;
		this.height = 0;
		this.length = 0;
		this.maxArgs = 3;
		
		var activatedMsg = 'A new Dimension object has been created!\n';
		console.log(activatedMsg);
		
		// Argument handlers
		switch (arguments.length) {
			case 3:
				this.width = arguments[0];
				this.height = arguments[1];
				this.length = arguments[2];
				var msg = activatedMsg + "\twidth: " + this.width + "\n\theight: " + this.height + "\n\tlength: " +  this.length;
				console.log(msg + separator);
				break;
			case 2:
				this.width = arguments[0];
				this.height = arguments[1];
				var msg = activatedMsg + "\twidth: " + this.width + "\n\theight: " + this.height + "\n\tlength: " + this.length;
				console.log(msg + separator);
				break;
			case 1:
				this.width = arguments[0];
				this.height = this.width;
				this.length = this.width;
				var msg = activatedMsg + "\twidth: " + this.width + "\n\theight: " +  this.height + "\n\tlength: " + this.length;
				console.log(msg + separator);
				break;
			case 0:
				var msg = 'A new dimension object has been created with no arguments!' + separator;
				console.log(msg);
				break;
			default:
				var msg = 'Dimension can only take a maximum of ' + this.maxArgs + ' arguments.';
				console.error(msg);
				break;
		}
		
		// ========== Getters ==========
		this.getWidth = function () {
			msg = 'Getting the width of the selected object...';
			console.log(msg);
			return this.width;
		};
		
		this.getHeight = function () {
			msg = 'Getting the height of the selected object...';
			console.log(msg);
			return this.height;
		};
		
		this.getLength = function () {
			msg = 'Getting the length of the selected object...';
			console.log(msg);
			return this.length;
		};
		
		// ========== Setters ==========
		this.setWidth = function (width) {
			var msg = 'Setting the width of the current object to ' + width + 'px...';
			console.log(msg);
			this.width = width;
		};
		
		this.setHeight = function (height) {
			var msg = 'Setting the height of the current object to ' + height + 'px...';
			console.log(msg);
			this.height = height;
		};
		
		this.setLength = function (length) {
			var msg = 'Setting the length of the current object to ' + length + 'px...';
			console.log(msg);
			this.height = height;
		};
		
	}
	
	/**
	 * CustomImage class
	 */
	function CustomImage() {
		var activatedMsg = 'A new CustomImage object has been created!';
		console.log(activatedMsg);
		
		// Show
		this.show = function (src, unhashedID, alt, isDraggable) {
			
			var msg = 'Showing a custom image...' + separator;
			var draggable = '';
			
			console.log(msg);
			
			if (isDraggable == true) {
				draggable = 'draggable';
			}
			
			var result = '<img src="' + src + '" id="' + unhashedID + '" alt="' + alt + '" draggable="' + draggable + '" />';
			
			return result;
		};
		
	}
	
	/**
	 * Shuffler class
	 */
	function Shuffler() {
		
		var activatedMsg = 'New Shuffler object created!!' + separator;
		
		console.log(activatedMsg);
		
		this.shuffle = function (type, array) {
			
			if (type == 'fisherYates') {
				
				var msg = 'Shuffling with the Fisher-Yates algorithm...';
				
				console.log(msg);
				
				// Here we go!
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
			
			msg = 'Finished shuffling!';
			
			console.log(msg);
			
		};
	}
	
	/**
	 * Table class
	 */
	function Table() {
		
		var activatedMsg = 'New Table object created!' + separator;
		
		console.log(activatedMsg);
		
		/**
		 * Table maker
		 */
		this.make = function (id, rows, cols, dataArray, random) {
			var msg = 'Making a new table...';
			
			console.log(msg);
			
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
	
	// More classes if needed
});
