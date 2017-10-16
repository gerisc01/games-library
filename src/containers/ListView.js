import { connect } from 'react-redux'
import List from '../components/List'
import { actions } from '../actions'

const mapStateToProps = state => {
  if (state.lists.isFetching || !state.lists.active) {
    // return a default state
    return {
      fields: [],
      order: []
    }
  } else {
    const activeList = state.lists.items[state.lists.active]
    return {
      id: state.lists.active,
      title: activeList.name,
      fields: activeList.fields,
      collectionFields: state.collections.items[state.collections.active].fields,
      items: state.items.items,
      order: state.items.order[state.lists.active] ? state.items.order[state.lists.active].slice() : [],
      activeList: state.lists.active,
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createItem: (listId,item) => dispatch(actions.createItem(listId,item)),
    deleteItem: (listId,item) => dispatch(actions.deleteItem(listId,item)),
    updateItem: (item) => dispatch(actions.updateItem(item)),
    updateItemOrder: (listId,itemOrder) => dispatch(actions.updateItemOrder(listId,itemOrder)),
  }
}

const ListView = connect(
  mapStateToProps,
  mapDispatchToProps
)(List)

export default ListView