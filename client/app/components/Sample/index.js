import React, {Component} from 'react';
import async from 'async';



async.each([1,2,3], function(data,cb){cb()});

export default function () {
  return(<div className="unique">Hello World!</div>);
}