import React from 'react'
import { Col,Row } from 'react-bootstrap'

// export const Item = props => (
//   <li className={props.id}>{props.column1}</li>
// )
export const Item = ({ fields,item }) => (
  <Row>
    <Col md={2}>{/*The edit buttons will eventually go here*/}</Col>
    {fields.map(field => {
      return (
        <Col 
          key={field.id.toString()+"-"+item.id.toString()}
          md={parseInt(field.width,10)}>
        {item[field.id]}
        </Col>
      )
    })}
  </Row>
)

// Item header is a special type of Item with bolded header names and no edit/move events
export const ItemHeader = ({ fields }) => (
  <Row>
    {fields.map((header,i) => {
      return (
      <Col key={header.id} mdOffset={i === 0 ? 2 : undefined} md={parseInt(header.width,10)}>
        <h4 style={{fontWeight: 'bold'}}>{header.name}</h4>
      </Col>)
    })}
  </Row>
)