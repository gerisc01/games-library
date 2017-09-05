import uuid from 'uuid'
import { types } from '../actions'

const lists = (state = {items: {}, fields: {}, order: []}, action) => {
  switch (action.type) {
    case types.FETCH_LISTS:
      const order = action.data.order && action.data.order[action.collectionId] ? action.data.order[action.collectionId] : []
      return {
        items: action.data.items,
        fields: action.data.fields,
        order: order,
        active: order && order.length !== 0 ? order[0] : undefined
      }
    case types.SET_ACTIVE_LIST:
      return {
        ...state,
        items: state.items,
        active: action.id
      }
    case types.CREATE_LIST:
      let listId = uuid()
      let list = {_id: listId, ...action.list}
      return {
        ...state,
        items: {...state.items, [listId]: list},
        order: state.order.concat(listId)
      }
    case types.UPDATE_LIST:
      let updatedItem = Object.assign({},state.items[action.list._id],action.list)
      return {
        ...state,
        items: {...state.items, [action.list._id]: updatedItem}
      }
    case types.UPDATE_LIST_ORDER:
      return {
        ...state,
        order: action.order
      }
    default:
      return state
  }
}

export default lists;