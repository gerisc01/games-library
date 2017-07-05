import React from 'react'

const listStyle = {
  width: '200px',
  height: '50px',
  marginTop: '5px',
  marginBottom: '5px',
  padding: '0px',
  cursor: 'pointer'
}

const textStyle = {
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

const List = ({ id, name, activeList, onClick }) => (
  <div
    className={id}
    onClick={onClick}
    style={
      Object.assign(
      activeList
      // Style if the list is currently active
      ? {
        fontWeight: 'bold'
      }
      // Style if the list is not currently active 
      : {
        cursor: 'pointer'
      },
      listStyle
    )}
  >
    <div style={Object.assign({backgroundColor: '#77DD77'},textStyle)}>
    {name}
    </div>
    <div style={arrowRight} />
    
  </div>
)
export default List;