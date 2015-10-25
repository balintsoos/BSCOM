var Section = require('./Section.js');

module.exports = function (App) {
  return [
    new Section(
    	App,
      'aboutme',
      'About Me',
      'About Me',
      'color1'
    ),
    new Section(
    	App,
      'work',
      'Work',
      "I've worked with",
      'color2'
    ),
    new Section(
    	App,
      'projects',
      'Projects',
      'My recent projects',
      'color3'
    )
  ];
};