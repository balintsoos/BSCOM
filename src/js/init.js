var Section = require('./Section.js');

module.exports = function (App) {
  return [
    new Section(
    	App,
      'aboutme',
      'About Me',
      'About Me',
      'fa-user'
    ),
    new Section(
    	App,
      'work',
      'Work',
      "I've worked with",
      'fa-code'
    ),
    new Section(
    	App,
      'projects',
      'Projects',
      'My recent projects',
      'fa-archive'
    ),
    new Section(
    	App,
      'contact',
      'Contact',
      'Contact with me',
      'fa-comments'
    )
  ];
};