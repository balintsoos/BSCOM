function crtSec (name, title) {
	return {
		name: name,
		title: title,
	}
}

function AppViewModel () {
	var self = this;

	self.headerTitle = ko.observable("Balint Soos");
	self.menuItems = ko.observableArray();

	self.selectItem = function (item) {
		console.log(item);
	}

	self.init = function () {
		self.menuItems([
			crtSec('aboutme', 'About Me'),
			crtSec('work', 'Work'),
			crtSec('projects', 'Projects'),
			crtSec('contact', 'Contact'),
		]);
	}

	self.init();
}

ko.applyBindings(new AppViewModel());