import React from 'react'
import { Item,ItemEdit,ItemHeader } from './Item'
import { Col,Grid,Row } from 'react-bootstrap'

function Items({ items,activeList,editingId,onClicks }) {
  return (
    <div className="items" style={itemsStyle}>
      <Grid>
        <Row>
          <Col mdOffset={1}><h3>{activeList.name}</h3></Col>
        </Row>
        <ItemHeader fields={activeList.fields}/>
        {items.map(item => {
          if (item.id === editingId) {
            return <ItemEdit
              key={item.id}
              fields={activeList.fields}
              item={item} 
              acceptClick={() => onClicks.acceptEditingItem(item.id,item)}
              cancelClick={() => onClicks.cancelEditingItem(item.id)} />
          } else {
            return <Item
              key={item.id}
              fields={activeList.fields}
              item={item}
              editClick={() => onClicks.setEditingItem(item.id)} />
          }
        })}
      </Grid>
    </div>
  )
}

const itemsStyle = {
  float: 'left'
}
export default Items;