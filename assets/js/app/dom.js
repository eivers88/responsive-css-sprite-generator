let dom = {
  fileInput: document.getElementById("fileElem"),
  fileList: document.getElementById("fileList"),
  listItems: document.createElement('ul'),
  prefix: document.getElementById("prefix"),
  padding: document.getElementById("padding"),
  path: document.getElementById("path"),
  canvas: document.getElementById("canvas"),
  css: document.getElementById("css"),
  dimensions: document.getElementById("dimensions"),
  dropbox: document.getElementById("dropbox")
};

dom.fileList.appendChild(dom.listItems);

export default dom;
