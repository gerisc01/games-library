import { connect } from 'react-redux'
import ListSelector from '../components/ListSelector'
import { actions } from '../actions'

const defaultState = {
  order: []
}

const mapStateToProps = (state) => {
  if (state.app.isFetching) return defaultState
  const collectionId = state.data.collections.order[state.app.activeIndex.collection]
  return {
    // Application data
    isAddingList: state.app.isAddingList,
    isEditingLists: state.app.isEditingLists,
    collectionId,
    // List data
    id: state.data.lists.order[collectionId][state.app.activeIndex.list],
    // return all list items for now - can filter later if needed for perf.
    lists: state.data.lists.items,
    // slice the order so modifications made to order don't affect the state copy
    order: (state.data.lists.order[collectionId] || []).slice()
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveList: (id) => dispatch(actions.setActiveList(id)),
    moveItem: (itemId,listId,newListId) => { dispatch(actions.moveItem(itemId,listId,newListId)) },
    updateListOrder: (collectionId,order) => dispatch(actions.updateListOrder(collectionId,order)),
    startAddList: () => dispatch(actions.startAddList()),
    stopEditMode: () => dispatch(actions.stopEditMode()),
    stopModifyingLists: () => dispatch(actions.stopEditMode())
  }
}

const mergeProps = (stateProps, dispatchProps) => {
  return {
    ...stateProps,
    ...dispatchProps,
    // overwrite actions with defaulted params based on the currently loaded data
    moveItem: (itemId,newListId) => dispatchProps.moveItem(itemId,stateProps.id,newListId),
    updateListOrder: (order) => dispatchProps.updateListOrder(stateProps.collectionId,order)
  }
}

const ListSelectorView = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(ListSelector)

export default ListSelectorView