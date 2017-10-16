import { connect } from 'react-redux'
import ListsEdit from '../components/ListsEdit'
import { actions } from '../actions'

const mapStateToProps = state => {
  let activeList = state.lists.items[state.lists.active]
  return {
    id: state.lists.active,
    title: activeList.name,
    fields: activeList.fields,
    addToTop: activeList.addToTop || false,
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