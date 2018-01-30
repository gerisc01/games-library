import { types } from '../actions'

const initialState = {
  isFetching: true,
  isSaving: false,
  saveFailed: false,
  isModified: false,
  isEditingLists: false,
  isAddingList: false,
  isSearching: false,
  activeIndex: {
    collection: 0,
    list: 0
  }
}

const modificationActions = [
  types.CREATE_ITEM, types.UPDATE_ITEM, types.UPDATE_ITEM_ORDER, types.DELETE_ITEM, types.MOVE_ITEM,
  types.CREATE_LIST, types.UPDATE_LIST, types.UPDATE_LIST_ORDER
]

const application = (state = initialState, action = {type: "INIT_STATE"}) => {
  switch (action.type) {
    case types.FETCH_DATA:
      return {
        ...state,
        isFetching: true
      }
    case types.RECIEVED_DATA:
      return {
        ...state,
        isFetching: false
      }
    case types.SAVE_CHANGES:
      return {
        ...state,
        isSaving: true
      }
    case types.SAVE_SUCCESSFUL:
      return {
        ...state,
        isSaving: false,
        saveFailed: false,
        isModified: false
      }
    case types.SAVE_FAILED:
      return {
        ...state,
        isSaving: false,
        saveFailed: true
      }
    case types.SET_ACTIVE_COLLECTION:
      return {
        ...state,
        isAddingList: false,
        isEditingLists: false,
        isSearching: false,
        activeIndex: {
          ...state.activeIndex,
          collection: action.index,
          list: 0
        }
      }
    case types.SET_ACTIVE_LIST:
      return {
        ...state,
        isAddingList: false,
        isSearching: false,
        activeIndex: {
          ...state.activeIndex,
          list: action.index
        }
      }
    case types.SEARCH_ITEMS:
      return {
        ...state,
        isSearching: true
      }
    case types.START_EDIT_MODE:
      return {
        ...state,
        isEditingLists: true
      }
    case types.STOP_EDIT_MODE:
      return {
        ...state,
        isEditingLists: false,
        isSearching: false
      }
    case types.START_ADD_LIST:
      return {
        ...state,
        isAddingList: true
      }
    case types.CREATE_LIST:
      return {
        ...state,
        isAddingList: false
      }
    default:
      if (modificationActions.includes(action.type)) {
        return {
          ...state,
          isModified: true
        }
      }
      return state
  }
}
export default application;