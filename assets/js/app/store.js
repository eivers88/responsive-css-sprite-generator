const localStorage = window.localStorage;
let instance = null;
let defaultSettings = {
  prefix:'',
  padding: 2,
  path: 'sprite.png'
};

export default class Store {
  /**
   * @param {!string} name Database name
   * @param {function()} [callback] Called when the Store is ready
   */
  constructor(name, callback) {

    if(!instance) {
      instance = this;
    } else {
      return instance;
    }

    // init settings
    if(localStorage.getItem(name)) {
      // TODO: Check this object
      this.settings = JSON.parse(localStorage.getItem(name));
    } else {
      this.settings = defaultSettings;
      localStorage.setItem(name, JSON.stringify(this.settings));
    }

    this.name = name;
    this.id = 0;
    this.blocks = [];
    this.loaded = 0;
    this.loadInProgress = false;

    console.log('store init', this.settings);

    if(callback){
      callback();
    }

  }

  getSettings () {
    return this.settings;
  }

  saveSettings (settings) {
    // TODO: Check this object
    this.settings = settings;
    localStorage.setItem(this.name, JSON.stringify(settings));
  }

}
