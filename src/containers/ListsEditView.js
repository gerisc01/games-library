import { connect } from 'react-redux'
import ListsEdit from '../components/ListsEdit'

const mapStateToProps = state => {
  // return {
  //   lists: state.lists.items,
  //   order: state.lists.order.slice(0),
  //   fields: state.lists.fields,
  //   active: state.lists.active
  // }
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
  }
}

const ListsEditView = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListsEdit)

export default ListsEditView