import React from 'react'
import { NavItem } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'


export const Collection = ({ dispatch, id, name, activeCollection, onClick, startEditLists, stopEditLists, isEditingLists }) => (
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
  {activeCollection ? <ListEditButtons isEditingLists={isEditingLists} startEditLists={startEditLists} stopEditLists={stopEditLists} /> : null}
  {name}
  </NavItem>
)

/************************************************
 * HELPER COMPONENTS
 ***********************************************/

const ListEditButtons = ({ isEditingLists,startEditLists,stopEditLists,onEditListsAccept }) => {
  {
    return isEditingLists
      ? (<span>
          <span onClick={stopEditLists} style={{marginRight: '5px',cursor: 'pointer'}}><FontAwesome name='remove' style={{color: 'red'}}/></span>
          <span onClick={onEditListsAccept} style={{marginRight: '5px',cursor: 'pointer'}}><FontAwesome name='check' style={{color: 'green'}}/></span>
          </span>
        )
      : <span onClick={startEditLists} style={{marginRight: '5px',cursor: 'pointer'}}><FontAwesome name='pencil'/></span>
  }
}