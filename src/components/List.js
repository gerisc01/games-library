import React from 'react'
import { ListTitle,ListHeader } from './ListComponents'
import { ItemRow } from './ItemComponents'
import { Grid } from 'react-bootstrap'

const List = ({ title,fields,items,editingId,onClicks }) => (
  <div style={listStyle}>
    <Grid>
      <ListTitle title={title} />
      <ListHeader fields={fields} />
      {items.map(item => {
        return <ItemRow 
          key={item.id} item={item} fields={fields} isEditing={editingId === item.id} onClicks={onClicks} />
      })}
    </Grid>
  </div>
)

const listStyle = {
  float: 'left',
}

export default List