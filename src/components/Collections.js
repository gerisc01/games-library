import React from 'react'
import { Collection } from './CollectionComponents'
import { Nav,Navbar,NavItem } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'

const Collections = (props) => (
  <Navbar>
    <Nav bsStyle="tabs" activeKey={props.activeCollection}>
      {props.order.map((id,index) => (
        <Collection key={id} {...props} {...props.collections[id]}
          activeCollection={index === props.activeIndex}
          onClick={!props.isEditingLists ? () => props.setActiveCollection(index) : undefined}
        />
      ))}
    </Nav>
    <Nav pullRight>
      <NavItem>
        <span 
          style={
            {
              fontSize: '125%',
              fontWeight: 'bold',
              color: props.saveFailed ? 'red' : props.isModified ? 'blue' : 'grey'
            } 
          }
          onClick={() => props.saveChanges(props.state)}
        >
          {props.isSaving ? <FontAwesome name="spinner" spin /> :  <FontAwesome name='floppy-o' />} Save
        </span>
      </NavItem>
    </Nav>
  </Navbar>
)
export default Collections;