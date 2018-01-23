import { types } from '../actions'

const collections = (state = {items: {}, order: [], isSaving: false, saveFailed: false, isFetching: true}, action = {type: "INIT_STATE"}) => {
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
        isSaving: false,
        saveFailed: false
      }
    case types.SAVE_FAILED:
      return {
        ...state,
        isSaving: false,
        saveFailed: true
      }
    default:
      return state
  }
}

export default collections;