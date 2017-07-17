export default class Template {
  listItem(item) {

    let li = document.createElement('li');
    let img = document.createElement('img');
    let info = document.createElement('span');
    let remove = document.createElement('div');

    li.setAttribute('data-id', item.id);

    img.src = item.src;
    img.height = 60;
    img.onload = function() {
      window.URL.revokeObjectURL(item.src);
      item.onLoadSuccess({
        img: this,
        name: item.name,
        id: item.id
      });
    };

    li.appendChild(img);
    info.innerHTML = item.name;
    li.appendChild(info);

    remove.classList.add('remove');
    li.appendChild(remove);

    return li;

  }
}
