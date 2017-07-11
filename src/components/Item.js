import React from 'react'
import { Button,Col,Row } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'

export const Item = ({ fields,item,editClick }) => (
  <Row>
    <Col md={2} >
      <div style={{float: 'right'}}>
        <Button onClick={editClick}><FontAwesome name='pencil'/></Button>
        <Button><FontAwesome name='trash'/></Button>
      </div>
    </Col>
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

export const ItemEdit = ({ fields,item,acceptClick,cancelClick }) => (
  <Row>
    <Col md={2} >
      <div style={{float: 'right'}}>
        <Button onClick={cancelClick}><FontAwesome name='remove' style={{color: 'red'}}/></Button>
        <Button onClick={acceptClick}><FontAwesome name='check' style={{color: 'green'}}/></Button>
      </div>
    </Col>
    {fields.map(field => {
      return (
        <Col 
          key={field.id.toString()+"-"+item.id.toString()}
          md={parseInt(field.width,10)}>
        <input 
          type="text"
          defaultValue={item[field.id]}
          style={{width: '95%'}}
          onBlur={(event) => { item[field.id] = event.target.value }} />
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