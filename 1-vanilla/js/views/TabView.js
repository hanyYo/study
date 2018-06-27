import View from './View.js'

const tag = '[TabView]'

const TabView = Object.create(View)

TabView.tabNames = {
  recommand: '추천 검색어',
  recent: '최근 검색어',
}

TabView.setup = function(el) {
  this.init(el)
  this.bindEvents()
}

TabView.setActiveTab = function (tabName) {

  [].forEach.call(this.el.querySelectorAll('li'), function (li) {
    li.className = li.innerText.includes(tabName) ? 'active' : ''
  })

}

TabView.bindEvents = function() {

  this.el.addEventListener('click', e => this.onClickTab(e));

}

TabView.onClickTab = function ({target}) {
  if(target.tagName.toLowerCase() !== 'li') return
  Array.from(this.el.querySelectorAll('li')).forEach( el => el.className = '')
  target.className = 'active'
  let idx = Array.from(this.el.querySelectorAll('li')).findIndex( el => el.className === 'active')
  console.log(idx);
}

export default TabView
