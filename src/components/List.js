import React from 'react'
import { ListTitle,ListHeader } from './ListComponents'
import { ItemRow,ItemAddButton,ItemEdit } from './ItemComponents'
import { Grid } from 'react-bootstrap'

const List = (props) => {
  let itemEditingOnClicks = {
    onSetEditingItem: props.onSetEditingItem,
    onAcceptEditingItem: props.onAcceptEditingItem,
    onCancelEditingItem: props.onCancelEditingItem,
  }
  
  return (
    <div style={listStyle}>
      <Grid>
        <ListTitle title={props.title} />
        <ListHeader fields={props.fields} />
        {props.items.map(item => {
          return <ItemRow 
            key={item.id} item={item} fields={props.fields} isEditing={props.editingId === item.id} onClicks={itemEditingOnClicks} />
        })}
        {props.isAddItem 
          ? <ItemEdit fields={props.fields} />
          : <ItemAddButton onClick={props.onAddItem}/>}
      </Grid>
    </div>
  )
}

const listStyle = {
  float: 'left',
}

export default List