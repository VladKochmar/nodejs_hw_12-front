class ListDataManager {
  static createTableHeader(fields) {
    const thead = document.createElement('thead')
    const headerRow = document.createElement('tr')

    for (let key in fields) {
      const th = document.createElement('th')
      if (typeof fields[key] === 'object') th.textContent = fields[key].title
      else th.textContent = fields[key]
      headerRow.append(th)
    }
    thead.append(headerRow)
    return thead
  }

  static createTableRow(item, fields) {
    const row = document.createElement('tr')

    for (let key in fields) {
      const td = document.createElement('td')
      if (key === 'img' || key === 'image') {
        const img = document.createElement('img')
        img.src = item[key]
        // img.src = 'data:image;base64,' + item[key]
        img.alt = fields[key]
        img.style.width = '100px' // Задайте бажану ширину зображення
        td.append(img)
      } else if (typeof fields[key] === 'object') {
        td.textContent = fields[key].contentGetter(item)
      } else {
        td.textContent = item[key]
      }
      row.append(td)
    }
    return row
  }

  static createTableFromList(data, fields) {
    // Створення таблиці
    const table = document.createElement('table')
    table.border = '1'

    // Створення заголовку таблиці
    const thead = this.createTableHeader(fields)
    table.append(thead)

    // Створення тіла таблиці
    const tbody = document.createElement('tbody')

    data.forEach(item => {
      const row = this.createTableRow(item, fields)
      tbody.append(row)
    })

    table.append(tbody)

    // Виведення таблиці на сторінку
    return table
  }
}
