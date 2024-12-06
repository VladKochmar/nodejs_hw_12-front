class LoadOnScroll {
  constructor(containerSelector, baseRoute, itemsPerPage) {
    // Елемент контейнера, де будуть додаватися нові елементи
    this.container = document.querySelector(containerSelector)

    // Базова адреса для завантаження даних (може містити параметри пагінації)
    this.baseRoute = baseRoute

    // Кількість елементів, що завантажуються за один раз
    this.itemsPerPage = itemsPerPage

    // Поточна сторінка (починається з 0)
    this.page = 0

    // Флаг завантаження, щоб запобігти багаторазовим завантаженням
    this.loading = false

    this.query = ''

    // Ініціалізація класу
    this.init()
  }

  // Асинхронне завантаження елементів
  async loadItems() {
    // Якщо завантаження вже відбувається, виходимо
    if (this.loading) return

    // Встановлюємо прапор завантаження
    this.loading = true

    try {
      // console.log(`======================= page=${this.page}&perPage=${this.itemsPerPage}`)

      // Розкоментуйте цей код, якщо завантажуєте дані з API
      const response = await fetch(
        `https://nodejs-hw-12.onrender.com/api/v1${this.baseRoute}?page=${this.page}&perPage=${this.itemsPerPage}&${this.query}`
      )
      const resData = await response.json()
      console.log(resData.data.documents)

      // Додаємо завантажені елементи до контейнера
      resData.data.documents.forEach(item => {
        const product = document.createElement('div')
        product.className = 'product'

        const title = document.createElement('h2')
        title.className = 'product__title'
        title.textContent = item.title
        product.appendChild(title)

        const list = document.createElement('ul')

        const price = document.createElement('li')
        price.textContent = `Ціна: ${item.price}`
        list.appendChild(price)

        const number = document.createElement('li')
        number.textContent = `Кількість ${item.number}`
        list.appendChild(number)

        const seller = document.createElement('li')
        seller.textContent = `Продавець: ${item.seller.name}`
        list.appendChild(seller)

        const type = document.createElement('li')
        type.textContent = `Тип продукту: ${item.productType.title}`
        list.appendChild(type)

        product.appendChild(list)

        this.container.appendChild(product)
      })

      // Збільшуємо номер сторінки для наступного завантаження
      this.page++
    } catch (error) {
      console.log(error)

      console.error('Помилка завантаження елементів:', error)
    } finally {
      // Знімаємо прапор завантаження незалежно від успіху чи помилки
      this.loading = false
    }
  }

  setQuery(query) {
    this.query = query
  }

  resetPage() {
    this.page = 0
  }

  // Ініціалізація класу
  init() {
    // Завантажуємо першу порцію елементів
    this.loadItems()

    // Додаємо обробник події прокручування для підвантаження нових елементів
    window.addEventListener('scroll', () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        this.loadItems()
      }
    })
    /*
Цей вираз використовується для визначення, чи користувач прокрутив сторінку до кінця або майже до кінця. Ось пояснення кожного значення:

- window.innerHeight: Висота видимої області вікна браузера (висота вікна перегляду).
- window.scrollY: Відстань, на яку сторінка була прокручена вертикально від верхньої частини.
- document.body.offsetHeight: Повна висота документа, включаючи видиму частину та ту, що знаходиться за межами видимої області (висота всього контенту на сторінці).
- 100: Відступ у 100 пікселів від нижньої частини документа. Це робиться для того, щоб завантаження нових даних починалося трохи раніше, ніж користувач досягне самого кінця сторінки.
 */
  }
}
