import application from './application'
import collections from './collections'
import lists from './lists'
import items from './items'

const initialState = {
  app: application(),
  data: {
    collections: collections(),
    lists: lists(),
    items: items()
  }
}

const mediaLibraryApp = (state = initialState, action) => {
  return {
    app: application(state.app,action),
    data: {
      collections: collections(state.data.collections,action),
      lists: lists(state.data.lists,action),
      items: items(state.data.items,action)
    }
  }
}
export default mediaLibraryApp