'use strict';

var expect = require('chai').expect;
var Section = require('./Section');

describe('Section', function () {
  describe('without parameters', function () {
    it('should return an error', function () {
      expect(new Section()).to.throw(Error);
    });
  });

  describe('with', function () {
    describe('1 string parameter', function () {
      it('should return an error', function () {
        expect(new Section('param')).to.throw(Error);
      });
    });

    describe('2 string parameters', function () {
      it('should return an error', function () {
        expect(new Section('param', 'param')).to.throw(Error);
      });
    });

    describe('1 number parameter', function () {
      it('should return an error', function () {
        expect(new Section(5)).to.throw(Error);
      });
    });

    describe('2 number parameters', function () {
      it('should return an error', function () {
        expect(new Section(5, 5)).to.throw(Error);
      });
    });

    describe('1 empty object parameter', function () {
      it('should return an error', function () {
        expect(new Section({})).to.throw(Error);
      });
    });

    describe('2 empty object parameters', function () {
      it('should return an error', function () {
        expect(new Section({}, {})).to.throw(Error);
      });
    });

    describe('valid parameters', function () {
      it('should return an error', function () {
        var App = {
          selectedItem: function () {},
          setSelectedItem: function () {}
        };

        var config = {
          id: 'id',
          title: 'title',
          header: 'header'
        };

        expect(new Section(App, config)).to.eql({});
      });
    });
  });
});
