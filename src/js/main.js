
function AppViewModel () {
	var self = this;

	self.headerTitle = ko.observable("Balint Soos");
	self.isSticky = ko.observable(false);
	self.sections = ko.observableArray();
	self.selectedItem = ko.observable({});

	self.selectItem = function (item) {
		location.href = "#" + item.id;
		self.selectedItem(item);
	};

	self.goHome = function () {
		location.href = "#home";
	};

	var wpHome = new Waypoint({
		element: document.getElementById('home'),
		handler: function () {
			self.selectedItem({});
		},
		offset: '-50%',
	});

	var wpSticky = new Waypoint({
		element: document.getElementById('aboutme'),
		handler: function () {
			if(self.isSticky()) {
				self.isSticky(false);
			} else {
				self.isSticky(true);
			}
		},
		offset: -1,
	});

	var secItem  = function (id, title, header, icon, content) {
		var obj 				= {};
		obj.id 					= id;
		obj.title 			= title;
		obj.header 			= header;
		obj.icon 				= icon;
		obj.content 		= content;
		obj.isSelected 	= ko.computed(function () {
			return (self.selectedItem().id === id);
		});
		obj.wpTop = new Waypoint({
			element: document.getElementById(id),
			handler: function () {
				self.setSelectedItem(id);
			},
			offset: '20%',
		});
		obj.wpBottom = new Waypoint({
			element: document.getElementById(id),
			handler: function () {
				self.setSelectedItem(id);
			},
			offset: '-50%',
		});
		return obj;
	};

	self.setSelectedItem = function (id) {
		self.sections().forEach(function (section) {
			if (section.id === id) {
				self.selectedItem(section);
			}
		});
	};

	self.init = function () {
		self.sections([
			secItem(
				'aboutme',
				'About Me',
				'About Me'
			),
			secItem(
				'work',
				'Work',
				"I've worked with"
			),
			secItem(
				'projects',
				'Projects',
				'My recent projects'
			),
			secItem(
				'contact',
				'Contact',
				'Contact with me'
			)
		]);
	};
	
	self.init();
}

ko.applyBindings(new AppViewModel());
