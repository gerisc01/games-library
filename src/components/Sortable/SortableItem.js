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

const SortableItem = (props) => (
  this.props.connectDropTarget(this.props.connectDragSource(
    <div style={{opacity: this.props.isDragging ? 0 : 1}}>
      {this.props.children}
    </div>
  ))
)
export default DropTarget('item',cardTarget,targetCollect)(DragSource('item',cardSource,sourceCollect)(Item));