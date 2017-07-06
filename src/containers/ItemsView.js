import { connect } from 'react-redux'
import Items from '../components/Items'

const mapStateToProps = state => {
  const activeList = state.lists.items.filter(list => {
    return list.id === state.lists.active;
  })[0]
  return {
    items: state.items.items,
    activeList
  }
}

const ItemsView = connect(
  mapStateToProps
)(Items)

export default ItemsView