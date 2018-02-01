import { types } from '../actions'
import uuid from 'uuid'

const items = (state = {items: {}, order: {}}, action = {type: "INIT_STATE"}) => {
  let item,previousOrder,newOrder;
  switch (action.type) {
    case types.RECIEVED_DATA:
      return {
        ...action.items
      }
    case types.CREATE_ITEM:
      let itemId = uuid()
      item = {
        _id: itemId,
        collection: action.collectionId,
        lists: [action.listId],
        ...action.item
      }
      previousOrder = state.order[action.listId] ? state.order[action.listId] : []
      newOrder = action.addToTop ? [itemId].concat(previousOrder) : previousOrder.concat(itemId)
      return {
        ...state,
        items: { ...state.items, [itemId]: item },
        order: {...state.order, [action.listId]: newOrder}
      }
    case types.UPDATE_ITEM:
      return {
        ...state,
        items: {
          ...state.items,
          [action.item._id]: action.item
        }
      }
    case types.UPDATE_ITEM_ORDER:
      return {
        ...state,
        order: {
          ...state.order,
          [action.listId]: action.itemOrder.slice(0)
        }
      }
    case types.MOVE_ITEM:
      newOrder = action.addToTop
        ? [action.itemId].concat(state.order[action.newListId])
        : state.order[action.newListId].concat(action.itemId)
      // Replace the current listId with the new listId in the items list array
      item = Object.assign({}, state.items[action.itemId])
      item.lists.splice(item.lists.indexOf(action.listId),1,action.newListId)
      return {
        ...state,
        items: { ...state.items, [action.itemId]: item },
        order: {
          ...state.order,
          [action.listId]: state.order[action.listId].filter(id => {
            return id !== action.itemId
          }),
          [action.newListId]: newOrder
        }
      }
    case types.DELETE_ITEM:
      item = Object.assign({},state.items[action.itemId])
      item.lists.splice(item.lists.indexOf(action.listId),1)
      // If the item was only in one list, delete the item from the items state
      let items = {...state.items}
      if (item.lists.length === 0) delete items[action.itemId]
      // Make the modifications to the order for the passed listId
      let list = state.order[action.listId]
      let itemIndex = list.indexOf(action.itemId)
      return {
        ...state,
        order: {
          ...state.order,
          [action.listId]: list.slice(0,itemIndex).concat(list.slice(itemIndex+1,list.length))
        },
        items: items
      }
    default:
      return state
  }
}

export default items;