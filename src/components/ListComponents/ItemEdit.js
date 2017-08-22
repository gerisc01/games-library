import React from 'react'
import { Button,Col,Row } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'

const ItemEdit = ({ fields,item,acceptClick,cancelClick }) => {
  if (item === undefined || Object.keys(item).length < fields.length) {
    fields.forEach(field => { item[field._id] = item[field._id] || ""; })
  }
  return (
  <Row>
    <Col md={2} >
      <div style={{float: 'right'}}>
        <Button onClick={cancelClick}><FontAwesome name='remove' style={{color: 'red'}}/></Button>
        <Button onClick={() => acceptClick(item._id,item)}><FontAwesome name='check' style={{color: 'green'}}/></Button>
      </div>
    </Col>
    {fields.map(field => {
      return (
        <Col 
          key={field._id+"-"+(item._id || "new")}
          md={parseInt(field.width,10)}>
        <input 
          type="text"
          defaultValue={item[field._id]}
          style={{width: '95%'}}
          onBlur={(event) => { item[field._id] = event.target.value }} />
        </Col>
      )
    })}
  </Row>)
}
export default ItemEdit