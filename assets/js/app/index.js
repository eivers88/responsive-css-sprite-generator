// import dom from './dom';
import dropbox from './dropbox';
import debounce from './utilities/debounce';

let app = {

  loadInProgress: false,
  prefix:'',
  padding:0,
  path:'',

  start: function () {

    console.log('app started');

    dropbox.init();

    window.addEventListener('resize', debounce(() => {
      console.log('resize');
    }, 250));

  }


};

export default app;
