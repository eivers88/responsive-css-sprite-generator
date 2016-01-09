var Clipboard = require('clipboard');
var Packer = require('./packer');
var debounce = require('./debounce');

/*
 * Files Selector
 * */

window.URL = window.URL || window.webkitURL;

var loadInProgress = false;
var fileElem = document.getElementById("fileElem"),
    fileList = document.getElementById("fileList"),
    prefixElem = document.getElementById("prefix"),
    paddingElem = document.getElementById("padding"),
    pathElem = document.getElementById("path");
var id = 0;
var blocks = [];
var loaded = 0;
var canvas = document.getElementById('canvas');
var css = document.getElementById('css');
css.value = '';
var prefix = prefixElem.value;
var padding = paddingElem.value;
var path = pathElem.value;
var dimensionsElem = document.getElementById('dimensions');

var list = document.createElement("ul");
fileList.appendChild(list);

fileElem.addEventListener('change', function(){
    handleFiles(this.files);
});

fileList.addEventListener('click', function(e){
    if(!loadInProgress){
        if(e.target && e.target.classList.contains('remove')) {
            var id = e.target.parentNode.getAttribute('data-id');
            for(var i = 0; i < blocks.length; i++){
                if(blocks[i].id == id){
                    blocks.splice(i,1);
                    loaded--;
                    e.target.parentNode.parentNode.removeChild(e.target.parentNode);
                    break;
                }
            }
            var packer = new Packer(padding, prefix, path);
            packer.sort(blocks);
            packer.fit(blocks);
            packer.draw(
                blocks,
                canvas,
                css
            );
            dimensionsElem.innerHTML = '(' + canvas.width + 'px by ' + canvas.height + 'px)';
            if(blocks.length === 0){
                css.value = '';
                dropbox.classList.add('is-empty');
            }
        }
    }
});

prefixElem.addEventListener('keyup', debounce(updateValues, 250));
paddingElem.addEventListener('keyup', debounce(updateValues, 250));
pathElem.addEventListener('keyup', debounce(updateValues, 250));

function updateValues(){
    prefix = prefixElem.value;
    padding = paddingElem.value;
    path = pathElem.value;
    if(blocks.length > 0) {
        var packer = new Packer(padding, prefix, path);
        packer.sort(blocks);
        packer.fit(blocks);
        packer.draw(
            blocks,
            canvas,
            css
        );
        dimensionsElem.innerHTML = '(' + canvas.width + 'px by ' + canvas.height + 'px)';
    }
}

var dropbox;

dropbox = document.getElementById("dropbox");
dropbox.addEventListener("dragenter", dragenter, false);
dropbox.addEventListener("dragover", dragover, false);
dropbox.addEventListener("drop", drop, false);
dropbox.addEventListener("click", function(e){
    if (fileElem) {
        fileElem.click();
    }
    e.preventDefault(); // prevent navigation to "#"
}, false);

function dragenter(e) {
    e.stopPropagation();
    e.preventDefault();
}

function dragover(e) {
    e.stopPropagation();
    e.preventDefault();
}

function drop(e) {
    e.stopPropagation();
    e.preventDefault();

    var dt = e.dataTransfer;
    var files = dt.files;

    handleFiles(files);
}

/*
 * Handle Files
 * */

function handleFiles(files) {
    if (!files.length) {
        fileList.innerHTML = "<p>No files selected!</p>";
    } else {
        loadInProgress = true;
        //fileList.innerHTML = "";
        //var list = document.createElement("ul");
        //fileList.appendChild(list);
        for (var i = 0; i < files.length; i++) {
            id++;
            var li = document.createElement("li");
            var img = document.createElement("img");
            var info = document.createElement("span");
            var remove = document.createElement("div");

            li.setAttribute('data-id', id);
            list.appendChild(li);

            img.src = window.URL.createObjectURL(files[i]);
            img.height = 60;
            img.onload = onload(id, files[i], files.length + blocks.length);
            li.appendChild(img);

            info.innerHTML = files[i].name.substring(0, files[i].name.indexOf('.'));
            li.appendChild(info);

            remove.classList.add('remove');
            li.appendChild(remove);

            dropbox.classList.remove('is-empty');
        }
    }
    fileElem.value = '';
}

function loadComplete(){
    var packer = new Packer(padding, prefix, path);
    packer.sort(blocks);
    packer.fit(blocks);
    packer.draw(
        blocks,
        canvas,
        css
    );
    dimensionsElem.innerHTML = '(' + canvas.width + 'px by ' + canvas.height + 'px)';
    loadInProgress = false;
}

function onload(id, file, queue){
    return function(){
        window.URL.revokeObjectURL(this.src);
        blocks.push({
            w:this.naturalWidth,
            h:this.naturalHeight,
            img:this,
            name:file.name.substring(0, file.name.indexOf('.')),
            id:id
        });
        loaded++;
        if(loaded === queue){
            loadComplete();
        }
    }
}

document.getElementById('download').addEventListener('click', function(){
    var a = document.createElement('a');
    a.href = canvas.toDataURL();
    a.download = 'sprite.png';
    document.body.appendChild(a);
    //console.log(a);
    a.click();
    document.body.removeChild(a);
}, false);

var clipboard = new Clipboard('#copy');