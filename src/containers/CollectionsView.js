import { connect } from 'react-redux'
import Collections from '../components/Collections'
import { actions } from '../actions'

const mapStateToProps = state => {
  return {
    collections: state.collections.items,
    order: state.collections.order,
    activeCollection: state.collections.active
  }
}

const mapDispatchToProps = {
  setActiveCollection: actions.setActiveCollection,
  // onEditLists: actions.editLists,
  // onEditListsCancel: actions.editListsCancel,
}

const CollectionsView = connect(
  mapStateToProps,
  mapDispatchToProps
)(Collections)

export default CollectionsView