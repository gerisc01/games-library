import uuid from 'uuid'
import { types } from '../actions'

const lists = (state = {items: {}, order: [], active: null, modified: false, isFetching: true}, action) => {
  switch (action.type) {
    case types.RECIEVED_DATA:
      const defaultCollectionId = action.collections.order[0]
      const order = action.lists.order && action.lists.order[defaultCollectionId] ? action.lists.order[defaultCollectionId] : []
      return {
        items: action.lists.items,
        order: order,
        active: order && order.length !== 0 ? order[0] : undefined,
        isFetching: false
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
        order: state.order.concat(listId),
        active: listId,
        modified: true
      }
    case types.UPDATE_LIST:
      let updatedItem = Object.assign({},state.items[action.list._id],{...action.list})
      return {
        ...state,
        items: {...state.items, [action.list._id]: updatedItem},
        modified: true
      }
    case types.UPDATE_LIST_ORDER:
      return {
        ...state,
        order: action.order,
        modified: true
      }
    case types.SAVE_SUCCESSFUL:
      return {
        ...state,
        modified: false
      }
    default:
      return state
  }
}

export default lists;