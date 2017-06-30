import { tempData } from '../tempData'

// Defining a map of action types
export const types = {
  // FETCH ACTIONS
  FETCH_COLLECTIONS: 'FETCH_COLLECTIONS',
  FETCH_LISTS: 'FETCH_LISTS',
  FETCH_ITEMS: 'FETCH_ITEMS',

  // ACTIVE ITEMS ACTIONS
  ADD_ACTIVE_COLLECTION: 'ADD_ACTIVE_COLLECTION',
  ADD_ACTIVE_LIST: 'ADD_ACTIVE_LIST',
}

export const actions = {
  fetchCollections: () => {
    return {
      type: types.FETCH_COLLECTIONS,
      data: tempData.collections
    }
  },
  fetchLists: collectionId => {
    return {
      type: types.FETCH_LISTS,
      data: tempData.lists[collectionId],
    }
  },
  fetchItems: (collectionId,listId) => {
    return {
      type: types.FETCH_ITEMS,
      data: tempData.items[collectionId][listId],
    }
  },
  addActiveCollection: id => {
    return {
      type: types.ADD_ACTIVE_COLLECTION,
      id
    }
  },
  addActiveList: id => {
    return {
      type: types.ADD_ACTIVE_LIST,
      id
    }
  }
}