import { types } from '../actions'

const collections = (state = {items: {}, order: [], isSaving: false, isFetching: true}, action) => {
  switch (action.type) {
    case types.RECIEVED_DATA:
      return {
        items: action.collections.items,
        order: action.collections.order,
        active: action.collections.order[0],
        isFetching: false
      }
    case types.SET_ACTIVE_COLLECTION:
      return {
        ...state,
        active: action.id
      }
    case types.SAVE_CHANGES:
      return {
        ...state,
        isSaving: true
      }
    case types.SAVE_SUCCESSFUL:
      return {
        ...state,
        isSaving: false
      }
    default:
      return state
  }
}

export default collections;