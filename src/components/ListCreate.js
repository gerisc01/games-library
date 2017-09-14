import React from 'react'
import { Grid } from 'react-bootstrap'
import { ListEdit } from './ListComponents'
import { colorMap } from '../resources/js/utils'

let newList;
let createList;
let stopEditMode;
let colors = Object.keys(colorMap).filter(color => color.startsWith("pastel"))
const ListCreate = (props) => {
  createList = props.createList;
  stopEditMode = props.stopEditMode;
  // Set the default list properties
  newList = {
    color: 'pastel-blue',
    name: 'New List Name',
    fields: [
      {
        _id: Object.keys(props.collectionFields)[0],
        width: "3"
      }
    ]
  }

  return (
    <Grid style={{float: 'left'}}>
      <ListEdit {...props} onSave={onSave} list={newList}/>
    </Grid>
  )
}

const onSave = state => {
  // Generate a random color for now
  let listColor = colors[Math.floor(Math.random()*10%6)]
  createList(Object.assign({color: listColor},state))
  stopEditMode()
}

export default ListCreate