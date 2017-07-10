import { connect } from 'react-redux'
import Items from '../components/Items'
import { actions } from '../actions'

const mapStateToProps = state => {
  const activeList = state.lists.items.filter(list => {
    return list.id === state.lists.active;
  })[0]
  return {
    items: state.items.items,
    activeList,
    editingId: state.items.editing
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onClicks: {
      setEditingItem: (id) => dispatch(actions.editItem(id)),
      acceptEditingItem: (id,item) => dispatch(actions.editAccept(id,item)),
    }
  }
}

const ItemsView = connect(
  mapStateToProps,
  mapDispatchToProps
)(Items)

export default ItemsView