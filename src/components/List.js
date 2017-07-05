import React from 'react'

const List = ({ id, name, activeList, onClick }) => (
  <span 
    className={id}
    onClick={onClick}
    style={
      activeList
      // Style if the list is currently active
      ? {
        fontWeight: 'bold'
      }
      // Style if the list is not currently active 
      : {
        cursor: 'pointer'
      }
    }
  >
  {name}
  </span>
)
export default List;