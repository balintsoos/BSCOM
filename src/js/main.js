'use strict';

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
  App.navPanelState = ko.observable(false);

  // Initialize sections
  App.sections(init(App));

  // Functions
  App.smoothScroll = function (id) {
    $('html, body').animate({
      scrollTop: $(id).offset().top
    }, 1000);
  }

  App.goTo = function (id) {
    App.smoothScroll(id);
    if (App.navPanelState()) {
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

  App.iconHandler = function (iconId, options) {
    var iconElement = document.getElementById(iconId);
    iconate(iconElement, options);
  }

  App.scrollArrow = function (iconId) {
    var options = {
      from: 'fa-chevron-down',
      to: 'fa-chevron-down',
      animation: 'fadeOutBottom',
    }
    App.iconHandler(iconId, options);
  }

  App.toggleNav = function () {
    var options = {
      from: '',
      to: '',
      animation: 'verticalFlip',
    }

    if (App.navPanelState()) {
      options.from = 'fa-times';
      options.to = 'fa-bars';
    } else {
      options.to = 'fa-times';
      options.from = 'fa-bars';
    }

    App.iconHandler('hamburger', options);
    App.navPanelHandler();
  }

  App.navPanelHandler = function () {
    $('.bs-nav-mobile').slideToggle(300, "swing", function () {
      App.navPanelState(!App.navPanelState());
    });
  }

  // Helper function
  App.setSelectedItem = function (id) {
    App.sections().forEach(function (section) {
      if (section.id === id) {
        return App.selectedItem(section);
      }
    });
  };

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
}

ko.applyBindings(new AppViewModel());
