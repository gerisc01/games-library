import React from 'react'
import { DragSource,DropTarget } from 'react-dnd'
import { ListAddButton,ListButton } from './ListSelectorComponents'

const ListSelector = (props) => {
  if (props.isEditingLists) {
    return <ListSelectorEdit {...props} />
  } else {
    return <ListSelectorNormal {...props} />
  }
}

const ListSelectorNormal = (props) => (
  <div style={listSelectorStyle}>
    {props.order.map(id => (
      <ListButton key={id} {...props} activeList={id === props.activeId} {...props.lists[id]}
        onClick={() => { props.setActiveList(id); if (props.isAddingList) props.stopEditMode();}} />
    ))}
    <ListAddButton onClick={props.startAddList}/>
  </div>
)

const listSelectorStyle = {
  float: 'left',
  width: '200px',
  height: '500px',
  marginTop: '70px'
}


class ListSelectorEdit extends React.Component {  
  constructor(props, context) {
    super(props, context);

    // Save a start swap order so that if an item is not dropped in a valid drop target it can be
    // reset to the pre-drag location
    this.startSwapOrder = null

    // Populate items
    this.state = {
      order: this.props.order,
      items: this.props.lists,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.startSwapOrder = null
    if (JSON.stringify(this.state.order) !== JSON.stringify(nextProps.order)) {
      this.setState({order: nextProps.order, items: nextProps.lists})
    }
  }

  swapItems = (originId,destinationId) => {
    if (this.startSwapOrder === null) this.startSwapOrder = this.state.order.slice(0)
    this.setState({order: this.state.order.map(id => {
      return id === originId ? destinationId : id === destinationId ? originId : id
    })})
  }

  resetOrder = () => {
    if (this.state.editingId !== undefined) return;
    this.setState({order: this.startSwapOrder.slice(0)})
    this.startSwapOrder = null
  }

  render() {
  return (
    <div style={listSelectorStyle}>
      {this.state.order.map(id => (
        <SortableItem key={id} swapItems={this.swapItems} resetOrder={this.resetOrder}
          setEditListsOrder={() => this.props.setEditListsOrder(this.state.order)}
          updateOrder={() => this.props.updateListOrder(this.props.collectionId,this.state.order)}>
          <ListButton {...this.state.items[id]} onClick={() => this.props.setActiveList(id)} activeList={id === this.props.activeId} />
        </SortableItem>
      ))}
    </div>)
  }
}

const cardSource = {
  beginDrag(props) {
    return {
      list: props.children.props
    }
  },
  endDrag(props, monitor) {
    if (!monitor.didDrop()) props.resetOrder()
  }
}

const cardTarget = {
  drop(props, monitor) {
    props.updateOrder()
  },
  hover(props, monitor) {
    const draggedId = monitor.getItem().list._id
    const overId = props.children.props._id

    if (draggedId !== overId) {
      props.swapItems(draggedId, overId)
    }
  }
}

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

const SortableItemDumb = (props) => (
  props.connectDropTarget(props.connectDragSource(
    <div style={{opacity: props.isDragging ? 0 : 1}}>{props.children}</div>
  ))
)
const SortableItem = DropTarget('list',cardTarget,targetCollect)(DragSource('list',cardSource,sourceCollect)(SortableItemDumb))

export default ListSelector;