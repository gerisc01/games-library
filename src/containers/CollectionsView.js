import { connect } from 'react-redux'
import Collections from '../components/Collections'
import { actions } from '../actions'

const defaultState = {
  order: []
}

const mapStateToProps = (state) => {
  if (state.app.isFetching) return defaultState;
  return {
    collections: state.data.collections.items,
    order: state.data.collections.order,
    listsOrder: state.data.lists.order,
    activeIndex: state.app.activeIndex.collection,
    isEditingLists: state.app.isEditingLists,
    isModified: state.app.isModified,
    isSaving: state.app.isSaving,
    isSearching: state.app.isSearching,
    saveFailed: state.app.saveFailed
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveCollection: (index) => dispatch(actions.setActiveCollection(index)),
    startEditMode: () => dispatch(actions.startEditMode()),
    stopEditMode: () => dispatch(actions.stopEditMode()),
    searchItems: () => dispatch(actions.searchItems()),
    saveChanges: (state) => dispatch(actions.saveChanges(state)),
  }
}

const CollectionsView = connect(
  mapStateToProps,
  mapDispatchToProps
)(Collections)

export default CollectionsView