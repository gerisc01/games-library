import { connect } from 'react-redux'
import Collections from '../components/Collections'
import { actions } from '../actions'

const mapStateToProps = (state, ownProps) => {
  return {
    collections: state.collections.items,
    order: state.collections.order,
    activeCollection: state.collections.active
  }
}

const mapDispatchToProps = (dispatch,ownProps) => {
  return {
    setActiveCollection: (id) => dispatch(actions.setActiveCollection(id)),
    startEditLists: () => ownProps.startEditLists(),
    stopModifyingLists: () => ownProps.stopModifyingLists(),
  }
}

const CollectionsView = connect(
  mapStateToProps,
  mapDispatchToProps
)(Collections)

export default CollectionsView