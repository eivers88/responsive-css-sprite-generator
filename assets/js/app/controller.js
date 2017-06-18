export default class Controller {
  /**
   * @param  {!Store} store A Store instance
   * @param  {!View} view A View instance
   */
  constructor(store, view) {

    this.store = store;
    this.view = view;

    this.view.bindFileExplorer(this.addImages.bind(this));
    this.view.bindDropboxImages(this.addImages.bind(this));

    console.log(this)

  }

  addImages (files) {
    console.log(files);
  }

}
