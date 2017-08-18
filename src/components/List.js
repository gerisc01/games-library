import React from 'react'
import { ListTitle,ListHeader,ItemList,ItemAddButton,ItemEdit } from './ListComponents'
import { Grid } from 'react-bootstrap'

const List = (props) => {
  return (
    <div style={listStyle}>
      <Grid>
        <ListTitle title={props.title} />
        <ListHeader fields={props.fields} />
        <ItemList key={props.listId} {...props} />
         {/* {props.isAddItem 
          ? <ItemEdit
              fields={props.fields}
              item={props.fields.reduce((item,field) => { item[field["id"]] = ""; return item; },{})}
              acceptClick={(id,item) => props.onAddItemAccept(item)}
              cancelClick={props.onCancelEditingItem}/>
          : <ItemAddButton onClick={props.onAddItem}/>}  */}
      </Grid>
    </div>
  )
}

const listStyle = {
  float: 'left',
}

export default List