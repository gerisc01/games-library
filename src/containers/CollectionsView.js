import { connect } from 'react-redux'
import Collections from '../components/Collections'
import { actions } from '../actions'

const mapStateToProps = (state, ownProps) => {
  return {
    collections: state.collections.items,
    order: state.collections.order,
    activeCollection: state.collections.active,
    isModifyingLists: ownProps.isAddingList || ownProps.isEditingLists,
    isModified: state.lists.modified || state.items.modified,
    isSaving: state.collections.isSaving,
    listsOrder: state.lists.order,
    state: state
  }
}

const mapDispatchToProps = (dispatch,ownProps) => {
  return {
    setActiveCollection: (id) => dispatch(actions.setActiveCollection(id)),
    startEditMode: () => ownProps.startEditMode(),
    stopEditMode: () => ownProps.stopEditMode(),
    saveChanges: (state) => dispatch(actions.saveChanges(state)),
  }
}

const CollectionsView = connect(
  mapStateToProps,
  mapDispatchToProps
)(Collections)

export default CollectionsView