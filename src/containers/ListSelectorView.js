import { connect } from 'react-redux'
import ListSelector from '../components/ListSelector'
import { actions } from '../actions'

const mapStateToProps = (state) => {
  return {
    lists: state.data.lists.items,
    order: state.data.lists.order[state.data.collections.active] || [],
    collectionId: state.data.collections.active,
    activeId: state.data.lists.active,
    isModifyingLists: state.app.isAddingList || state.app.isEditingLists,
    isAddingList: state.app.isAddingList,
    isEditingLists: state.app.isEditingLists
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveList: (id) => dispatch(actions.setActiveList(id)),
    moveItem: (newListId,itemId) => dispatch(actions.moveItem(newListId,itemId)),
    updateListOrder: (collectionId,order) => dispatch(actions.updateListOrder(collectionId,order)),
    startAddList: () => dispatch(actions.startAddList()),
    stopEditMode: () => dispatch(actions.stopEditMode()),
    stopModifyingLists: () => dispatch(actions.stopEditMode())
  }
}


const ListSelectorView = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListSelector)

export default ListSelectorView