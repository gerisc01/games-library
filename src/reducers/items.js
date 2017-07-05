import { types } from '../actions'

const items = (state = {items: []}, action) => {
  switch (action.type) {
    case types.FETCH_ITEMS:
      let items = []
      items = action.data
      // If action data is defined, return the item list
      ? action.data.map(item => {
        return {...item, id: item["_id"]}
      })
      // If action data is not defined, return an empty list
      : []
      return {
        items
      }
    default:
      return state
  }
}

export default items;