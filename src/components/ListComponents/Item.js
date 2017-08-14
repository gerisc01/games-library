import React from 'react'
import { DragSource,DropTarget } from 'react-dnd'
import { Button,Col,Row } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'

const cardSource = {
  beginDrag(props) {
    return {
      item: props.item
    }
  },
};

const cardTarget = {
  hover(props, monitor) {
    const draggedId = monitor.getItem().item.id
    const overId = props.item.id

    if (draggedId !== overId) {
      props.swapItems(draggedId, overId);
    }
  },
};

/**
 * Specifies the props to inject into your component.
 */
function sourceCollect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

function targetCollect(connect) {
  return {
    connectDropTarget: connect.dropTarget(),
  }
}

const Item = ({ fields,item,editClick,isDragging,connectDragSource,connectDropTarget,swapItems }) => (
  connectDropTarget(connectDragSource(
    <div style={{opacity: isDragging ? 0 : 1}}>
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
  ))
)
export default DropTarget('item',cardTarget,targetCollect)(DragSource('item',cardSource,sourceCollect)(Item));