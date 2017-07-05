import { types } from '../actions'

const collections = (state = {items: []}, action) => {
  switch (action.type) {
    case types.FETCH_COLLECTIONS:
      let items = action.data.map(collection => {
        return {...collection, id: collection["_id"]}
      });
      items.sort((a,b) => {
        return a.order - b.order;
      });
      const active = items.length > 0 ? items[0].id : undefined;
      return {
        items,
        active
      }
    case types.SET_ACTIVE_COLLECTION:
      return {
        items: state.items,
        active: action.id
      }
    default:
      return state
  }
}

export default collections;