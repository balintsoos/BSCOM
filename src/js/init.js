'use strict';

var Section = require('./Section.js');

module.exports = function (App) {

  var sections = [
    {
      id: 'aboutme',
      title: 'About',
      header: 'About Me'
    },
    {
      id: 'work',
      title: 'Work',
      header: "I've worked with"
    },
    {
      id: 'projects',
      title: 'Projects',
      header: 'My recent project'
    },
    {
      id: 'contact',
      title: 'Contact',
      header: 'Get in touch'
    }
  ];

  return sections.forEach(function (config) {
    return new Section(App, config);
  });
};
