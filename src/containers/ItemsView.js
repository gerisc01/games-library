import { connect } from 'react-redux'
import Items from '../components/Items'

const mapStateToProps = state => {
  return {
    items: state.items.items
  }
}

const ItemsView = connect(
  mapStateToProps
)(Items)

export default ItemsView