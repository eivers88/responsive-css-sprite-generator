const DEFAULT_SIZE = 256;
const GITHUB_URL = '/**\nResponsive CSS Sprite created using: ' +
  'https://responsive-css.us/\n' +
  '*/\n\n';

function findNode(root, w, h) {
  if (root.used) {
    return findNode(root.right, w, h) || findNode(root.down, w, h);
  } else if ((w <= root.w) && (h <= root.h)) {
    return root;
  } else {
    return null;
  }
}

function splitNode(node, w, h) {
  node.used = true;
  node.down = {x: node.x, y: node.y + h, w: node.w, h: node.h - h};
  node.right = {x: node.x + w, y: node.y, w: node.w - w, h: h};
  return node;
}

export default class TexturePacker {

  constructor(canvas, {padding, prefix, path}) {

    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    this.textures = [];

    this.root = {
      x: 0, // origin x
      y: 0, // origin y
      w: DEFAULT_SIZE - padding, // width
      h: DEFAULT_SIZE - padding, // height
      p: padding
    };

    this.prefix = prefix;
    this.path = path;

  }

  addTexture(texture) {
    this.textures.push(texture);
  }

  sort() {
    this.textures.sort((a, b) => {
      if (a.h < b.h) {
        return 1;
      }
      if (a.h > b.h) {
        return -1;
      }
      return 0;
    });
  }

  fit() {
    let i, node, texture, pad = this.root.p;
    for (i = 0; i < this.textures.length; i++) {
      texture = this.textures[i];
      texture.fit = false;
      node = findNode(this.root, texture.w + pad, texture.h + pad);
      if (node) {
        texture.fit = splitNode(node, texture.w + pad, texture.h + pad);
      }
      if (!texture.fit) {
        this.resize();
        break;
      }
    }
  }

  resize() {
    let w, h, pad = this.root.p;
    if (this.root.w > this.root.h) {
      w = (this.root.w + pad);
      h = (this.root.h + pad) * 2;
    } else {
      w = (this.root.w + pad) * 2;
      h = (this.root.h + pad);
    }
    this.root = {
      x: 0, // origin x
      y: 0, // origin y
      w: w - pad, // width
      h: h - pad, // height
      p: pad
    };
    this.fit();
  }

  draw() {

    // TODO: Calc CSS output

    let canvas = this.canvas;
    let ctx = this.ctx;
    let pad = this.root.p;
    let prefix = this.prefix;
    let width = this.root.w + pad;
    let height = this.root.h + pad;

    let computedCSS = '';
    let selectorsString = '';
    let globalString = '\n{display:inline-block; overflow:hidden; ' +
      'background-repeat: no-repeat;\n' +
      `background-image:url(${this.path});}\n\n`;
    let spriteString = '';

    canvas.width = width;
    canvas.height = height;

    ctx.clearRect(0, 0, width, height);

    this.textures.sort((a, b) => {
      let nameA = a.name.toUpperCase();
      let nameB = b.name.toUpperCase();
      return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
    });

    for(let i = 0; i < this.textures.length; i++) {
      let texture = this.textures[i];
      if(texture.fit) {

        // turn on for testing
        ctx.fillRect(texture.fit.x + pad, texture.fit.y + pad, texture.w, texture.h);
        ctx.stroke();

        ctx.drawImage(texture.img, texture.fit.x + pad, texture.fit.y + pad);

        selectorsString += '.' + prefix + texture.name + (i === this.textures.length - 1 ? ' ' : ', ');

        spriteString += `.${prefix + texture.name} {width: ${texture.w}px; ` +
          `height: ${texture.h}px; ` +
          `background-position: ${(((texture.fit.x + pad) / (width - texture.w)) * 100).toPrecision(6)}% ` +
          `${(((texture.fit.y + pad) / (height - texture.h)) * 100).toPrecision(6)}%; ` +
          `background-size: ${((width / texture.w) * 100).toPrecision(6)}%; }\n`;

      }
    }

    computedCSS = GITHUB_URL + selectorsString + globalString + spriteString;

    return computedCSS;
  }

  pack () {
    this.sort();
    this.fit();
    return this.draw();
  }

  remove (id) {

    for(let i = this.textures.length; i--;) {
      let texture = this.textures[i];
      if(texture.id === id) {
        this.textures.splice(i, 1);
        break;
      }
    }

    this.ctx.clearRect(0, 0, canvas.width, canvas.height);

    let pad = this.root.p;

    // reset the root
    this.root = {
      x: 0, // origin x
      y: 0, // origin y
      w: DEFAULT_SIZE - pad, // width
      h: DEFAULT_SIZE - pad, // height
      p: pad
    };

    return this.pack();

  }

  updateSettings({padding, prefix, path}) {

    this.ctx.clearRect(0, 0, canvas.width || DEFAULT_SIZE, canvas.height || DEFAULT_SIZE);

    this.root = {
      x: 0, // origin x
      y: 0, // origin y
      w: DEFAULT_SIZE - padding, // width
      h: DEFAULT_SIZE - padding, // height
      p: padding
    };

    this.prefix = prefix;
    this.path = path;

    return this.pack();

  }

}
