import React from 'react'
import { connect } from 'react-redux'
import List from '../components/List'
import ListCreate from '../components/ListCreate'
import ListsEdit from '../components/ListsEdit'
import { actions } from '../actions'

const Content = (props) => {
  return (
    <div>
      <ListsEdit {...props} />
      {/* {
        props.isAddList
          ? <ListCreate {...props}/>
          : <List {...props}/> 
      } */}
    </div>
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
    lists: state.lists.items.slice(),
    editingId: state.items.editing,
    isAddList: state.lists.isAdding,
    isAddItem: state.items.isAdding
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSetEditingItem: (id) => dispatch(actions.editItem(id)),
    onAcceptEditingItem: (id,item) => dispatch(actions.editItemAccept(id,item)),
    onCancelEditingItem: (id) => dispatch(actions.editItemCancel(id)),
    onAddListAccept: (list) => dispatch(actions.addListAccept(list)),
    onAddItem: () => dispatch(actions.addItem()),
    onAddItemAccept: (item) => dispatch(actions.addItemAccept(item)),
  }
}

const ContentView = connect(
  mapStateToProps,
  mapDispatchToProps
)(Content)

export default ContentView