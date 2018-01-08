import { connect } from 'react-redux'
import { actions } from '../actions'
import ListEdit from '../components/ListEdit'

const mapStateToProps = state => {
  const collectionFields = state.collections.items[state.collections.active].fields
  return {
    collectionId: state.collections.active,
    collectionFields: collectionFields,
    // deafult list props on create screen
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

const mergeProps = (stateProps,dispatchProps,ownProps) => {
  return {
    ...stateProps,
    onSave: (list) => { dispatchProps.createList(stateProps.collectionId,list); ownProps.stopEditMode(); }
  }
}

const ListCreateView = connect(
  mapStateToProps,
  {
    createList: actions.createList
  },
  mergeProps
)(ListEdit)

export default ListCreateView