import React from 'react'
import { NavItem } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'


export const Collection = ({ dispatch, id, name, activeCollection, onClick, onEditLists }) => (
  <NavItem
    eventKey={id}
    onClick={!activeCollection ? onClick : null}
    active={activeCollection}
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
  {activeCollection ? <ListEditButtons onEditLists={onEditLists}/> : null}
  {name}
  </NavItem>
)

/************************************************
 * HELPER COMPONENTS
 ***********************************************/

 const ListEditButtons = ({ onEditLists }) => (
   <span onClick={onEditLists} style={{marginRight: '5px',cursor: 'pointer'}}><FontAwesome name='pencil'/></span>
 )