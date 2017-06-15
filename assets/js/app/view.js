let instance = null;

export default class View {

  constructor() {

    if(!instance) {
      instance = this;
    } else {
      return instance;
    }

    this.fileInput = document.getElementById("fileElem");
    this.fileList = document.getElementById("fileList");
    this.listItems = document.createElement('ul');
    this.prefix = document.getElementById("prefix");
    this.padding = document.getElementById("padding");
    this.path = document.getElementById("path");
    this.canvas = document.getElementById("canvas");
    this.css = document.getElementById("css");
    this.dimensions = document.getElementById("dimensions");
    this.dropbox = document.getElementById("dropbox");
    this.fileList.appendChild(this.listItems);

  }

}
