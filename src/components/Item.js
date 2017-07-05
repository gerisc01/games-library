import React from 'react'

const Item = ({ id, column1 }) => (
  <li className={id}>{column1}</li>
)
export default Item;