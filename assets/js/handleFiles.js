(function(){

    /*
    * Files Selector
    * */

    window.URL = window.URL || window.webkitURL;

    var loadInProgress = false;
    var fileElem = document.getElementById("fileElem"),
        fileList = document.getElementById("fileList");
    var id = 0;
    var blocks = [];
    var loaded = 0;
    var canvas = document.getElementById('canvas');

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
                var packer = new Packer();
                packer.sort(blocks);
                packer.fit(blocks);
                packer.draw(
                    blocks,
                    canvas,
                    document.getElementById('css')
                );
                if(blocks.length === 0){
                    document.getElementById('css').value = '';
                    dropbox.classList.add('is-empty');
                }
            }
        }
    });

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
        console.log('load complete');
        var packer = new Packer();
        //var packer = new GrowingPacker();
        packer.sort(blocks);
        packer.fit(blocks);
        packer.draw(
            blocks,
            canvas,
            document.getElementById('css')
        );
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
            console.log(loaded, queue);
            if(loaded === queue){
                loadComplete();
            }
        }
    }

    document.getElementById('download').addEventListener('click', function() {
        var a = document.createElement('a');
        a.href = canvas.toDataURL();
        a.download = 'sprite.png';
        document.body.appendChild(a);
        console.log(a);
        a.click();
        document.body.removeChild(a);
    }, false);

}());