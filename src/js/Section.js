var ko = require('knockout');

module.exports = function (App, id, title, header, bg, content) {
  var Section = {
    id:       id,
    title:    title,
    header:   header,
    bg:       bg,
    content:  content
  };
  
  Section.isSelected = ko.computed(function () {
    return (App.selectedItem().id === id);
  });
  
  Section.waypoints = {
    wpTop: new Waypoint({
      element: document.getElementById(id),
      handler: function () {
        App.setSelectedItem(id);
      },
      offset: '20%',
    }),

    wpBottom: new Waypoint({
      element: document.getElementById(id),
      handler: function () {
        App.setSelectedItem(id);
      },
      offset: '-50%',
    })
  };
  
  return Section;
};