(function() {
	var NavItem = (function() {
		function NavItem (id, title, header, icon, content) {
			this.id 				= id;
			this.title 			= title;
			this.header 		= header;
			this.icon 			= icon;
			this.content 		= content;
			this.waypoints 	= {
				wpTop: new Waypoint({
					element: document.getElementById(id),
					handler: function () {
						setSelectedNavItem(id);
					},
					offset: '20%',
				}),
				wpBottom: new Waypoint({
					element: document.getElementById(id),
					handler: function () {
						setSelectedNavItem(id);
					},
					offset: '-50%',
				}),
			};
		}
		
		NavItem.prototype.isSelected = function() {
			return this.id === selectedNavItem;
		}

		return NavItem;
	})();

	var app = angular.module('bs', []);

	app.controller('navItemsController', function() {
		this.items = navItems;
	});

	app.controller('headerController', ['$scope', function($scope) {
		$scope.isSticky = false;

		var wpSticky = new Waypoint({
			element: document.getElementById('aboutme'),
			handler: function ($scope) {
				$scope.isSticky = !$scope.isSticky;
			},
			offset: -1,
		});
	}]);

	$(".nav-mobile").hide();
	var showNav = false;
	var selectedNavItem = "";
	var iconElement = document.getElementById('iconate');
	
	var wpHome = new Waypoint({
		element: document.getElementById('home'),
		handler: function () {
			setSelectedNavItem("");
		},
		offset: '-50%',
	});

	var setSelectedNavItem = function(id) {
		selectedNavItem = id;
	}

	var toggleNav = function() {
		initIconate();
		$(".nav-mobile").slideToggle(300, "swing", function() {
			showNav = !showNav;
		});
	}

	var initIconate = function () {
		var options = {
			from: '',
			to: '',
			animation: 'tada',
		}
		if(showNav) {
			options.from = 'fa-times';
			options.to = 'fa-bars';
		} else {
			options.to = 'fa-times';
			options.from = 'fa-bars';
		}
		iconate(iconElement, options);
	}

	var navItems = [
		new NavItem(
			'aboutme',
			'About Me',
			'...but I do',
			'fa-user'
		),
		new NavItem(
			'work',
			'Work',
			"I've worked with",
			'fa-code'
		),
		new NavItem(
			'projects',
			'Projects',
			'My recent projects',
			'fa-archive'
		),
		new NavItem(
			'contact',
			'Contact',
			'Contact with me',
			'fa-comments'
		)
	];
})();