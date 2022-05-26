import { onMounted, ref } from '@vue/composition-api'
import { remove as _remove } from 'lodash'

export function useCart() {
  const cart = ref(JSON.parse(localStorage.getItem('cart')) || [])

  const list = () => {
    cart.value = JSON.parse(localStorage.getItem('cart')) || []
  }

  onMounted(list)

  const save = (books) => {
    localStorage.setItem('cart', JSON.stringify(books))
  }

  const add = ({ id, title, price }) => {
    cart.value.push({ id, title, price })
    save(cart.value)
  }

  const remove = (book) => {
    cart.value = _remove(cart.value, (item) => {
      return item !== book
    })
    save(cart.value)
    if (cart.value.length === 0) {
      localStorage.removeItem('cart')
      cart.value = []
    }
  }

  const clean = () => {
    localStorage.removeItem('cart')
    cart.value = []
  }

  return { cart, add, remove, clean }
}
