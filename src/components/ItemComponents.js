import React from 'react'
import { DragSource } from 'react-dnd'
import { Button,Col,Row } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'

/**
 * Implements the drag source contract.
 */
const cardSource = {
  beginDrag(props) {
    return {
      text: props.text
    };
  }
};

/**
 * Specifies the props to inject into your component.
 */
function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}


export function ItemRowSource({ item,fields,isEditing,onClicks,isDragging,connectDragSource }) {
  return connectDragSource(
  <div>
    {isEditing
      ? <ItemEdit
          fields={fields}
          item={item}
          acceptClick={() => onClicks.acceptEditingItem(item.id,item)}
          cancelClick={() => onClicks.cancelEditingItem(item.id)} />
      : <Item
          fields={fields}
          item={item}
          editClick={() => onClicks.setEditingItem(item.id)} />}
    </div>
  )
}
export const ItemRow = DragSource('card',cardSource,collect)(ItemRowSource);

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
        <Button onClick={() => acceptClick(item.id,item)}><FontAwesome name='check' style={{color: 'green'}}/></Button>
      </div>
    </Col>
    {fields.map(field => {
      return (
        <Col 
          key={field.id.toString()+"-"+('id' in item ? item.id.toString() : "new")}
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