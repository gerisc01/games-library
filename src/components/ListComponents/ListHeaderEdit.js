import React from 'react'
import { Button,Col,Row } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'

const ListHeaderEdit = ({ fields,onSave,onAdd,onEdit,onDelete }) => {
  // If the fields widths sum up to less than 10, add a 'add field' button
  const rowWidth = fields.reduce((sum,field) => { return sum + parseInt(field.width,10)},0);
  return (
    <Row>
      <Col key='save-changes' md={2}>
        {onSave ? <SaveListButton onSave={onSave}/> : null}
      </Col>
      {fields.map((header) => {
        const width = parseInt(header.width,10)
        return (
        <Col key={header._id} md={width}>
          <h4>
            <div>
              <input value={header.name} style={editHeaderInputStyle} onChange={(e) => {onEdit(header._id,"name",e.target.value)}} />
              <FontAwesome name='caret-left' style={changeFieldWidthStyle} 
                onClick={width > 1 ? () => onEdit(header._id,"width",width-1) : null}/>
              <FontAwesome name='caret-right' style={changeFieldWidthStyle}
                onClick={width <10 ? () => onEdit(header._id,"width",width+1) : null}/>
            </div>
            <div style={{marginTop: '5px'}}>
              <Button onClick={() => {onDelete(header._id)}}><FontAwesome name='trash' /></Button>
            </div>
          </h4>
        </Col>
        )
      })}
      {rowWidth < 10 ? <AddFieldColumn onAdd={onAdd} /> : null}
    </Row>
  )
}
export default ListHeaderEdit

/************************************************
 * HELPER COMPONENTS
 ***********************************************/
const SaveListButton = ({ onSave }) => (
  <h4>
    <Button bsStyle='primary' style={{float: 'right'}} onClick={() => onSave}>Save</Button>
  </h4>
)

const AddFieldColumn = ({ onAdd }) => (
  <Col key='new-field' md={1}>
    <h4>
      <Button onClick={onAdd}><FontAwesome name='plus' style={{color: 'green'}} /></Button>
    </h4>
  </Col>
)

const editHeaderInputStyle = {
  width:         'calc(100% - 22px)',
}

const changeFieldWidthStyle = {
  padding: '2px',
  cursor: 'pointer'
}