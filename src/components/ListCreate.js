import React from 'react'
import ListEdit from './ListEdit'
import { Grid,Row,Col,Button } from 'react-bootstrap'

const onSave = state => {
  console.log(state);
}

const ListCreate = () => (
  <Grid style={{float: 'left'}}>
    <ListEdit onSave={onSave}/>
    <Row><Col mdOffset={1}><Button>Create List</Button></Col></Row>
  </Grid>
)

export default ListCreate