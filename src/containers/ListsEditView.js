import { connect } from 'react-redux'
import ListsEdit from '../components/ListsEdit'

const mapStateToProps = state => {
  return {
    lists: state.lists.items,
    order: state.lists.order[state.collections.active].slice(),
    fields: state.lists.fields,
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