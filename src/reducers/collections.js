import { types } from '../actions'

const collections = (state = [], action) => {
  switch (action.type) {
    case types.FETCH_COLLECTIONS:
      return action.data.map(collection => (
          {...collection, id: collection["_id"] }
      ))
    default:
      return state
  }
}

export default collections;