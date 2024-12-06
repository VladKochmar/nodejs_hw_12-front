class HeaderManager {
  constructor(currentPath, menuItems) {
    this.currentPath = currentPath
    this.menuItems = menuItems
    this.init()
    this.basePath = this.getBasePath()
  }

  getBasePath() {
    const depth = (this.currentPath.match(/\//g) || []).length
    return depth ? '../'.repeat(depth) : ''
  }

  createMenuItem(item, basePath) {
    const li = document.createElement('li')
    li.className = 'header__item'

    const a = document.createElement('a')
    a.className = item.href === this.currentPath ? 'header__link active' : 'header__link'
    a.href = basePath + item.href
    a.textContent = item.text

    li.appendChild(a)
    return li
  }

  createHeader() {
    const basePath = this.getBasePath()
    const header = document.createElement('header')
    header.className = 'header'

    const nav = document.createElement('nav')
    nav.className = 'header__nav'

    const list = document.createElement('ul')
    list.className = 'header__list'

    this.menuItems.forEach(item => {
      const li = this.createMenuItem(item, basePath)
      list.appendChild(li)
    })

    nav.appendChild(list)
    header.appendChild(nav)
    document.body.insertBefore(header, document.body.firstChild)
  }

  init() {
    this.createHeader()
  }
}
