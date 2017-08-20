import { connect } from 'react-redux'
import ListCreate from '../components/ListCreate'
import { actions } from '../actions'

const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createList: (list) => dispatch(actions.createList(list)),
  }
}

const ListCreateView = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListCreate)

export default ListCreateView