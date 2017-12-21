import {qs, $on, debounce} from './helpers';
let instance = null;

function scrollIntoView(eleID) {
  var e = qs(eleID).getBoundingClientRect();
  var h = qs('#header').getBoundingClientRect();
  window.scrollTo(0, e.top - h.height - 100);
}

export default class View {

  constructor(template) {

    if(!instance) {
      instance = this;
    } else {
      return instance;
    }

    this.template = template;
    this.$fileInput = qs('#fileElem');
    this.$fileList = qs('#fileList');
    this.$listItems = document.createElement('ul');
    this.$prefix = qs('#prefix');
    this.$padding = qs('#padding');
    this.$path = qs('#path');
    this.$canvas = qs('#canvas');
    this.$css = qs('#css');
    this.$copy = qs('#copy');
    this.$download = qs('#download');
    this.dimensions = qs('#dimensions');
    this.$dropbox = qs('#dropbox');
    this.$fileList.appendChild(this.$listItems);

    $on(this.$copy, 'click', ()=>{
      scrollIntoView('#css');
      ga('send', {
        hitType: 'event',
        eventCategory: 'Copy CSS',
        eventAction: 'click'
      });
    });

  }

  bindFileExplorer (handler) {

    $on(this.$dropbox, 'click', (e)=>{
      if(this.$fileInput) {
        this.$fileInput.click();
      }
      e.preventDefault();
      ga('send', {
        hitType: 'event',
        eventCategory: 'File Explorer',
        eventAction: 'click'
      });
    });

    $on(this.$fileInput, 'change', function(){
      handler(this.files);
    });

  }

  bindDropboxImages (handler) {

    $on(this.$dropbox, 'dragenter', (e)=>{
      e.stopPropagation();
      e.preventDefault();
    });

    $on(this.$dropbox, 'dragover', (e)=>{
      e.stopPropagation();
      e.preventDefault();
    });

    $on(this.$dropbox, 'drop', (e)=>{
      e.stopPropagation();
      e.preventDefault();

      let dt = e.dataTransfer;
      let files = dt.files;

      handler(files);

      ga('send', {
        hitType: 'event',
        eventCategory: 'File Drop',
        eventAction: 'drop'
      });

    });

  }

  bindSettingsInputs (handler) {

    let returnValues = () => {handler(this.getSettingsValues());};

    $on(this.$prefix, 'keyup', debounce(returnValues, 250, false));
    $on(this.$padding, 'keyup', debounce(returnValues, 250, false));
    $on(this.$path, 'keyup', debounce(returnValues, 250, false));

  }

  bindRemoveBtn (handler) {
    $on(this.$fileList, 'click', handler);
    ga('send', {
      hitType: 'event',
      eventCategory: 'Remove Image',
      eventAction: 'click'
    });
  }

  bindDownloadBtn(handler) {
    $on(this.$download, 'click', handler);
    ga('send', {
      hitType: 'event',
      eventCategory: 'Sprite Download',
      eventAction: 'click'
    });
  }

  setSettingsValues (settings) {
    this.$prefix.value = settings.prefix;
    this.$padding.value = settings.padding;
    this.$path.value = settings.path;
  }

  getSettingsValues () {
    let p = parseInt(this.$padding.value);
    return {
      'prefix': this.$prefix.value,
      'padding': Number.isInteger(p) ? p : 0,
      'path': this.$path.value
    };
  }

  addListItem(item) {
    let li = this.template.listItem(item);
    this.$listItems.appendChild(li);
  }

  setCSSValue (css) {
    this.$css.value = css;
    if(css !== '') {
      this.$dropbox.classList.remove('is-empty');
    } else  {
      this.$dropbox.classList.add('is-empty');
    }
  }

}
