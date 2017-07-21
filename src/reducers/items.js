import { types } from '../actions'

const items = (state = {items: []}, action) => {
  switch (action.type) {
    case types.FETCH_ITEMS:
      let items = []
      items = action.data
      // If action data is defined, return the item list
      ? action.data.map(item => {
        return {...item, id: item["_id"]}
      })
      // If action data is not defined, return an empty list
      : []
      return {
        ...state,
        items
      }
    case types.EDIT_ITEM:
      return {
        ...state,
        isAdding: false,
        editing: action.id
      }
    case types.EDIT_ACCEPT:
      return {
        ...state,
        editing: undefined,
        items: state.items.map(item => {
          return item.id === action.id ? action.item : item
        })
      }
    case types.EDIT_CANCEL:
      return {
        ...state,
        isAdding: false,
        editing: undefined
      }
    case types.ADD_ITEM:
      return {
        ...state,
        isAdding: true,
        editing: undefined
      }
    default:
      return state
  }
}

export default items;