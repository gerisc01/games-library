import { connect } from 'react-redux'
import ListsEdit from '../components/ListsEdit'
import { actions } from '../actions'

const mapStateToProps = state => {
  return {
    id: state.lists.active,
    title: state.lists.active ? state.lists.items[state.lists.active].name : "",
    fields: state.lists.items[state.lists.active].fields,
    collectionFields: state.collections.items[state.collections.active].fields,
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