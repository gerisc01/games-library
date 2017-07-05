import { combineReducers } from 'redux'
import collections from './collections'
import lists from './lists'
import items from './items'

const gamesLibraryApp = combineReducers({
  collections,
  lists,
  items
})

export default gamesLibraryApp