import React from 'react'
import { ContextMenu,SubMenu,MenuItem,ContextMenuTrigger } from "react-contextmenu";
import { DragSource,DropTarget } from 'react-dnd'
import Item from './Item'

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

class MoveableItem extends React.Component {
  shouldComponentUpdate(nextProps) {
    return (this.props.isDragging !== nextProps.isDragging ||
      this.props.editing !== nextProps.editing)
  }

  render() {
    let {isDragging, connectDropTarget, connectDragSource} = this.props
    return (
      <div>
        <ContextMenuTrigger id={"contextmenu"+this.props.id} holdToDisplay={-1}>
          {connectDropTarget(connectDragSource(
            <div style={{opacity: isDragging ? 0 : 1}}>
              <Item {...this.props} />
            </div>
          ))}
        </ContextMenuTrigger>
        <ItemActionsMenu {...this.props} />
      </div>
    )
  }
}
export default DropTarget('item',cardTarget,targetCollect)(DragSource('item',cardSource,sourceCollect)(MoveableItem));


const ItemActionsMenu = ({ item, moveItem, deleteItem, collectionLists, collectionListsOrder }) => (
  <ContextMenu id={"contextmenu"+item._id} style={{position: 'relative', zIndex: '5'}}>
    <SubMenu title="Move Item" hoverDelay={50}>
    {collectionListsOrder.map((id,i) => {
        return (<MenuItem key={i} onClick={() => moveItem(item._id,id)} disabled={(item.lists || []).includes(id) ? true : false}>
          {collectionLists[id].name}
        </MenuItem>)
      })}
    </SubMenu>
    <MenuItem onClick={() => deleteItem(item._id)}>Delete Item</MenuItem>
  </ContextMenu>
)