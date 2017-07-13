import React from 'react'
import { Collection } from './CollectionComponents'
import { Nav,Navbar } from 'react-bootstrap'

const Collections = ({ collections,activeCollection,setActiveCollection }) => (
  <Navbar>
    <Nav bsStyle="tabs" activeKey={activeCollection}>
      {collections.map(collection => (
        <Collection 
          key={collection.id}
          {...collection}
          activeCollection={collection.id === activeCollection}
          onClick={() => setActiveCollection(collection.id)}
        />
      ))}
    </Nav>
  </Navbar>
)
export default Collections;