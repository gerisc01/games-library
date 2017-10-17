import { types } from '../actions'
import uuid from 'uuid'

const items = (state = {items: {}, order: {}, modified: false, isFetching: true}, action) => {
  let previousOrder,newOrder;
  switch (action.type) {
    case types.RECIEVED_DATA:
      return {
        ...action.items,
        isFetching: false
      }
    case types.CREATE_ITEM:
      let itemId = uuid()
      let item = {_id: itemId, ...action.item}
      previousOrder = state.order[action.listId] ? state.order[action.listId] : []
      newOrder = action.addToTop ? [itemId].concat(previousOrder) : previousOrder.concat(itemId)
      return {
        ...state,
        items: { ...state.items, [itemId]: item },
        order: {...state.order, [action.listId]: newOrder},
        modified: true,
      }
    case types.UPDATE_ITEM:
      return {
        ...state,
        items: {
          ...state.items,
          [action.item._id]: action.item
        },
        modified: true,
      }
    case types.UPDATE_ITEM_ORDER:
      return {
        ...state,
        order: {
          ...state.order,
          [action.listId]: action.itemOrder.slice(0)
        },
        modified: true
      }
    case types.MOVE_ITEM:
      newOrder = action.addToTop
        ? [action.itemId].concat(state.order[action.newListId])
        : state.order[action.newListId].concat(action.itemId)
      return {
        ...state,
        order: {
          ...state.order,
          [action.oldListId]: state.order[action.oldListId].filter(id => {
            return id !== action.itemId
          }),
          [action.newListId]: newOrder
        },
        modified: true
      }
    case types.DELETE_ITEM:
      // Selected listId item index
      let itemIndex = -1
      const currentList = state.order[action.listId]
      // Check to see if the item is in more than one list
      let numOfLists = 0
      Object.keys(state.order).forEach(id => {
        if (id === action.listId) {
          itemIndex = state.order[id].indexOf(action.itemId)
          numOfLists += 1
        } else if (state.order[id].indexOf(action.itemId) !== -1) {
          numOfLists += 1
        }
      })
      // If the item is in only one list, make a copy of the list and delete the item from the item list
      let items = {...state.items}
      if (numOfLists === 1) delete items[itemId]
      return itemIndex === -1 ? state : {
        ...state,
        order: {
          ...state.order,
          [action.listId]: currentList.slice(0,itemIndex).concat(currentList.slice(itemIndex+1,currentList.length))
        },
        items: items,
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

export default items;