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
    this.textures = [];

    this.root = {
      x: 0, // origin x
      y: 0, // origin y
      w: 256 - padding, // width
      h: 256 - padding, // height
      p: padding
    };

    this.prefix = prefix;
    this.path = path;

    console.log('packer', this);

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
    let ctx = canvas.getContext('2d');
    let pad = this.root.p;
    let width = this.root.w + pad;
    let height = this.root.h + pad;

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
      }
    }

  }

  update() {
    // TODO: Update texture packer when settings change or images are added/removed
  }

}
