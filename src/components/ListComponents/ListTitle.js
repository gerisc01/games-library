import React from 'react'
import { Col,Row } from 'react-bootstrap'

const ListTitle = ({ title,onEdit }) => (
  <Row>
    <Col mdOffset={1}>
      <h3>{title}</h3>
    </Col>
  </Row>
)
export default ListTitle