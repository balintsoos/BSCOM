var ko = require('knockout');
require('waypoints');

module.exports = function (App, obj) {
  var Section = {
    id:       obj.id,
    title:    obj.title,
    header:   obj.header,
    bg:       obj.bg
  };

  Section.isSelected = ko.computed(function () {
    return (App.selectedItem().id === obj.id);
  });

  Section.waypoints = {
    wpTop: new Waypoint({
      element: document.getElementById(obj.id),
      handler: function () {
        App.setSelectedItem(obj.id);
      },
      offset: '20%',
    }),

    wpBottom: new Waypoint({
      element: document.getElementById(obj.id),
      handler: function () {
        App.setSelectedItem(obj.id);
      },
      offset: '-50%',
    })
  };

  return Section;
};
