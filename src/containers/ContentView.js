import React from 'react'
import { connect } from 'react-redux'
import List from '../components/List'
import ListCreate from '../components/ListCreate'
import ListsEdit from '../components/ListsEdit'
import { actions } from '../actions'

const Content = (props) => {
  return (
    <div>
       {
        props.isEditingLists
          ? <ListsEdit {...props} />
          : props.isAddingList
            ? <ListCreate {...props}/>
            : <List {...props}/> 
      } 
    </div>
  )
}

const mapStateToProps = state => {
  let fields = state.lists.items[state.lists.active].fields.map(field => {
    return {...field, name: state.lists.fields[field._id].name}
  })
  return {
    title: state.lists.items[state.lists.active].name || "",
    fields: fields || [],
    items: state.items.items,
    itemsOrder: state.items.order[state.lists.active].slice(),
    listId: state.lists.active,
    lists: state.lists.items,
    listsOrder: state.lists.order[state.collections.active].slice(),
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