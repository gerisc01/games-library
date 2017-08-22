import { types } from '../actions'
import uuid from 'uuid'

const items = (state = {items: {}, order: {}}, action) => {
  switch (action.type) {
    case types.FETCH_ITEMS:
      return {
        ...action.data
      }
    case types.CREATE_ITEM:
      let itemId = uuid()
      let item = {_id: itemId, ...action.item}
      return {
        ...state,
        items: { ...state.items, [itemId]: item },
        order: {...state.order, [action.listId]: state.order[action.listId].concat(itemId)}
      }
    case types.MOVE_ITEM:
      return {
        ...state,
        order: {
          ...state.order,
          [action.oldListId]: state.order[action.oldListId].filter(id => {
            return id !== action.itemId
          }),
          [action.newListId]: state.order[action.newListId].concat(action.itemId)
        }
      }
    default:
      return state
  }
}

export default items;