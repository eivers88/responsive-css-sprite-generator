export default class Controller {
  /**
   * @param  {!Store} store A Store instance
   * @param  {!View} view A View instance
   */
  constructor(store, view) {

    this.store = store;
    this.view = view;

    this.view.setSettingsValues(this.store.getSettings());

    this.view.bindFileExplorer(this.addImages.bind(this));
    this.view.bindDropboxImages(this.addImages.bind(this));
    this.view.bindSettingsInputs(this.updateSettingsValues.bind(this));

    console.log(this)

  }

  addImages (files) {
    console.log(files);

    for(let i = 0; i < files.length; i++) {
      this.view.addListItem({
        id: i, // TODO: Make real id
        src: window.URL.createObjectURL(files[i]),
        name: files[i].name.substring(0, files[i].name.indexOf('.'))
      });
    }

    // TODO: bind on image load

  }

  updateSettingsValues (settings) {
    console.log('update input values', settings);
    this.store.saveSettings(settings);
  }

}
