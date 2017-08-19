import React from 'react'
import { connect } from 'react-redux'
import List from '../components/List'
import { actions } from '../actions'

const mapStateToProps = state => {
  let fields = state.lists.items[state.lists.active].fields.map(field => {
    return {...field, name: state.lists.fields[field._id].name}
  })
  return {
    id: state.lists.active,
    title: state.lists.items[state.lists.active].name || "",
    fields: fields || [],
    items: state.items.items,
    order: state.items.order[state.lists.active].slice(),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createItem: (item) => dispatch(actions.createItem(item))
  }
}

const ListView = connect(
  mapStateToProps,
  mapDispatchToProps
)(List)

export default ListView