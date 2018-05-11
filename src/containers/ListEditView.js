import { connect } from 'react-redux'
import { actions } from '../actions'
import ListEdit from '../components/ListEdit'

const mapStateToProps = state => {
  const collectionId = state.data.collections.order[state.app.activeIndex.collection]
  const id = state.data.lists.order[collectionId][state.app.activeIndex.list]
  const listItem = state.data.lists.items[id] || {}
  return {
    // Collection data
    collectionFields: state.data.collections.items[collectionId].fields,
    // List data
    ...listItem,
    addToTop: listItem.addToTop || false,
    defaultSort: listItem.defaultSort || {}
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateList: (list) => dispatch(actions.updateList(list))
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return {
    ...stateProps,
    ...dispatchProps,
    // overwrite actions with defaulted params based on the currently loaded data
    confirmListChanges: (list) => { dispatchProps.updateList({_id: stateProps._id, ...list}) }
  }
}

const ListEditView = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(ListEdit)
export default ListEditView