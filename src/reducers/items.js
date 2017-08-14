import { types } from '../actions'
import uuid from 'uuid'

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
    case types.ADD_ITEM:
      return {
        ...state,
        isAdding: true,
        editing: undefined
      }
    case types.ADD_ITEM_ACCEPT:
      let item = action.item
      let itemId = uuid()
      item["_id"] = itemId
      item["id"] = itemId
      return {
        ...state,
        isAdding: false,
        items: state.items.concat(item),
      }
    default:
      return state
  }
}

export default items;