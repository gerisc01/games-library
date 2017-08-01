import { tempData } from '../tempData'

// Defining a map of action types
export const types = {
  // FETCH ACTIONS
  FETCH_COLLECTIONS: 'FETCH_COLLECTIONS',
  FETCH_LISTS: 'FETCH_LISTS',
  FETCH_ITEMS: 'FETCH_ITEMS',

  // ACTIVE ITEMS ACTIONS
  SET_ACTIVE_COLLECTION: 'SET_ACTIVE_COLLECTION',
  SET_ACTIVE_LIST: 'SET_ACTIVE_LIST',

  // EDIT LIST ACTIONS
  EDIT_LISTS: 'EDIT_LISTS',
  EDIT_LISTS_CANCEL: 'EDIT_LISTS_CANCEL',
  EDIT_LISTS_ACCEPT: 'EDIT_LISTS_ACCEPT',

  // EDIT ITEM ACTIONS
  EDIT_ITEM: 'EDIT_ITEM',
  EDIT_ACCEPT: 'EDIT_ACCEPT',
  EDIT_CANCEL: 'EDIT_CANCEL',

  // ADD LIST ACTIONS
  ADD_LIST: 'ADD_LIST',
  ADD_LIST_ACCEPT: 'ADD_LIST_ACCEPT',

  // ADD ITEM ACTIONS
  ADD_ITEM: 'ADD_ITEM',
  ADD_ITEM_ACCEPT: 'ADD_ITEM_ACCEPT',

}

export const actions = {
  fetchCollections: () => {
    return (dispatch, getState) => {
      dispatch({
        type: types.FETCH_COLLECTIONS,
        data: tempData.collections
      })
      dispatch(actions.fetchLists(getState().collections.active))
    }
  },
  fetchLists: collectionId => {
    return (dispatch, getState) => {
      dispatch({
        type: types.FETCH_LISTS,
        data: tempData.lists[collectionId],
      })
      dispatch(actions.fetchItems(collectionId,getState().lists.active))
    }
  },
  fetchItems: (collectionId,listId) => {
    return {
      type: types.FETCH_ITEMS,
      data: tempData.items[collectionId][listId],
    }
  },
  setActiveCollection: collectionId => {
    return (dispatch, getState) => {
      dispatch({
        type: types.SET_ACTIVE_COLLECTION,
        id: collectionId
      })
      dispatch(actions.fetchLists(collectionId))
    }
  },
  setActiveList: listId => {
    return (dispatch, getState) => {
      dispatch({
        type: types.SET_ACTIVE_LIST,
        id: listId
      })
      dispatch(actions.fetchItems(getState().collections.active,listId))
    }
  },
  editLists: () => {
    return {
      type: types.EDIT_LISTS
    }
  },
  editListsCancel: () => {
    return {
      type: types.EDIT_LISTS_CANCEL
    }
  },
  editItem: id => {
    return {
      type: types.EDIT_ITEM,
      id
    }
  },
  editItemAccept: (id,item) => {
    return {
      type: types.EDIT_ACCEPT,
      id,
      item
    }
  },
  editItemCancel: (id) => {
    return {
      type: types.EDIT_CANCEL,
      id
    }
  },
  addList: () => {
    return {
      type: types.ADD_LIST
    }
  },
  addListAccept: (list) => {
    return {
      type: types.ADD_LIST_ACCEPT,
      list
    }
  },
  addItem: () => {
    return {
      type: types.ADD_ITEM
    }
  },
  addItemAccept: (item) => {
    return {
      type: types.ADD_ITEM_ACCEPT,
      item
    }
  }
}