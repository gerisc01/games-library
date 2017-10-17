import { connect } from 'react-redux'
import ListsEdit from '../components/ListsEdit'
import { actions } from '../actions'

const mapStateToProps = state => {
  let activeList = state.lists.items[state.lists.active]
  return {
    ...activeList,
    id: state.lists.active,
    title: activeList.name,
    addToTop: activeList.addToTop || false,
    collectionFields: state.collections.items[state.collections.active].fields
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