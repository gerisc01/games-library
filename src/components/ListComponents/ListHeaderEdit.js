import React from 'react'
import { Button,Col,Row } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'

const ListHeaderEdit = ({ collectionFields,fields,onSave,onAdd,onEdit,onDelete,hasChanged }) => {
  // If the fields widths sum up to less than 10, add a 'add field' button
  const rowWidth = fields.reduce((sum,field) => { return sum + parseInt(field.width,10)},0);
  return (
    <Row>
      <Col key='save-changes' md={2}>
        {onSave ? <SaveListButton onSave={onSave} hasChanged={hasChanged}/> : null}
      </Col>
      {fields.map((header,i) => {
        const width = parseInt(header.width,10)
        return (
        <Col key={i+"-"+header._id} md={width}>
          <h4>
            <div>
              <select style={editHeaderInputStyle} value={header._id} onChange={(e) => {onEdit(i,"name",e.target.value)}}>
                {Object.values(collectionFields).map(cf => {
                  return <option value={cf._id}>{cf.name}</option>
                })}
              </select>
              <FontAwesome name='caret-left' style={changeFieldWidthStyle} 
                onClick={rowWidth > 1 ? () => onEdit(i,"width",width-1) : null}/>
              <FontAwesome name='caret-right' style={changeFieldWidthStyle}
                onClick={rowWidth < 10 ? () => onEdit(i,"width",width+1) : null}/>
            </div>
            <div style={{marginTop: '5px'}}>
              <Button onClick={() => {onDelete(i)}}><FontAwesome name='trash' /></Button>
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
const SaveListButton = ({ onSave,hasChanged }) => (
  <h4>
    <Button bsStyle={hasChanged ? 'primary' : 'default'} style={{float: 'right'}} onClick={onSave}>Save</Button>
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