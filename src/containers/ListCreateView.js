import { connect } from 'react-redux'
import { actions } from '../actions'
import ListEdit from '../components/ListEdit'

const mapStateToProps = state => {
  const collectionId = state.data.collections.order[state.app.activeIndex.collection]
  const collectionFields = state.data.collections.items[collectionId].fields
  return {
    // Collection data
    collectionId,
    collectionFields,
    // List data (deafult list props on create screen)
    color: 'pastel-blue',
    name: 'New List Name',
    fields: [
      {
        _id: Object.keys(collectionFields)[0],
        width: "3"
      }
    ],
    addToTop: false
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createList: (collectionId,list) => dispatch(actions.createList(collectionId,list))
  }
}

const mergeProps = (stateProps, dispatchProps) => {
  return {
    ...stateProps,
    ...dispatchProps,
    // overwrite actions with defaulted params based on the currently loaded data
    confirmListChanges: (list) => dispatchProps.createList(stateProps.collectionId,list),
  }
}

const ListCreateView = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(ListEdit)
export default ListCreateView