import React from 'react'
import { Col,Row } from 'react-bootstrap'

const Title = ({ editing,title,onEdit }) => (
  <Row>
    <Col mdOffset={1}>
      {
        !editing
        ? <h3>{title}</h3>
        : <h3><input value={title} onChange={(e) => onEdit(e.target.value)}/></h3>
      }
    </Col>
  </Row>
)
export default Title