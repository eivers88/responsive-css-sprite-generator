export default class TexturePacker {

  constructor(canvas) {

    this.canvas = canvas;
    this.textures = [];

  }

  addTexture(texture) {
    this.textures.push(texture);
  }

  sort() {
    console.log('sort', this.textures);
  }

}
