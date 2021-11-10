import { reactive } from '@vue/composition-api'
import api from '@/api/reservation'

export default function useReservation() {
  const state = reactive({
    reservations: null,
    reservation: null,
    isLoading: false,
  })

  const list = () => {
    state.isLoading = true
    api
      .list()
      .then((response) => {
        state.reservations = response.data
      })
      .finally(() => {
        state.isLoading = false
      })
  }

  const create = (data) => {
    return api.create(data).then(() => {
      list()
    })
  }

  const update = (data) => {
    api.update(data.id, {
      collection: data.collection,
      notes: data.notes,
      books: data.books,
    })
  }

  const remove = (id) => {
    api.remove(id).then(() => {
      list()
    })
  }

  return {
    state,
    list,
    remove,
    create,
    update,
  }
}
