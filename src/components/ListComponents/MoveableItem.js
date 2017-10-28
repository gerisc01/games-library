import React from 'react'
import { DragSource,DropTarget } from 'react-dnd'

const cardSource = {
  beginDrag(props) {
    return {
      id: props.id
    }
  },
  endDrag(props, monitor) {
    if (!monitor.didDrop()) props.resetOrder()
  }
};

const cardTarget = {
  drop(props, monitor) {
    if (!props.sortable) return
    props.updateItemOrder()
  },
  hover(props, monitor) {
    if (!props.sortable) return
    const draggedId = monitor.getItem().id
    const overId = props.id

    if (draggedId !== overId) {
      props.swapItems(draggedId, overId);
    }
  }
};

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

const MoveableItem = (props) => {
  let {isDragging, connectDropTarget, connectDragSource} = props
  return (
    connectDropTarget(connectDragSource(
      <div style={{opacity: isDragging ? 0 : 1}}>
        {props.children}
      </div>
    ))
  )
}
export default DropTarget('item',cardTarget,targetCollect)(DragSource('item',cardSource,sourceCollect)(MoveableItem));