import React from 'react'
import { NavItem } from 'react-bootstrap'


export const Collection = ({ dispatch, id, name, activeCollection, onClick }) => (
  <NavItem
    eventKey={id}
    onClick={onClick}
    style={
      activeCollection
      // Style if the collection is currently active
      ? {
        fontWeight: 'bold'
      }
      // Style if the collection is not currently active 
      : {
        cursor: 'pointer'
      }
    }
  >
  {name}
  </NavItem>
)