import { connect } from 'react-redux'
import ListCreate from '../components/ListCreate'
import { actions } from '../actions'

const mapStateToProps = state => {
  return {
    collectionId: state.collections.active,
    collectionFields: state.collections.items[state.collections.active].fields,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createList: (collectionId,list) => dispatch(actions.createList(collectionId,list)),
  }
}

const ListCreateView = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListCreate)

export default ListCreateView