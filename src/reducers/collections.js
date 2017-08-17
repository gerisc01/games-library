import { types } from '../actions'

const collections = (state = {items: {}, order: []}, action) => {
  switch (action.type) {
    case types.FETCH_COLLECTIONS:
      return {
        items: action.data.items,
        order: action.data.order,
        active: action.data.order[0]
      }
    case types.SET_ACTIVE_COLLECTION:
      return {
        ...state,
        active: action.id
      }
    default:
      return state
  }
}

export default collections;