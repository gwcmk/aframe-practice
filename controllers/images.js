'use strict';
const views = require('co-views');
const parse = require('co-body');

const render = views(__dirname + '/../views', {
  map: { html: 'swig' }
});

module.exports.aframe = function *aframe(image) {
  this.body = yield render('aframe', { 'path': `../img/${image}` });
};

module.exports.helloworld = function *helloworld(image) {
  this.body = yield render('helloworld', {});
};

