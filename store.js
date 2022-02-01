import items from './db.json'

const storeItemTemplate = document.querySelector('#store-item-template')
const cartItemTemplate = document.querySelector('#cart-item-template')
const storeItemWrap = document.querySelector('#store-item-container')
const cartItemsContainer = document.querySelector('#cart-items-container')
const cartBadge = document.querySelector('#cart-badge')

export function setupStore() {
    renderStoreItems()

    setupCart()
}

function setupCart() {
    document.addEventListener('click', e => {
        if(!e.target.matches('[data-store-item-button]')) return
        const card = e.target.closest('[data-item-id]')
        const cardId = card.getAttribute('data-item-id')

        items.forEach(item => {
            if(item.id !== parseInt(cardId)) return
            renderCartItem(item)
        })
    })
}

function renderCartItem(receivedItem) {
    const cartItemClone = cartItemTemplate.content.cloneNode(true)

    const container = cartItemClone.querySelector('[data-cart-id]')
    container.dataset.cartItemId = receivedItem.id

    const imageColor = cartItemClone.querySelector('[data-image-color]')
    imageColor.setAttribute('src', `https://dummyimage.com/210x130/${receivedItem.imageColor}/${receivedItem.imageColor}`)

    const name = cartItemClone.querySelector('[data-name]')
    name.innerText = receivedItem.name

    const price = cartItemClone.querySelector('[data-price]')
    price.innerText = `$${receivedItem.priceCents  / 100}`

    cartItemsContainer.append(cartItemClone)
}

function renderStoreItems() {
    items.forEach(item => {
        const itemTemplateClone = storeItemTemplate.content.cloneNode(true)

        const container = itemTemplateClone.querySelector('[data-store-id]')
        container.dataset.itemId = item.id

        const imageColor = itemTemplateClone.querySelector('[data-image-color]')
        imageColor.setAttribute('src', `https://dummyimage.com/420x260/${item.imageColor}/${item.imageColor}`)

        const category = itemTemplateClone.querySelector('[data-primary-color]')
        category.innerText = item.category

        const itemName = itemTemplateClone.querySelector('[data-name]')
        itemName.innerText = item.name

        const itemPrice = itemTemplateClone.querySelector('[data-price]')
        itemPrice.innerText = `$${item.priceCents / 100}`

        storeItemWrap.append(itemTemplateClone)
    })
}

