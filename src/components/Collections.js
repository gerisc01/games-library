import React from 'react'
import { Collection } from './CollectionComponents'
import { Nav,Navbar } from 'react-bootstrap'

const Collections = ({ collections,order,activeCollection,setActiveCollection,startEditLists,stopModifyingLists,isEditingLists,isModifyingLists,listsOrder,setEditListsOrder }) => (
  <Navbar>
    <Nav bsStyle="tabs" activeKey={activeCollection}>
      {order.map(id => (
        <Collection 
          key={id}
          {...collections[id]}
          activeCollection={id === activeCollection}
          onClick={
            () => {
              setActiveCollection(id)
              if (isModifyingLists) stopModifyingLists(); 
            }
          }
          isEditingLists={isEditingLists}
          startEditLists={
            () => {
              startEditLists()
              setEditListsOrder(listsOrder)
            }
          }
          stopModifyingLists={stopModifyingLists}
        />
      ))}
    </Nav>
  </Navbar>
)
export default Collections;