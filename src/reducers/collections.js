import { types } from '../actions'

const collections = (state = {items: {}, order: []}, action = {type: "INIT_STATE"}) => {
  switch (action.type) {
    case types.RECIEVED_DATA:
      return {
        items: action.collections.items,
        order: action.collections.order
      }
    default:
      return state
  }
}

export default collections;