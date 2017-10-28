import React from 'react'
import AddButton from './AddButton'
import { Button,Col,Row } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'

const Header = (props) => {
  // Every render inputs
  const { collectionFields, fields } = props
  // Editing inputs
  const { editing, onSave, onAdd, onEdit, onDelete, hasChanged } = props

  // If the fields widths sum up to less than 10, add a 'add field' button
  const rowWidth = fields.reduce((sum,field) => { return sum + parseInt(field.width,10)},0);
  return (
    <Row>
      <Col key='save-button' md={2}>
        {onSave ? <SaveButton onSave={onSave} highlight={hasChanged}/> : null}
      </Col>
      {fields.map((header,i) => {
        const width = parseInt(header.width,10)
        return (
        <Col key={i+"-"+header._id} md={width}>
          {editing
            ? <h4>
              <div>
                <FieldSelector onChange={onEdit} fieldIndex={i} fieldId={header._id} fields={collectionFields} />
                <ColumnResizer onChange={onEdit} fieldIndex={i} rowWidth={rowWidth} width={width} />
              </div>
              <ColumnOptions style={{marginTop: '5px'}} onDelete={onDelete} fieldIndex={i} />
            </h4>
            : <h4 style={{fontWeight: 'bold'}}><div>{collectionFields[header._id].name}</div></h4>
          }
        </Col>
        )
      })}
      {
        rowWidth < 10 && editing
        ? <Col key='new' md={1}>
            <h4><AddButton onClick={onAdd} /></h4>
          </Col>
        : null
      }
    </Row>
  )
}
export default Header

/************************************************
 * HELPER COMPONENTS
 ***********************************************/
const SaveButton = ({ onSave,highlight }) => (
  <h4>
    <Button bsStyle={highlight ? 'primary' : 'default'} style={{float: 'right'}} onClick={onSave}>Save</Button>
  </h4>
)

const FieldSelector = ({ fieldId,fieldIndex,fields,onChange}) => (
  <select style={{width: 'calc(100% - 22px)'}} value={fieldId}
    onChange={(e) => {onChange(fieldIndex,"name",e.target.value)}}>
  {
    Object.values(fields).map(f => {
      return <option key={f._id} value={f._id}>{f.name}</option>
    })
  }
  </select>
)

const ColumnResizer = ({ rowWidth, width, fieldIndex, onChange }) => {
  const resizerStyle = { padding: '2px', cursor: 'pointer' }

  return (
    <span>
      <FontAwesome name='caret-left' style={resizerStyle} 
      onClick={rowWidth > 1 ? () => onChange(fieldIndex,"width",width-1) : null}/>
      <FontAwesome name='caret-right' style={resizerStyle}
      onClick={rowWidth < 10 ? () => onChange(fieldIndex,"width",width+1) : null}/>
    </span>
  )
}

const ColumnOptions = ({ style, fieldIndex, onDelete }) => (
  <div style={style}>
    <Button onClick={() => {onDelete(fieldIndex)}}><FontAwesome name='trash' /></Button>
  </div>
)