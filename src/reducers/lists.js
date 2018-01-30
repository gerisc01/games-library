import uuid from 'uuid'
import { types } from '../actions'

const lists = (state = {items: {}, order: {}}, action = {type: "INIT_STATE"}) => {
  switch (action.type) {
    case types.RECIEVED_DATA:
      // Create an empty order list for any collection that doesn't have a list order yet
      action.collections.order.forEach(key => {
        if (!action.lists.order[key]) action.lists.order[key] = []
      })
      return {
        items: action.lists.items,
        order: action.lists.order
      }
    case types.CREATE_LIST:
      let listId = uuid()
      let list = {_id: listId, ...action.list}
      return {
        ...state,
        items: {...state.items, [listId]: list},
        order: {
          ...state.order,
          [action.collectionId]: state.order[action.collectionId].concat(listId)
        }
      }
    case types.UPDATE_LIST:
      let updatedItem = Object.assign({},state.items[action.list._id],{...action.list})
      return {
        ...state,
        items: {...state.items, [action.list._id]: updatedItem}
      }
    case types.UPDATE_LIST_ORDER:
      return {
        ...state,
        order: {
          ...state.order,
          [action.collectionId]: action.order
        }
      }
    default:
      return state
  }
}

export default lists;