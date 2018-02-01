import fetch from 'isomorphic-fetch'

const gistId = "6f6097e90c5d7e05a67fbe20068d2340"
const filename = "feature-searching.db"

// Defining a map of action types
export const types = {
  // FETCH ACTIONS
  FETCH_DATA: 'FETCH_DATA',
  RECIEVED_DATA: 'RECIEVED_DATA',

  // APPLCATION ACTIONS
  START_ADD_LIST: 'START_ADD_LIST',
  START_EDIT_MODE: 'START_EDIT_MODE',
  STOP_EDIT_MODE: 'STOP_EDIT_MODE',
  SEARCH_ITEMS: 'SEARCH_ITEMS',

  // SAVE ACTIONS
  SAVE_CHANGES: 'SAVE_CHANGES',
  SAVE_SUCCESSFUL: 'SAVE_SUCCESSFUL',
  SAVE_FAILED: 'SAVE_FAILED',

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
  // Application Action Methods
  startAddList: () => {
    return {
      type: types.START_ADD_LIST
    }
  },
  startEditMode: () => {
    return {
      type: types.START_EDIT_MODE
    }
  },
  stopEditMode: () => {
    return {
      type: types.STOP_EDIT_MODE
    }
  },
  searchItems: () => {
    return {
      type: types.SEARCH_ITEMS
    }
  },
  // Set Active Action Methods
  setActiveCollection: index => {
    return {
      type: types.SET_ACTIVE_COLLECTION,
      index
    }
  },
  setActiveList: index => {
    return {
      type: types.SET_ACTIVE_LIST,
      index
    }
  },
  // Create Actions
  createItem: (collectionId,listId,item,addToTop = false) => {
    return {
      type: types.CREATE_ITEM,
      item,
      collectionId,
      listId,
      addToTop
    }
  },
  createList: (collectionId,list) => {
    return {
      type: types.CREATE_LIST,
      collectionId,
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
  updateListOrder: (collectionId,order) => {
    return {
      type: types.UPDATE_LIST_ORDER,
      collectionId,
      order
    }
  },
  moveItem: (itemId,listId,newListId) => {
    return (dispatch, getState) => {
      // Use thunk to dispatch the action so that is can load data about the new list from state,
      // because an item reducer doesn't have access to that info but the new list isn't going to
      // be loading when the action is fired either
      const listsState = getState().data.lists
      dispatch({
        type: types.MOVE_ITEM,
        itemId,
        listId,
        newListId,
        addToTop: listsState.items[newListId].addToTop || false
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
      // Dispatch the action that signifies the save process starting
      dispatch({
        type: types.SAVE_CHANGES
      })
      // Build the new post object
      const data = getState().data;

      fetch(`https://db-updater-api.herokuapp.com/api/v1/gistdb/${gistId}/${filename}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      }).then(response => {
        if (response.status >= 400) {
          Promise.resolve(response.json()).then(json => {
            dispatch({
              type: types.SAVE_FAILED,
              message: json
            })
          })
        } else {
          dispatch({
            type: types.SAVE_SUCCESSFUL
          })
        }
      })
    }
  },
  saveSuccessful: () => {
    return {
      type: types.SAVE_SUCCESSFUL
    }
  }
}