import React from 'react'
import { colorMap } from '../resources/js/utils'
import FontAwesome from 'react-fontawesome'
import { Button,Col,Row } from 'react-bootstrap'

export function ListButton({ id,name,color,activeList,onClick }) {
  // Create the style for the list flag container
  let listFlagContainerStyle = Object.assign({},listFlagContainerStyleBase);
  if (activeList) {
    // If the current list is active, set the font weight to bold
    listFlagContainerStyle['fontWeight'] = 'bold'
  } else {
    // If the current list is not active, set the cursor to a pointer
    listFlagContainerStyle['cursor'] = 'pointer'
  }

  // Create the style for the list flag text
  let listFlagTextStyle = Object.assign({},listFlagTextStyleBase)

  // Add the proper color to the list tab text and arrow right
  let coloredArrowRight = Object.assign({},arrowRight)
  if (colorMap[color] !== undefined) {
    listFlagTextStyle['backgroundColor'] = colorMap[color]
    coloredArrowRight['color'] = colorMap[color]
  }

  // Return the Component HTML
  return (
    <div onClick={onClick} style={listFlagContainerStyle}>
      <div style={listFlagTextStyle}>
        {name}
      </div>
      <div style={coloredArrowRight} />
    </div>
  )
}

export function ListAddButton({ onClick }) {
  // Create the style for the add list flag text
  let addListFlagTextStyle = Object.assign({},listFlagTextStyleBase, {
    cursor: "pointer",
    width: "50px",
    fontSize: "20px",
    border: "dashed"
  })

  return (
    <div style={listFlagContainerStyleBase}>
      <div onClick={onClick} style={addListFlagTextStyle}>
        <FontAwesome name='plus' style={{color: colorMap['pastel-green']}}/>
      </div>
      <div style={arrowRight} />
    </div>
  )
}

export const ListTitle = ({ title,onEdit }) => (
  <Row>
    <Col mdOffset={1}>
      <h3>{title}</h3>
    </Col>
  </Row>
)

export const ListTitleEdit = ({ title,onEdit }) => (
  <Row>
    <Col mdOffset={1}>
      <h3><input value={title} onChange={(e) => onEdit(e.target.value)}/></h3>
    </Col>
  </Row>
)

export const ListHeader = ({ fields }) => {
  return (
    <Row>
      {fields.map((header,i) => {
        return (
        <Col key={header.id} mdOffset={i === 0 ? 2 : undefined} md={parseInt(header.width,10)}>
          <h4 style={{fontWeight: 'bold'}}> 
            <div>{header.name}</div>
          </h4>
        </Col>)
      })}
    </Row>
  )
}

export const ListHeaderEdit = ({ fields,onSave,onAdd,onEdit,onDelete }) => {
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
        <Col key={header.id} md={width}>
          <h4>
            <div>
              <input value={header.name} style={editHeaderInputStyle} onChange={(e) => {onEdit(header.id,"name",e.target.value)}} />
              <FontAwesome name='caret-left' style={changeFieldWidthStyle} 
                onClick={width > 1 ? () => onEdit(header.id,"width",width-1) : null}/>
              <FontAwesome name='caret-right' style={changeFieldWidthStyle}
                onClick={width <10 ? () => onEdit(header.id,"width",width+1) : null}/>
            </div>
            <div style={{marginTop: '5px'}}>
              <Button onClick={() => {onDelete(header.id)}}><FontAwesome name='trash' /></Button>
            </div>
          </h4>
        </Col>
        )
      })}
      {rowWidth < 10 ? <AddFieldColumn onAdd={onAdd} /> : null}
    </Row>
  )
}

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

/************************************************
 * CSS CONSTANTS
 ***********************************************/

const listFlagContainerStyleBase = {
  width: '200px',
  height: '50px',
  marginTop: '5px',
  marginBottom: '5px',
  padding: '0px'
}

const listFlagTextStyleBase = {
  float: 'left',
  height: '50px',
  width: '175px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}

const arrowRight = {
  float: 'left',
  width: '0',
  height: '0',
  borderTop: '25px solid transparent',
  borderBottom: '25px solid transparent',
  borderLeft: '25px solid'
}

const editHeaderInputStyle = {
  width:         'calc(100% - 22px)',
}

const changeFieldWidthStyle = {
  padding: '2px',
  cursor: 'pointer'
}