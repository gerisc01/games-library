import { connect } from 'react-redux'
import { actions } from '../actions'
import ListEdit from '../components/ListEdit'

const mapStateToProps = state => {
  let activeList = state.data.lists.items[state.data.lists.active]
  return {
    ...activeList,
    addToTop: activeList.addToTop || false,
    collectionFields: state.data.collections.items[state.data.collections.active].fields
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return {
    ...stateProps,
    onSave: (list) => { console.log(list); dispatchProps.updateList({_id: stateProps._id, ...list}) }
  }
}

const ListEditView = connect(
  mapStateToProps,
  {
    updateList: actions.updateList
  },
  mergeProps
)(ListEdit)

export default ListEditView