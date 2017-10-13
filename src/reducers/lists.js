import uuid from 'uuid'
import { types } from '../actions'

const lists = (state = {items: {}, order: {}, active: null, modified: false, isFetching: true}, action) => {
  switch (action.type) {
    case types.RECIEVED_DATA:
      const defaultCollectionId = action.collections.order[0]
      // Create an empty order list for any collection that doesn't have a list order yet
      action.collections.order.forEach(key => {
        if (!action.lists.order[key]) action.lists.order[key] = []
      })
      return {
        items: action.lists.items,
        order: action.lists.order,
        active: action.lists.order[defaultCollectionId][0],
        isFetching: false
      }
    case types.SET_ACTIVE_COLLECTION:
      return {
        ...state,
        active: state.order[action.id][0]
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
        order: {
          ...state.order,
          [action.collectionId]: state.order[action.collectionId].concat(listId)
        },
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
        order: {
          ...state.order,
          [action.collectionId]: action.order
        },
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