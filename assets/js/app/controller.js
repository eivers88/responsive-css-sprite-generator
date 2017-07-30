import TexturePacker from './texture-packer';

export default class Controller {
  /**
   * @param  {!Store} store A Store instance
   * @param  {!View} view A View instance
   */
  constructor(store, view) {

    this.imgQueued = 0;
    this.imgLoaded = 0;
    this.loadInProgress = false;

    this.store = store;
    this.view = view;

    this.view.setSettingsValues(this.store.getSettings());

    this.view.bindFileExplorer(this.addImages.bind(this));
    this.view.bindDropboxImages(this.addImages.bind(this));
    this.view.bindRemoveBtn(this.removeImage.bind(this));
    this.view.bindSettingsInputs(this.updateSettingsValues.bind(this));

    this.texturePacker = new TexturePacker(this.view.$canvas);

    // console.log(this)

  }

  addImages (data) {

    if(this.loadInProgress) {
      console.log('Cannot add images while load is in progress');
      return;
    }

    let files = [];

    // add only image files to our file list
    for(let prop in data) {
      if(data[prop].type === "image/png" || data[prop].type === "image/jpeg") {
        files.push(data[prop]);
      }
    }

    if(files.length === 0) {
      return;
    }

    this.loadInProgress = true;
    this.imgQueued += files.length;

    for(let i = 0; i < files.length; i++) {

      this.view.addListItem({
        id: this.store.getNewId(),
        src: window.URL.createObjectURL(files[i]),
        name: files[i].name.substring(0, files[i].name.indexOf('.')),
        onLoadSuccess: this.onLoadSuccess.bind(this)
      });

    }

  }

  removeImage (e) {
    if(this.loadInProgress) {
      console.log('Cannot remove image while load is in progress');
      return;
    }
    if(e.target && e.target.classList.contains('remove')) {
      e.target.parentNode.parentNode.removeChild(e.target.parentNode);
      // TODO: update texture packer
    }
  }


  onLoadSuccess (texture) {
    // TODO: Pass on to our texture packer
    // console.log('onLoadSuccess', texture);

    this.texturePacker.addTexture(texture);

    this.imgLoaded++;

    if(this.imgLoaded === this.imgQueued) {
      this.loadComplete();
    }

  }

  loadComplete () {
    console.log('all files loaded!');
    this.loadInProgress = false;
    this.imgQueued = 0;
    this.imgLoaded = 0;
    // TODO: Sort and generate our sprite sheet
    this.texturePacker.sort();
  }

  updateSettingsValues (settings) {
    console.log('update input values', settings);
    this.store.saveSettings(settings);
  }

}
