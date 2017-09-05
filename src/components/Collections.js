import React from 'react'
import { Collection } from './CollectionComponents'
import { Nav,Navbar } from 'react-bootstrap'

const Collections = (props) => (
  <Navbar>
    <Nav bsStyle="tabs" activeKey={props.activeCollection}>
      {props.order.map(id => (
        <Collection
          key={id}
          {...props}
          {...props.collections[id]}
          activeCollection={id === props.activeCollection}
          onClick={!props.isEditingLists ? () => props.setActiveCollection(id) : undefined}
        />
      ))}
    </Nav>
  </Navbar>
)
export default Collections;