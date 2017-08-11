import { connect } from 'react-redux'
import ListSelector from '../components/ListSelector'
import { actions } from '../actions'

const mapStateToProps = state => {
  return {
    lists: state.lists.items,
    activeListId: state.lists.active
  }
}


const ListSelectorView = connect(
  mapStateToProps,
  // Dispatch to Props
  {
    setActiveList: actions.setActiveList,
    addList: actions.addList,
  }
)(ListSelector)

export default ListSelectorView