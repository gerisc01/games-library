import React from 'react'
import { Button,Col,Row } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'

export const ItemAddButton = ({ onClick }) => (
  <Row>
    <Col md={2}>
      <Button onClick={() => onClick()} style={{float: 'right'}}>
        <FontAwesome name='plus' style={{color: 'green'}}/>
      </Button>
    </Col>
  </Row>
)
export default ItemAddButton