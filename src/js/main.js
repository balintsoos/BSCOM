var $       = require('jquery');
var ko      = require('knockout');
//var iconate = require('iconate');

function AppViewModel () {
  var self = this;

  self.headerTitle = ko.observable("Balint Soos");
  self.isSticky = ko.observable(false);
  self.sections = ko.observableArray();
  self.selectedItem = ko.observable({});

  $(".nav-mobile").hide();
  var showNav = false;

  var waypoints = {
    wpHome: new Waypoint({
      element: document.getElementById('home'),
      handler: function () {
        self.selectedItem({});
      },
      offset: '-50%',
    }),
    wpSticky: new Waypoint({
      element: document.getElementById('aboutme'),
      handler: function () {
        if(self.isSticky()) {
          self.isSticky(false);
        } else {
          self.isSticky(true);
        }
      },
      offset: -1,
    }),
  };

  self.goHome = function () {
    location.href = "#home";
    if(showNav) {
      setTimeout(self.toggleNav, 400);
    }
  };

  self.selectItemAtMobile = function (item) {
    self.selectItem(item);
    setTimeout(self.toggleNav, 400);
  };

  self.selectItem = function (item) {
    self.selectedItem(item);
    location.href = "#" + item.id;
  };

  self.setSelectedItem = function(id) {
    self.sections().forEach(function (section) {
      if (section.id === id) {
        self.selectedItem(section);
      }
    });
  };
  
  self.toggleNav = function () {
    self.iconate();
    $(".nav-mobile").slideToggle(300, "swing", function() {
      showNav = !showNav;
    });
  }

  var iconElement = document.getElementById('iconate');
  self.iconate = function () {
    var options = {
      from: '',
      to: '',
      animation: 'verticalFlip',
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

  var secItem  = function (id, title, header, icon, content) {
    var obj         = {};
    obj.id          = id;
    obj.title       = title;
    obj.header      = header;
    obj.icon        = icon;
    obj.content     = content;
    obj.isSelected  = ko.computed(function () {
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
  
  var init = function () {
    self.sections([
      secItem(
        'aboutme',
        'About Me',
        'About Me',
        'fa-user'
      ),
      secItem(
        'work',
        'Work',
        "I've worked with",
        'fa-code'
      ),
      secItem(
        'projects',
        'Projects',
        'My recent projects',
        'fa-archive'
      ),
      secItem(
        'contact',
        'Contact',
        'Contact with me',
        'fa-comments'
      )
    ]);
  };

  init();
}

ko.applyBindings(new AppViewModel());
