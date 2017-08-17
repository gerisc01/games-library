import uuid from 'uuid'
import { types } from '../actions'

const lists = (state = {items: {}, fields: {}, order: []}, action) => {
  switch (action.type) {
    case types.FETCH_LISTS:
      return {
        items: action.data.items,
        fields: action.data.fields,
        order: action.data.order,
        active: action.data.order[0]
      }
    case types.SET_ACTIVE_LIST:
      return {
        ...state,
        items: state.items,
        active: action.id
      }
    case types.CREATE_LIST:
      let list = action.list
      let listId = uuid()
      list["_id"] = listId
      return {
        ...state,
        items: {...items, [listId]: list},
        order: order.concat(listId)
      }
    default:
      return state
  }
}

export default lists;