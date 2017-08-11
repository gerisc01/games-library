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

const Item = ({ fields,item,editClick,isDragging,connectDragSource }) => (
  connectDragSource(
    <div>
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
    </div>
  )
)
export default DragSource('card',cardSource,collect)(Item);