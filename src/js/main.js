var $         = require('jquery');
var ko        = require('knockout');
var init      = require('./init.js');
var iconate   = require('iconate');

require('waypoints');
require('parallax');

function AppViewModel () {
  var App = this;

  // Observables
  App.isSticky      = ko.observable(false);
  App.sections      = ko.observableArray();
  App.selectedItem  = ko.observable({});

  // Functions
  App.smoothScroll = function (id) {
    $('html, body').animate({
      scrollTop: $(id).offset().top
    }, 1000);
  }

  App.goHome = function () {
    App.smoothScroll("#home");
    if (showNav) {
      App.toggleNav();
    }
  };

  App.selectItem = function (item) {
    App.selectedItem(item);
    App.smoothScroll("#" + item.id);
  };

  App.selectItemAtMobile = function (item) {
    App.selectItem(item);
    App.toggleNav();
  };

  App.toggleNav = function () {
    App.iconate();
    $(".nav-mobile").slideToggle(300, "swing", function() {
      showNav = !showNav;
    });
  }

  // Helper function
  App.setSelectedItem = function(id) {
    App.sections().forEach(function (section) {
      if (section.id === id) {
        App.selectedItem(section);
      }
    });
  };

  // Initialize sections
  App.sections(init(App));

  // hide mobile menu
  $(".nav-mobile").hide();
  var showNav = false;

  // create waypoints for Home section
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

  var iconElement = document.getElementById('iconate');

  App.iconate = function () {
    var options = {
      from: '',
      to: '',
      animation: 'verticalFlip',
    }
    if (showNav) {
      options.from = 'fa-times';
      options.to = 'fa-bars';
    } else {
      options.to = 'fa-times';
      options.from = 'fa-bars';
    }
    iconate(iconElement, options);
  }
}

ko.applyBindings(new AppViewModel());
