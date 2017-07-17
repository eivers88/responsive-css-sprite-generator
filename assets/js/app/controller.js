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
    // TODO: Add a flag indicating file loads are currently in progress

    for(let i = 0; i < files.length; i++) {
      this.view.addListItem({
        id: this.store.getNewId(),
        src: window.URL.createObjectURL(files[i]),
        name: files[i].name.substring(0, files[i].name.indexOf('.')),
        onLoadSuccess: this.onLoadSuccess.bind(this)
      });
    }

  }

  onLoadSuccess (candidate) {
    console.log(candidate);
    // TODO: Check if all images have finished loading
    // TODO: Pass on to our texture packer
  }

  updateSettingsValues (settings) {
    console.log('update input values', settings);
    this.store.saveSettings(settings);
  }

}
