import React from 'react'
import { DragSource,DropTarget } from 'react-dnd'
import { Grid } from 'react-bootstrap'
import { ListEdit } from './ListComponents'

let updatedLists = {}
const ListsEdit = ({ lists, order, fields }) => (
  <Grid style={{float: 'left'}}>
    {order.map(id => {
      // Add a name into each of the fields before adding passing them to ListEdit
      let list = lists[id]
      list["fields"] = list.fields.map(f => { return { ...f, name: fields[f._id].name } })
      return <SortableListEdit key={id} id={id} list={list} fields={fields} onChange={onChange} />
    })}
  </Grid>
)

const onChange = (updatedList) => {
  updatedLists[updatedList._id] = updatedList
}

const cardSource = {
  beginDrag(props) {
    console.log("Dragging begin")
    return {
      list: props.list
    }
  }
}

const cardTarget = {
  hover(props, monitor) {
    const draggedId = monitor.getItem().list._id
    const overId = props.list._id

    if (draggedId !== overId) {
      // props.swapLists(draggedId, overId)
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

const EditableListItem = ({ id,list,fields,onChange,connectDropTarget,connectDragSource }) => (
  connectDropTarget(connectDragSource(
  <div key={id} style={{border: 'dotted', marginBottom: '10px'}}>
    <ListEdit list={Object.assign({},list)} fields={fields} onChange={onChange}/>
  </div>
  ))
)

const SortableListEdit = DropTarget('list',cardTarget,targetCollect)(DragSource('list',cardSource,sourceCollect)(EditableListItem))

export default ListsEdit