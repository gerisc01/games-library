import { types } from '../actions'
import uuid from 'uuid'

const items = (state = {items: {}, order: {}}, action) => {
  switch (action.type) {
    case types.FETCH_ITEMS:
      return {
        ...action.data
      }
    case types.CREATE_ITEM:
      let item = action.item;
      let itemId = uuid()
      item["_id"] = itemId
      return {
        ...state,
        items: { ...items, [itemId]: item },
        order: {...order, [listId]: order[listId].concat(itemId)}
      }
    default:
      return state
  }
}

export default items;