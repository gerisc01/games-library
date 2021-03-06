import React from 'react'
import { DropTarget } from 'react-dnd'
import { colorMap } from '../../resources/js/utils'

function targetCollect(connect) {
  return {
    connectDropTarget: connect.dropTarget(),
  }
}

const cardTarget = {
  drop(props, monitor) {
    let newListId = props._id
    let itemId = monitor.getItem().id
    props.moveItem(itemId,newListId)
  },
};


function ListButton({ id,name,color,activeList,onClick,connectDropTarget }) {
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
    connectDropTarget(
    <div onClick={onClick} style={listFlagContainerStyle}>
      <div style={listFlagTextStyle}>
        {name}
      </div>
      <div style={coloredArrowRight} />
    </div>
    )
  )
}
export default DropTarget('item',cardTarget,targetCollect)(ListButton)

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