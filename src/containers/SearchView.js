import { connect } from 'react-redux'
import Search from '../components/Search'

const mapStateToProps = state => {
  const collectionId = state.data.collections.order[state.app.activeIndex.collection]
  return {
    // Collection data
    collectionId,
    collectionFields: state.data.collections.items[collectionId].fields,
    // List data
    lists: state.data.lists.items,
    // Item data
    items: state.data.items.items
  }
}

const SearchView = connect(
  mapStateToProps
)(Search)
export default SearchView