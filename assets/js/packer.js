
function Packer(pad, pre, path) {
    this.init(pad, pre, path)
}

Packer.prototype = {

    init: function (pad, pre, path) {
        var padding = isNumeric(pad) ? pad : 2;
        padding = Math.round(Math.abs(padding));
        this.root = {
            x: 0, // origin x
            y: 0, // origin y
            w: 256 - padding, // width
            h: 256 - padding, // height
            p: padding
        };
        this.prefix = pre;
        //this.prefix = this.prefix.replace(/ /g, '');
        this.path = path;
    },

    sort: function (blocks) {
        blocks.sort(function (a, b) {
            // should this be sorted by height?
            if (a.h < b.h) {
                return 1;
            }
            if (a.h > b.h) {
                return -1;
            }
            return 0;
        });
    },

    fit: function (blocks) {
        var n, node, block, p = this.root.p;
        for (n = 0; n < blocks.length; n++) {
            block = blocks[n];
            block.fit = false; // reset
            if (node = this.findNode(this.root, block.w + p, block.h + p)) {
                block.fit = this.splitNode(node, block.w + p, block.h + p);
            }
            if(!block.fit){
                this.resize(blocks);
                break;
            }
        }
    },

    resize: function(blocks){
        var w, h, p = this.root.p;
        if(this.root.w > this.root.h){
            w = (this.root.w + p);
            h = (this.root.h + p) * 2;
        } else {
            w = (this.root.w + p) * 2;
            h = (this.root.h + p);
        }
        this.root = {
            x: 0, // origin x
            y: 0, // origin y
            w: w - p, // width
            h: h - p, // height
            p: p
        };
        this.fit(blocks);
    },

    findNode: function (root, w, h) {
        if (root.used)
            return this.findNode(root.right, w, h) || this.findNode(root.down, w, h);
        else if ((w <= root.w) && (h <= root.h))
            return root;
        else
            return null;
    },

    splitNode: function (node, w, h) {
        node.used = true;
        node.down = {x: node.x, y: node.y + h, w: node.w, h: node.h - h};
        node.right = {x: node.x + w, y: node.y, w: node.w - w, h: h};
        return node;
    },

    draw: function (blocks, canvas, output) {
        var ctx = canvas.getContext('2d');
        var gitubUrl = '/*\nResponsive CSS Sprite created using: ' +
            'http://responsive-css.us/\n' +
            '*/\n\n';
        var groupSelectors = '';
        var globalStyle = '\n{display:inline-block; overflow:hidden; ' +
            'background-repeat: no-repeat;\n' +
            'background-image:url(' + this.path + ');}\n\n';
        var spriteStyle = '';
        var p = this.root.p; // padding
        var width = this.root.w + p;
        var height = this.root.h + p;
        var b; // block
        canvas.width = width;
        canvas.height = height;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // sort blocks alphabetically
        blocks.sort(function(a,b){
            var nameA = a.name.toUpperCase();
            var nameB = b.name.toUpperCase();
            return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
        });

        for (var n = 0; n < blocks.length; n++) {
            b = blocks[n];
            if (b.fit) {
                // turn on for testing
                // ctx.fillRect(b.fit.x + p, b.fit.y + p, b.w, b.h);
                // ctx.stroke();
                ctx.drawImage(b.img, b.fit.x + p, b.fit.y + p);
                // add comma if not the last style
                groupSelectors += '.' + this.prefix + b.name + (n === blocks.length - 1 ? ' ' : ', ');
                // individual sprite style
                spriteStyle += '.' + this.prefix + b.name +
                    ' {width:' + (b.w) + 'px; ' +
                    'height:' + (b.h) + 'px; ' +
                    'background-position:' + (((b.fit.x + p) / (width - (b.w))) * 100).toPrecision(6) + '% ' +
                    (((b.fit.y + p) / (height - (b.h))) * 100).toPrecision(6) + '%; ' +
                    'background-size:' + ((width / (b.w)) * 100).toPrecision(6) + '%; ' +
                    '}\n';
            }
        }
        output.value = gitubUrl + groupSelectors + globalStyle + spriteStyle;
    }

};

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

module.exports = Packer;
