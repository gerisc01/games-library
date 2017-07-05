import { types } from '../actions'

const lists = (state = {items: []}, action) => {
  switch (action.type) {
    case types.FETCH_LISTS:
      let items = action.data.map(list => {
        return {...list, id: list["_id"]}
      });
      const active = items.length > 0 ? items[0].id : undefined;
      return {
        items,
        active
      }
    case types.SET_ACTIVE_LIST:
      return {
        items: state.items,
        active: action.id
      }
    default:
      return state
  }
}

export default lists;