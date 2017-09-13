import React from 'react'
import { Col,Row } from 'react-bootstrap'

const ListHeader = ({ collectionFields,fields }) => {
  return (
    <Row>
      {fields.map((header,i) => {
        return (
        <Col key={header._id} mdOffset={i === 0 ? 2 : undefined} md={parseInt(header.width,10)}>
          <h4 style={{fontWeight: 'bold'}}> 
            <div>{collectionFields[header._id].name}</div>
          </h4>
        </Col>)
      })}
    </Row>
  )
}
export default ListHeader