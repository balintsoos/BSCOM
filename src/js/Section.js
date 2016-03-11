'use strict';

var ko = require('knockout');
require('waypoints');

module.exports = function (App, config) {
  if (!App || typeof App !== 'object') {
    return new Error('Section.js - App object is missing');
  }

  if (!config || typeof App !== 'object') {
    return new Error('Section.js - config object is missing');
  }

  if (App === {} || config === {}) {
    return new Error('Section.js - empty parameter objects');
  }

  if (!config.id || !config.title || !config.header) {
    return new Error('Section.js - config object is not complete');
  }

  this.id = config.id;
  this.title = config.title;
  this.header = config.header;

  this.isSelected = ko.computed(function () {
    return App.selectedItem().id === config.id;
  });

  this.waypoints = {
    top: new Waypoint({
      element: document.getElementById(config.id),
      handler: function () {
        App.setSelectedItem(config.id);
      },
      offset: '20%',
    }),

    bottom: new Waypoint({
      element: document.getElementById(config.id),
      handler: function () {
        App.setSelectedItem(config.id);
      },
      offset: '-50%',
    })
  };
};
