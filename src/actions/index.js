import fetch from 'isomorphic-fetch'

const gistId = "6f6097e90c5d7e05a67fbe20068d2340"
const filename = "new-games-library.db"

// Defining a map of action types
export const types = {
  // FETCH ACTIONS
  FETCH_DATA: 'FETCH_DATA',
  RECIEVED_DATA: 'RECIEVED_DATA',

  // SAVE ACTIONS
  SAVE_CHANGES: 'SAVE_CHANGES',
  SAVE_SUCCESSFUL: 'SAVE_SUCCESSFUL',

  // ACTIVE ITEMS ACTIONS
  SET_ACTIVE_COLLECTION: 'SET_ACTIVE_COLLECTION',
  SET_ACTIVE_LIST: 'SET_ACTIVE_LIST',

  // CREATE_ACTIONS
  CREATE_ITEM: 'CREATE_ITEM',
  CREATE_LIST: 'CREATE_LIST',

  // UPDATE ACTIONS
  UPDATE_ITEM: 'UPDATE_ITEM',
  UPDATE_LIST: 'UPDATE_LIST',
  UPDATE_ITEM_ORDER: 'UPDATE_ITEM_ORDER',
  UPDATE_LIST_ORDER: 'UPDATE_LIST_ORDER',
  MOVE_ITEM: 'MOVE_ITEM',

  // DELETE ACTIONS
  DELETE_ITEM: 'DELETE_ITEM',
  DELETE_LIST: 'DELETE_LIST',
}

export const actions = {
  // Fetch Action Methods
  fetchListData: () => {
    return dispatch => {
      return fetch(`https://api.github.com/gists/${gistId}`)
        .then(response => response.json())
        .then(json => json.files[filename].raw_url)
        .then(raw_url => fetch(raw_url)
          .then(response => response.json())
          .then(json => dispatch(actions.recievedListData(json)))
        )
    }
  },
  recievedListData: (data) => {
    return {
      type: types.RECIEVED_DATA,
      collections: data.collections,
      lists: data.lists,
      items: data.items
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
  updateList: (list) => {
    return {
      type: types.UPDATE_LIST,
      list
    }
  },
  updateItemOrder: (listId,itemOrder) => {
    return {
      type: types.UPDATE_ITEM_ORDER,
      listId,
      itemOrder
    }
  },
  updateListOrder: (order) => {
    return {
      type: types.UPDATE_LIST_ORDER,
      order
    }
  },
  moveItem: (listId,itemId) => {
    return (dispatch, getState) => {
      dispatch({
        type: types.MOVE_ITEM,
        oldListId: getState().lists.active,
        newListId: listId,
        itemId
      })
    }
  },
  // Delete Actions
  deleteItem: (listId,itemId) => {
    return {
      type: types.DELETE_ITEM,
      listId,
      itemId
    }
  },
  deleteList: (listId) => {
    return {
      type: types.DELETE_LIST,
      listId
    }
  },
  saveChanges: (state) => {
    return (dispatch, getState) => {
      setTimeout(function() { dispatch(actions.saveSuccessful()) }, 5000)
      dispatch({
        type: types.SAVE_CHANGES,
        state
      })
    }
  },
  saveSuccessful: () => {
    return {
      type: types.SAVE_SUCCESSFUL
    }
  }
}