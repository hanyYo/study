import View from './View.js'

const tag = '[ResultView]'

const ResultView = Object.create(View)

ResultView.setup = function (el) {
  this.init(el)
}
ResultView.message = {
  NO_RESULT: '검색 결과가 없습니다.'
}
ResultView.render = function (data = []) {
  console.log(tag, 'render()', data);
  this.el.innerHTML = data.length ? this.getSearchResultsHTML(data) : this.message.NO_RESULT
  this.show()
}

ResultView.getSearchResultsHTML = function (data) {
  return data.reduce((html, item) => {
    html += this.getSearchItemHtml(item)
    return html
  }, '<ul>') + '</ul>'
}
ResultView.getSearchItemHtml = function (item) {
  return `<li>
    <img src="${item.image}" />
    <p>${item.name}</p>
  </li>`
}

export default ResultView
