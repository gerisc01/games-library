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

  // EDIT ACTIONS
  EDIT_ITEM: 'EDIT_ITEM',
  EDIT_ACCEPT: 'EDIT_ACCEPT',
  EDIT_CANCEL: 'EDIT_CANCEL',

  // ADD ACTIONS
  ADD_LIST: 'ADD_LIST',
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
  editItem: id => {
    return {
      type: types.EDIT_ITEM,
      id
    }
  },
  editAccept: (id,item) => {
    return {
      type: types.EDIT_ACCEPT,
      id,
      item
    }
  },
  editCancel: (id) => {
    return {
      type: types.EDIT_CANCEL,
      id
    }
  },
  addList: () => {
    return {
      type: types.ADD_LIST
    }
  }
}