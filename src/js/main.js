var $         = require('jquery');
var ko        = require('knockout');
var iconate   = require('iconate');
var init      = require('./init.js');

function AppViewModel () {
  var App = this;

  App.headerTitle = ko.observable("Balint Soos");
  App.isSticky = ko.observable(false);
  App.sections = ko.observableArray();
  App.selectedItem = ko.observable({});

  $(".nav-mobile").hide();
  var showNav = false;

  var waypoints = {
    wpHome: new Waypoint({
      element: document.getElementById('home'),
      handler: function () {
        App.selectedItem({});
      },
      offset: '-50%',
    }),
    wpSticky: new Waypoint({
      element: document.getElementById('home'),
      handler: function () {
        App.isSticky(!App.isSticky());
      },
      offset: -1,
    }),
  };

  App.goHome = function () {
    location.href = "#home";
    if(showNav) {
      setTimeout(App.toggleNav, 400);
    }
  };

  App.selectItemAtMobile = function (item) {
    App.selectItem(item);
    setTimeout(App.toggleNav, 400);
  };

  App.selectItem = function (item) {
    App.selectedItem(item);
    location.href = "#" + item.id;
  };

  App.setSelectedItem = function(id) {
    App.sections().forEach(function (section) {
      if (section.id === id) {
        App.selectedItem(section);
      }
    });
  };
  
  App.toggleNav = function () {
    App.iconate();
    $(".nav-mobile").slideToggle(300, "swing", function() {
      showNav = !showNav;
    });
  }

  var iconElement = document.getElementById('iconate');
  App.iconate = function () {
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
  
  App.sections(init(App));
}

ko.applyBindings(new AppViewModel());
