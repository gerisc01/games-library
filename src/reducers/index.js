import { combineReducers } from 'redux'
import collections from './collections'

const gamesLibraryApp = combineReducers({
  collections
})

export default gamesLibraryApp