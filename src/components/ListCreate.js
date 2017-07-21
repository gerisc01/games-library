import React from 'react'
import ListEdit from './ListEdit'
import { Grid,Row,Col,Button } from 'react-bootstrap'

let newList;
const ListCreate = ({ onAddListAccept }) => {
  // Set the default list properties
  newList = {
    color: 'pastel-blue',
    name: 'New List Name',
    fields: [
      {
        id: "column1",
        name: "Column 1",
        width: "3"
      }
    ]
  }

  return (
    <Grid style={{float: 'left'}}>
      <ListEdit onSave={onSave} list={newList}/>
      <Row><Col mdOffset={1}><Button onClick={() => onAddListAccept(newList)}>Create List</Button></Col></Row>
    </Grid>
  )
}

const onSave = state => {
  newList = Object.assign(newList,state);
}

export default ListCreate