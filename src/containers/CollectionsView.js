import { connect } from 'react-redux'
import Collections from '../components/Collections'
import { actions } from '../actions'

const mapStateToProps = (state, ownProps) => {
  return {
    collections: state.collections.items,
    order: state.collections.order,
    activeCollection: state.collections.active,
    isModifyingLists: ownProps.isAddingList || ownProps.isEditingLists,
    listsOrder: state.lists.order
  }
}

const mapDispatchToProps = (dispatch,ownProps) => {
  return {
    setActiveCollection: (id) => dispatch(actions.setActiveCollection(id)),
    startEditMode: () => ownProps.startEditMode(),
    stopEditMode: () => ownProps.stopEditMode(),
  }
}

const CollectionsView = connect(
  mapStateToProps,
  mapDispatchToProps
)(Collections)

export default CollectionsView