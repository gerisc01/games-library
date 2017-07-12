import React from 'react'
import { colorMap } from '../resources/js/utils'
import FontAwesome from 'react-fontawesome'

export function List({ id,name,color,activeList,onClick }) {
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

export function AddList({ onClick }) {
  // Create the style for the add list flag text
  let addListFlagTextStyle = Object.assign({},listFlagTextStyleBase)
  addListFlagTextStyle['cursor'] = "pointer"
  addListFlagTextStyle['width'] = "50px"
  addListFlagTextStyle['fontSize'] = "20px"
  addListFlagTextStyle['border'] = "dashed"

  return (
    <div style={listFlagContainerStyleBase}>
      <div onClick={onClick} style={addListFlagTextStyle}>
        <FontAwesome name='plus' style={{color: colorMap['pastel-green']}}/>
      </div>
      <div style={arrowRight} />
    </div>
  )
}

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