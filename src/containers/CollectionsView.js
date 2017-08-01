import { connect } from 'react-redux'
import Collections from '../components/Collections'
import { actions } from '../actions'

const mapStateToProps = state => {
  return {
    collections: state.collections.items,
    activeCollection: state.collections.active,
    isEditingLists: state.lists.isEditing,
  }
}

const mapDispatchToProps = {
  setActiveCollection: actions.setActiveCollection,
  onEditLists: actions.editLists,
  onEditListsCancel: actions.editListsCancel,
}

const CollectionsView = connect(
  mapStateToProps,
  mapDispatchToProps
)(Collections)

export default CollectionsView