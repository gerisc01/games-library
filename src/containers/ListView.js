import { connect } from 'react-redux'
import List from '../components/List'
import { actions } from '../actions'

const mapStateToProps = state => {
  if (state.data.lists.isFetching || !state.data.lists.active) {
    // return a default state
    return {
      fields: [],
      order: []
    }
  } else {
    const activeList = state.data.lists.items[state.data.lists.active]
    return {
      id: state.data.lists.active,
      title: activeList.name,
      fields: activeList.fields,
      addToTop: activeList.addToTop || false,
      collectionFields: state.data.collections.items[state.data.collections.active].fields,
      items: state.data.items.items,
      order: state.data.items.order[state.data.lists.active] ? state.data.items.order[state.data.lists.active].slice() : [],
      activeList: state.data.lists.active,
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