var Section = require('./Section.js');

module.exports = function (App) {
  return [
    new Section(App, {
      id: 'aboutme',
      title: 'About',
      header: 'About Me'
    }),
    new Section(App, {
      id: 'work',
      title: 'Work',
      header: "I've worked with"
    }),
    new Section(App, {
      id: 'projects',
      title: 'Projects',
      header: 'My recent projects'
    }),
    new Section(App, {
      id: 'contact',
      title: 'Contact',
      header: 'Contact with Me'
    })
  ];
};
