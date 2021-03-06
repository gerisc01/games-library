import React from 'react'
import AddButton from './AddButton'
import { Button,Col,Row } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'

const Header = (props) => {
  // Every render inputs
  const { collectionFields } = props
  // explicity default fields to an empty list if they aren't present instead of leaving undefined
  const fields = props.fields || []
  // Standard inputs
  const { orderItems } = props
  // Editing inputs
  const { editing, onSave, onAdd, onEdit, hasChanged } = props

  const colOptions = {
    onDelete: props.onDelete,
    onSort: props.onSort,
    defaultSort: props.defaultSort || {}
  }

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
              <ColumnOptions style={{marginTop: '5px'}} fieldIndex={i} id={header._id} {...colOptions} />
            </h4>
            : <h4 style={{fontWeight: 'bold'}}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                  <span>{collectionFields[header._id].name}</span>
                  &nbsp; <ColumnSorter fieldId={header._id} orderItems={orderItems} />
                </div>
              </h4>
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

const ColumnSorter = ({ fieldId, orderItems }) => {
  const buttonStyle = {
    float: 'right', clear: 'right', marginBottom: '-5px', marginTop: '-5px'
  }
  // The negative margins that are needed to display the two buttons close to each other (needed
  // because of excessive padding on top/bottom of font-awesome carets).
  return (
    <span style={{position: 'relative', width: '11px', height: '36px'}}>
      <span style={{position: 'absolute', top: '30%', cursor: 'pointer'}} onClick={() => orderItems(fieldId)}>
        <FontAwesome name='caret-up' style={buttonStyle}/>
        <FontAwesome name='caret-down' style={buttonStyle}/>
      </span>
    </span>
  )
}

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

const ColumnOptions = ({ style, id, fieldIndex, onDelete, defaultSort, onSort }) => {
  
  return (
  <div style={style}>
    <Button onClick={() => {onDelete(fieldIndex)}}><FontAwesome name='trash' /></Button>
    <Button onClick={() => {onSort(fieldIndex)}} bsStyle={id === defaultSort.id ? "primary" : "default"}>
      <FontAwesome name={defaultSort.order === "desc" && defaultSort.id === id
        ? "sort-alpha-desc" : "sort-alpha-asc"} />
    </Button>
  </div>
  )
}