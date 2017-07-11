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
            // Make a copy of the item before passing it to ItemEdit so that editing the object
            // doesn't edit the object in the state (making a copy of the whole items list makes
            // a copy of the list, but still references the original state items)
            const copyItem = Object.assign({},item)
            return <ItemEdit
              key={item.id}
              fields={activeList.fields}
              item={copyItem}
              acceptClick={() => onClicks.acceptEditingItem(item.id,copyItem)}
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