import { onMounted, reactive } from '@vue/composition-api'
import { remove as _remove } from 'lodash'

export default function useCart() {
  const state = reactive({
    cart: JSON.parse(localStorage.getItem('cart')),
  })

  const list = () => {
    state.cart = JSON.parse(localStorage.getItem('cart'))
  }

  const save = (books) => {
    localStorage.setItem('cart', JSON.stringify(books))
  }

  const add = (book) => {
    let books = state.cart || []
    books.push({ id: book.id, title: book.title, price: book.price })
    save(books)
    list()
  }

  const remove = (book) => {
    let books = _remove(state.cart, (item) => {
      return item !== book
    })
    state.cart = books
    save(books)
    if (books.length === 0) {
      localStorage.removeItem('cart')
      state.cart = undefined
    }
    list()
  }

  const clean = () => {
    localStorage.removeItem('cart')
    list()
  }

  onMounted(list)

  return { state, list, add, remove, clean }
}
