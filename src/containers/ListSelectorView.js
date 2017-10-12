import { connect } from 'react-redux'
import ListSelector from '../components/ListSelector'
import { actions } from '../actions'

const mapStateToProps = (state,ownProps) => {
  return {
    lists: state.lists.items,
    order: state.lists.order[state.collections.active] || [],
    collectionId: state.collections.active,
    activeId: state.lists.active,
    isModifyingLists: ownProps.isAddingList || ownProps.isEditingLists,
  }
}

const mapDispatchToProps = (dispatch,ownProps) => {
  return {
    setActiveList: (id) => dispatch(actions.setActiveList(id)),
    moveItem: (newListId,itemId) => dispatch(actions.moveItem(newListId,itemId)),
    updateListOrder: (collectionId,order) => dispatch(actions.updateListOrder(collectionId,order)),
    startAddList: () => ownProps.startAddList(),
    stopModifyingLists: () => ownProps.stopModifyingLists(),
  }
}


const ListSelectorView = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListSelector)

export default ListSelectorView