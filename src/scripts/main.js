var bespoke = require('bespoke'),
  voltaire = require('bespoke-theme-voltaire'),
  keys = require('bespoke-keys'),
  touch = require('bespoke-touch'),
  bullets = require('bespoke-bullets'),
  scale = require('bespoke-scale'),
  state = require('bespoke-state'),
  hash = require('bespoke-hash'),
  progress = require('bespoke-progress'),
  camera = require('./camera');

bespoke.from('article', [
  voltaire(),
  keys(),
  touch(),
  bullets('ul:not(.no-bullets) li, ol:not(.no-bullets) li, .bullet'),
  scale(),
  state(),
  hash(),
  progress(),
  camera()
]);

require('prism');
