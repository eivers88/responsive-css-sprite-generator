const parser = new DOMParser();

export default class Template {
  listItem(item) {
    let xmlString = `<li data-id="${item.id}">` +
      `<img src="${item.src}" height="60" />` +
      `<span>${item.name}</span>` +
      `<div class="remove"></div>` +
      `</li>`;
    return parser.parseFromString(xmlString, "text/xml").querySelector('li');
  }
}
