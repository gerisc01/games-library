import React from 'react'
import { NavItem } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'


export const Collection = (props) => (
  <NavItem
    eventKey={props.id}
    onClick={!props.activeCollection ? props.onClick : null}
    active={props.activeCollection}
    style={
      props.activeCollection
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
  {props.activeCollection ? <ListEditButtons {...props} /> : null}
  {props.name}
  </NavItem>
)

/************************************************
 * HELPER COMPONENTS
 ***********************************************/

const ListEditButtons = (props) => {
  return props.isEditingLists
    ? <span onClick={props.stopEditMode} style={{marginRight: '5px',cursor: 'pointer'}}><FontAwesome name='remove'/></span>
    : <span onClick={props.startEditMode} style={{marginRight: '5px',cursor: 'pointer'}}><FontAwesome name='pencil'/></span>
}