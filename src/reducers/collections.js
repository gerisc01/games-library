import { types } from '../actions'

const collections = (state = {items: {}, order: [], isSaving: false}, action) => {
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