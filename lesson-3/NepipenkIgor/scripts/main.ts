/// <reference path="./fetch.d.ts" />
import flikr = require('./flikr');
import config = require('./config');
import fetch = require('./fetchEvent');

let elem = <HTMLElement>document.querySelector('.flikr-box');
let flickr = new flikr.FlikrAppAsModuleHomework({
    elem: elem,
    uri: config.uri,
    queryMethod: 'flickr.photos.search',
    apiKey: config.apiKey
});
flickr.setSearchHandler = fetch;
