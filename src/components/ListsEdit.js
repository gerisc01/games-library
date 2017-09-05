import React from 'react'
import { Grid,Row,Col,Button } from 'react-bootstrap'
import { ListEdit } from './ListComponents'

let listDetails;
const ListsEdit = (props) => {
  listDetails = {
    _id: props.id,
    name: props.title,
    fields: props.fields
  }

  return (
    <Grid style={{float: 'left'}}>
      <ListEdit key={props.id} onSave={onSave} list={listDetails}/>
      <Row><Col mdOffset={1}><Button onClick={() => props.onAddListAccept(listDetails)}>Create List</Button></Col></Row>
    </Grid>
  )
}

const onSave = state => {
  listDetails = Object.assign(listDetails,state);
}

export default ListsEdit