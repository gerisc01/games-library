import React from 'react'
import Item from './Item'

const itemsStyle = {
  float: 'left'
}

const Items = ({ items }) => (
  <div style={itemsStyle}>
    <ul className="items">
      {items.map(item => (
        <Item
          key={item.id}
          {...item}
        />
      ))}
    </ul>
  </div>
)
export default Items;