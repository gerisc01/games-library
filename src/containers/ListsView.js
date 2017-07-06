import { connect } from 'react-redux'
import Lists from '../components/Lists'
import { actions } from '../actions'

const mapStateToProps = state => {
  return {
    lists: state.lists.items,
    activeListId: state.lists.active
  }
}


const ListsView = connect(
  mapStateToProps,
  // Dispatch to Props
  {
    setActiveList: actions.setActiveList
  }
)(Lists)

export default ListsView