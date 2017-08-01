import uuid from 'uuid'
import { types } from '../actions'

const lists = (state = {items: [], isAdding: false}, action) => {
  switch (action.type) {
    case types.FETCH_LISTS:
      let items = action.data.map(list => {
        return {...list, id: list["_id"]}
      });
      const active = items.length > 0 ? items[0].id : undefined;
      return {
        ...state,
        items,
        active,
        isEditing: false,
        isAdding: false,
      }
    case types.SET_ACTIVE_LIST:
      return {
        ...state,
        items: state.items,
        active: action.id,
        isAdding: false,
        isEditing: false,
      }
    case types.EDIT_LISTS:
      return {
        ...state,
        isEditing: true,
      }
    case types.EDIT_LISTS_CANCEL:
      return {
        ...state,
        isEditing: false
      }
    case types.ADD_LIST:
      return {
        ...state,
        isAdding: true,
        isEditing: false,
      }
    case types.ADD_LIST_ACCEPT:
      let list = action.list
      let listId = uuid()
      list["_id"] = listId
      list["id"] = listId
      return {
        ...state,
        isAdding: false,
        items: state.items.concat(list),
      }
    default:
      return state
  }
}

export default lists;