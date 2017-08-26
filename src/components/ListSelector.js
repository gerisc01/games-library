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

const ListSelectorNormal = ({ lists,order,activeId,setActiveList,startAddList,isModifyingLists,stopModifyingLists,moveItem }) => (
  <div style={listSelectorStyle}>
    {order.map(id => (
      <ListButton
        key={id}
        activeList={id === activeId && !isModifyingLists}
        onClick={
          () => {
            setActiveList(id);
            if (isModifyingLists) stopModifyingLists(); 
          }
        }
        moveItem={moveItem}
        {...lists[id]}
      />
    ))}
    <ListAddButton onClick={startAddList}/>
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
      order: this.props.editListsOrder,
      items: this.props.lists,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(this.state.editListOrder) !== JSON.stringify(nextProps.editListOrder)) {
      this.setState({order: nextProps.editListOrder, items: nextProps.lists})
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
          setEditListsOrder={() => this.props.setEditListsOrder(this.state.order)}>
          <ListButton {...this.state.items[id]} />
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
    console.log(monitor.didDrop());
    // if (!monitor.didDrop()) props.resetOrder()
  }
}

const cardTarget = {
  drop(props, monitor) {
    props.setEditListsOrder()
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