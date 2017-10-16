import React from 'react'
import { Col,Row } from 'react-bootstrap'

const ListOption = ({ active,label,onChange }) => {
  return (
    <Row>
      <Col mdOffset={1}>
        <h4><input type="checkbox" checked={active} onChange={onChange} /> {label}</h4>
      </Col>
    </Row>
  )
}
export default ListOption