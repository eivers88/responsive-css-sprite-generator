export default class Controller {
  /**
   * @param  {!Store} store A Store instance
   * @param  {!View} view A View instance
   */
  constructor(store, view) {

    this.store = store;
    this.view = view;

    console.log(this)

  }
}
