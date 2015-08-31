function secItem (id, title, header, icon, content) {
	var obj = {};

	return {
		id: id,
		title: title,
		header: header,
		icon: icon,
		content: content,
		isSelected: ko.computed(function () {

		})
	}
}

function AppViewModel () {
	var self = this;

	self.headerTitle = ko.observable("Balint Soos");
	self.sections = ko.observableArray();
	self.selectedItem = ko.observable();

	self.selectItem = function (item) {
		console.log(item);
		self.selectedItem(item);
		location.href = "#" + item.id;
	}

	self.goHome = function () {
		location.href = "#home";
	}

	self.init = function () {
		self.sections([
			secItem(
				'aboutme',
				'About Me',
				'About Me',
				'fa fa-user fa-2x'
			),
			secItem(
				'work',
				'Work',
				"I've worked with",
				'fa fa-code fa-2x'
			),
			secItem(
				'projects',
				'Projects',
				'My recent projects',
				'fa fa-archive fa-2x'
			),
			secItem(
				'contact',
				'Contact',
				'Contact with me',
				'fa fa-comments fa-2x'
			)
		]);
	}

	self.init();
}

ko.applyBindings(new AppViewModel());