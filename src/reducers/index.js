import { types } from '../actions'
import collections from './collections'
import lists from './lists'
import items from './items'

const initialState = {
  app: {
    isAddingList: false,
    isEditingLists: false
  },
  data: {
    collections: collections(),
    lists: lists(),
    items: items()
  }
}

const mediaLibraryApp = (state = initialState, action) => {
  let updatedState = {
    ...state,
    data: {
      collections: collections(state.data.collections,action),
      lists: lists(state.data.lists,action),
      items: items(state.data.items,action)
    }
  }

  switch(action.type) {
    case types.START_ADD_LIST:
      updatedState.app.isAddingList = true
      break
    case types.START_EDIT_MODE:
      updatedState.app.isEditingLists = true
      break
    case types.STOP_EDIT_MODE:
      updatedState.app.isAddingList = false
      updatedState.app.isEditingLists = false
      break
    default:
      break
  }

  return updatedState
}
export default mediaLibraryApp