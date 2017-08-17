import React from 'react'
import { Collection } from './CollectionComponents'
import { Nav,Navbar } from 'react-bootstrap'

const Collections = ({ collections,order,activeCollection,setActiveCollection }) => (
  <Navbar>
    <Nav bsStyle="tabs" activeKey={activeCollection}>
      {order.map(id => (
        <Collection 
          key={id}
          {...collections[id]}
          activeCollection={id === activeCollection}
          onClick={() => setActiveCollection(id)}
        />
      ))}
    </Nav>
  </Navbar>
)
export default Collections;