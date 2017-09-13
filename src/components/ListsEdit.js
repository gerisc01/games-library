import React from 'react'
import { Grid } from 'react-bootstrap'
import { ListEdit } from './ListComponents'

let listDetails;
let updateList;
const ListsEdit = (props) => {
  updateList = props.updateList;
  listDetails = {
    _id: props.id,
    name: props.title,
    fields: props.fields
  }

  return (
    <Grid style={{float: 'left'}}>
      <ListEdit {...props} key={props.id} onSave={onSave} list={listDetails}/>
    </Grid>
  )
}

const onSave = state => {
  updateList(Object.assign({_id: listDetails._id},state))
}

export default ListsEdit