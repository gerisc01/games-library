import React from 'react'
import { Col,Row } from 'react-bootstrap'

const ListTitleEdit = ({ title,onEdit }) => (
  <Row>
    <Col mdOffset={1}>
      <h3><input value={title} onChange={(e) => onEdit(e.target.value)}/></h3>
    </Col>
  </Row>
)
export default ListTitleEdit