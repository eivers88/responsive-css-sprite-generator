export default class Store {
  /**
   * @param {!string} name Database name
   * @param {function()} [callback] Called when the Store is ready
   */
  constructor(name, callback) {

    // TODO: Hook up local storage

    this.id = 0;
    this.blocks = [];
    this.loaded = 0;
    this.loadInProgress = false;
    this.prefix = '';
    this.padding = 0;
    this.path = '';

    if(callback){
      callback();
    }

  }
}
