import React from 'react'
import { Button,Col,Row } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'

export function ItemRow({ item,fields,isEditing,onClicks }) {
  return isEditing
    ? <ItemEdit
        fields={fields}
        item={item}
        acceptClick={() => onClicks.acceptEditingItem(item.id,item)}
        cancelClick={() => onClicks.cancelEditingItem(item.id)} />
    : <Item
        fields={fields}
        item={item}
        editClick={() => onClicks.setEditingItem(item.id)} />
}

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
          key={field.id.toString()+"-"+(item ? item.id.toString() : "new")}
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

export const ItemAddButton = ({ onClick }) => (
  <Row>
    <Col md={2}>
      <Button onClick={() => onClick()} style={{float: 'right'}}>
        <FontAwesome name='plus' style={{color: 'green'}}/>
      </Button>
    </Col>
  </Row>
)