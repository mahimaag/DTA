require('babel-register')();

import jsdom from 'jsdom';

var exposedProperties = ['window', 'navigator', 'document'];

const dom = new jsdom.JSDOM('<!DOCTYPE html><html><head></head><body></body></html>');

global.window = dom.window;
global.document = dom.window.document;

global.navigator = {
  userAgent: 'node.js'
};

//documentRef = document;
/*

const dom = new jsdom.JSDOM('<!DOCTYPE html><html><head></head><body></body></html>');

global.window = dom.window;
global.document = dom.window.document;*/
