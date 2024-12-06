class PriceOrderSelector {
  constructor(fields, containerSelector, onChange) {
    this.fields = fields
    this.currentOrder = fields[0] + ':asc'
    this.onChange = onChange
    this.render(containerSelector)
  }

  render(containerSelector) {
    const container = document.createElement('div')
    container.className = 'price-selector'

    const label = document.createElement('label')
    label.className = 'price-selector__label'
    label.textContent = 'Sorting method:'

    const select = document.createElement('select')
    select.className = 'price-dropdown'
    select.name = 'priceOrder'

    this.fields.forEach(field => {
      const optionAsc = document.createElement('option')
      optionAsc.textContent = `In ascending order of ${field}`
      optionAsc.value = `${field}:asc`
      optionAsc.selected = this.currentOrder === `${field}:asc`

      const optionDesc = document.createElement('option')
      optionDesc.textContent = `In descending order of ${field}`
      optionDesc.value = `${field}:desc`
      optionDesc.selected = this.currentOrder === `${field}:desc`

      select.append(optionAsc)
      select.append(optionDesc)
    })

    select.addEventListener('change', e => {
      this.currentOrder = e.target.value
      if (this.onChange) this.onChange()
    })

    container.append(label)
    container.append(select)

    if (containerSelector) document.querySelector(containerSelector)?.append(container)

    return container
  }
}
