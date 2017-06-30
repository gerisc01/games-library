import { connect } from 'react-redux'
import { actions } from '../actions'
import Collections from '../components/Collections'

const getCollections = (collections) => {
  return collections;
}

const mapStateToProps = state => {
  let collections = state.collections;
  let activeCollection = !activeCollection && collections.length !== 0 
    ? collections[0].id 
    : activeCollection;
  return {
    collections,
    activeCollection
  }
}

const CollectionsView = connect(
  mapStateToProps
)(Collections)

export default CollectionsView