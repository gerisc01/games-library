import { connect } from 'react-redux'
import List from '../components/List'
import { actions } from '../actions'

const mapStateToProps = state => {
  let fields = state.lists.active
  ? state.lists.items[state.lists.active].fields.map(field => {
    return {...field, name: state.lists.fields[field._id].name}
  })
  : []
  return {
    id: state.lists.active,
    title: state.lists.active ? state.lists.items[state.lists.active].name : "",
    fields: fields,
    items: state.items.items,
    order: state.lists.active ? state.items.order[state.lists.active].slice() : [],
    activeList: state.lists.active,
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