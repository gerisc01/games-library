import React from 'react'
import Item from './Item'

const Items = ({ items }) => (
  <ul className="items">
    {items.map(item => (
      <Item
        key={item.id}
        {...item}
      />
    ))}
  </ul>
)
export default Items;