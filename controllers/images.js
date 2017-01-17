'use strict';
const views = require('co-views');
const parse = require('co-body');
const db = require('monk')('localhost/aframe');
const stories = db.get('stories');

const render = views(__dirname + '/../views', {
  map: { html: 'swig' }
});

module.exports.aframe = function *aframe(image) {
  this.body = yield render('aframe', { 'path': `../img/${image}` });
};

module.exports.helloworld = function *helloworld(image) {
  this.body = yield render('helloworld', {});
};

// show form to create new story
module.exports.newStory = function *newStory() {
  let results = yield stories.findOne({});
  this.body = yield render('story/new', {});  
};

// function to create new story
module.exports.create = function *create() {
  var input = yield parse(this);
  let story = yield stories.insert({
    title: input.title,
    author: input.author,
    image_path: input.image
  });
  console.log(story);
  this.redirect(`story/${story._id}`)
};

// show story
module.exports.show = function *show(id) {
  let story = yield stories.findOne({ _id: id });
  this.body = yield render('story/show', {
    title: story.title,
    author: story.author,
    imagePath: story.image_path
  });
};
