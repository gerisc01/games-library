import { connect } from 'react-redux'
import ListsEdit from '../components/ListsEdit'
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
    activeList: state.lists.active,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateList: (list) => dispatch(actions.updateList(list)),
  }
}

const ListsEditView = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListsEdit)

export default ListsEditView