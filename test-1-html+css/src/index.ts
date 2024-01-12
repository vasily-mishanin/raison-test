import { contacts } from './data'

const cardsContainer = document.getElementById('cards')
const cardTemplate = document.getElementById('card') as HTMLTemplateElement
contacts.forEach((contact, index) => {
    const cardClone = cardTemplate?.content.cloneNode(true) as DocumentFragment
    const cardItem = cardClone.querySelectorAll('.card')[0]
    if (index === 0) {
        cardItem.classList.add('card-first')
    }
    if (index === 2) {
        cardItem.classList.add('card-second')
    }
    cardClone.querySelector('.card__title')!.textContent = contact.title
    const flagImage = cardClone.querySelector('.card__flag-img') as HTMLImageElement
    flagImage.src = contact.flagImg
    flagImage.alt = contact.title
    cardClone.querySelector('.card__phone')!.textContent = contact.phone
    cardClone.querySelector('.card__email')!.textContent = contact.email
    cardClone.querySelector('.card__address')!.textContent = contact.address

    cardsContainer?.appendChild(cardClone)
})
