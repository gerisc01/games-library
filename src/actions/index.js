import { tempData } from '../tempData/newData'

// Defining a map of action types
export const types = {
  // FETCH ACTIONS
  FETCH_COLLECTIONS: 'FETCH_COLLECTIONS',
  FETCH_LISTS: 'FETCH_LISTS',
  FETCH_ITEMS: 'FETCH_ITEMS',

  // ACTIVE ITEMS ACTIONS
  SET_ACTIVE_COLLECTION: 'SET_ACTIVE_COLLECTION',
  SET_ACTIVE_LIST: 'SET_ACTIVE_LIST',

  // CREATE_ACTIONS
  CREATE_ITEM: 'CREATE_ITEM',
  CREATE_LIST: 'CREATE_LIST',

  // UPDATE ACTIONS
  UPDATE_ITEM: 'UPDATE_ITEM',
  UPDATE_LISTS: 'UPDATE_LISTS',
  MOVE_ITEM: 'MOVE_ITEM',

  // DELETE ACTIONS
  REMOVE_ITEM_FROM_LIST: 'REMOVE_ITEM_FROM_LIST',
  DELETE_LIST: 'DELETE_LIST',

  // EDIT LIST ACTIONS
  EDIT_LISTS: 'EDIT_LISTS',
  EDIT_LISTS_CANCEL: 'EDIT_LISTS_CANCEL',
  EDIT_LISTS_ACCEPT: 'EDIT_LISTS_ACCEPT',

  // ADD LIST ACTIONS
  ADD_LIST: 'ADD_LIST',
  ADD_LIST_ACCEPT: 'ADD_LIST_ACCEPT',

  // ADD ITEM ACTIONS
  ADD_ITEM: 'ADD_ITEM',
  ADD_ITEM_ACCEPT: 'ADD_ITEM_ACCEPT',

}

export const actions = {
  // Fetch Action Methods
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
        data: tempData.lists,
        collectionId
      })
      dispatch(actions.fetchItems(getState().lists.active))
    }
  },
  fetchItems: (listId) => {
    return {
      type: types.FETCH_ITEMS,
      data: tempData.items,
      listId
    }
  },
  // Set Active Action Methods
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
    return {
      type: types.SET_ACTIVE_LIST,
      id: listId
    }
  },
  // Create Actions
  createItem: (listId,item) => {
    return {
      type: types.CREATE_ITEM,
      item,
      listId
    }
  },
  createList: (list) => {
    return {
      type: types.CREATE_LIST,
      list
    }
  },
  // Update Actions
  updateItem: (item) => {
    return {
      type: types.UPDATE_ITEM,
      item
    }
  },
  updateLists: (lists) => {
    return {
      type: types.UPDATE_LISTS,
      lists
    }
  },
  // Delete Actions
  removeItemFromList: (listId,itemId) => {
    return {
      type: types.DELETE_ITEM,
      itemId
    }
  },
  deleteList: (listId) => {
    return {
      type: types.DELETE_LIST,
      listId
    }
  },
  // Deprecated Actions
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