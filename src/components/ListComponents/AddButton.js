import React from 'react'
import { Button } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'

export const AddButton = ({ onClick }) => (
  <Button onClick={onClick}><FontAwesome name='plus' style={{color: 'green'}} /></Button>
)
export default AddButton