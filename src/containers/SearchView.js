import { connect } from 'react-redux'
import Search from '../components/Search'

const mapStateToProps = state => {
  return {
    collectionId: state.collections.active,
    collectionFields: state.collections.items[state.collections.active].fields,
    lists: state.lists.items,
    items: state.items.items
  }
}

const SearchView = connect(
  mapStateToProps
)(Search)

export default SearchView