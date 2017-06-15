import Store from './store';
import View from './view';
import Controller from './controller';

/**
 * App structure inspired by https://github.com/tastejs/todomvc/tree/gh-pages/examples/vanilla-es6
 * */

let app = {

  start: function () {

    console.log('app started');

    let store = new Store('responsive-css-sprite-generator');
    let view = new View();

    new Controller(store, view);

  }


};

export default app;
