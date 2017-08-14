import React from 'react'
import { colorMap } from '../../resources/js/utils'
import FontAwesome from 'react-fontawesome'

function ListAddButton({ onClick }) {
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
export default ListAddButton

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