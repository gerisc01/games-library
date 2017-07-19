import React from 'react'
import { connect } from 'react-redux'
import List from '../components/List'
import ListEdit from '../components/ListEdit'
import { actions } from '../actions'

const Content = (props) => {
  return (
    <ListEdit />
    // <List {...props} />
  )
}

const mapStateToProps = state => {
  const activeList = state.lists.items.filter(list => {
    return list.id === state.lists.active;
  })[0]
  return {
    title: activeList ? activeList.name : "",
    fields: activeList ? activeList.fields : [],
    items: state.items.items.slice(),
    editingId: state.items.editing
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onClicks: {
      setEditingItem: (id) => dispatch(actions.editItem(id)),
      acceptEditingItem: (id,item) => dispatch(actions.editAccept(id,item)),
      cancelEditingItem: (id) => dispatch(actions.editCancel(id)),
    }
  }
}

const ContentView = connect(
  mapStateToProps,
  mapDispatchToProps
)(Content)

export default ContentView