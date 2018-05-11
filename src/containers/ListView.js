import { connect } from 'react-redux'
import List from '../components/List'
import { actions } from '../actions'

const defaultState = {
  order: []
}

const mapStateToProps = state => {
  if (state.app.isFetching) return defaultState;
  const collectionId = state.data.collections.order[state.app.activeIndex.collection]
  const id = state.data.lists.order[collectionId][state.app.activeIndex.list]
  const listItem = state.data.lists.items[id] || {}
  return {
    // Collection data
    collectionId,
    collectionFields: state.data.collections.items[collectionId].fields,
    // Collection Lists data
    // return all items for now - can filter later if needed for perf.
    collectionLists: state.data.lists.items,
    collectionListsOrder: state.data.lists.order[collectionId],
    // List data
    id: id,
    title: listItem.name,
    fields: listItem.fields,
    addToTop: listItem.addToTop || false,
    defaultSort: listItem.defaultSort || {},
    // Item data
    // return all items for now - can filter later if needed for perf.
    items: state.data.items.items,
    // slice the list order so modifications made to list order don't affect the state copy
    order: (state.data.items.order[id] || []).slice()
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createItem: (collectionId,listId,item,addToTop) => dispatch(actions.createItem(collectionId,listId,item,addToTop)),
    deleteItem: (listId,id) => dispatch(actions.deleteItem(listId,id)),
    updateItem: (item) => dispatch(actions.updateItem(item)),
    updateItemOrder: (listId,itemOrder) => dispatch(actions.updateItemOrder(listId,itemOrder)),
    moveItem: (itemId,listId,newListId) => { dispatch(actions.moveItem(itemId,listId,newListId)) },
  }
}

const mergeProps = (stateProps, dispatchProps) => {
  return  {
    ...stateProps,
    ...dispatchProps,
    // overwrite actions with defaulted params based on the currently loaded data
    createItem: (item) => dispatchProps.createItem(stateProps.collectionId,stateProps.id,item,stateProps.addToTop),
    deleteItem: (id) => dispatchProps.deleteItem(stateProps.id,id),
    updateItemOrder: (itemOrder) => dispatchProps.updateItemOrder(stateProps.id,itemOrder),
    moveItem: (itemId,newListId) => dispatchProps.moveItem(itemId,stateProps.id,newListId),
  }
}

const ListView = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(List)

export default ListView