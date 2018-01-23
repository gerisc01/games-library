import { connect } from 'react-redux'
import Collections from '../components/Collections'
import { actions } from '../actions'

const mapStateToProps = (state) => {
  return {
    collections: state.data.collections.items,
    order: state.data.collections.order,
    activeCollection: state.data.collections.active,
    isModifyingLists: state.app.isAddingList || state.app.isEditingLists,
    isEditingLists: state.app.isEditingLists,
    isModified: state.data.lists.modified || state.data.items.modified,
    isSaving: state.data.collections.isSaving,
    saveFailed: state.data.collections.saveFailed,
    listsOrder: state.data.lists.order,
    state: state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveCollection: (id) => dispatch(actions.setActiveCollection(id)),
    startEditMode: () => dispatch(actions.startEditMode()),
    stopEditMode: () => dispatch(actions.stopEditMode()),
    saveChanges: (state) => dispatch(actions.saveChanges(state)),
  }
}

const CollectionsView = connect(
  mapStateToProps,
  mapDispatchToProps
)(Collections)

export default CollectionsView