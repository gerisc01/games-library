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
  endDrag(props, monitor) {
    if (!monitor.didDrop()) props.resetOrder()
  }
};

const cardTarget = {
  drop(props, monitor) {
    props.updateItemOrder()
  },
  hover(props, monitor) {
    const draggedId = monitor.getItem().item._id
    const overId = props.item._id

    if (draggedId !== overId) {
      props.swapItems(draggedId, overId);
    }
  }
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

const Item = ({ fields,item,editClick,deleteItem,hidden,isDragging,connectDragSource,connectDropTarget,swapItems }) => (
  connectDropTarget(connectDragSource(
    <div style={{opacity: isDragging ? 0 : 1, display: hidden ? 'none' : 'block'}}>
      <Row>
        <Col md={2} >
          <div style={{float: 'right'}}>
            <Button onClick={editClick}><FontAwesome name='pencil'/></Button>
            <Button onClick={deleteItem}><FontAwesome name='trash'/></Button>
          </div>
        </Col>
        {fields.map((field,i) => {
          return (
            <Col 
              key={i+"-"+item._id.toString()}
              md={parseInt(field.width,10)}>
            {item[field._id]}
            </Col>
          )
        })}
      </Row>
    </div>
  ))
)
export default DropTarget('item',cardTarget,targetCollect)(DragSource('item',cardSource,sourceCollect)(Item));