import { connect } from 'react-redux'
import Collections from '../components/Collections'
import { actions } from '../actions'

const mapStateToProps = state => {
  return {
    collections: state.collections.items,
    activeCollection: state.collections.active,
  }
}

const CollectionsView = connect(
  mapStateToProps,
  // Dispatch to Props
  {
    setActiveCollection: actions.setActiveCollection
  }
)(Collections)

export default CollectionsView