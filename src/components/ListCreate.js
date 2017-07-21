import React from 'react'
import ListEdit from './ListEdit'
import { Grid,Row,Col,Button } from 'react-bootstrap'

// Set the default list properties
let newList = {
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
const onSave = state => {
  newList = Object.assign(newList,state);
}

const ListCreate = ({ onAddListAccept }) => (
  <Grid style={{float: 'left'}}>
    <ListEdit onSave={onSave} list={newList}/>
    <Row><Col mdOffset={1}><Button onClick={() => onAddListAccept(newList)}>Create List</Button></Col></Row>
  </Grid>
)

export default ListCreate