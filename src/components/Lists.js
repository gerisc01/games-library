import React from 'react'
import List from './List'

const listsStyle = {
  float: 'left',
  width: '200px',
  height: '500px',
  marginTop: '70px'
}

const Lists = ({ lists, activeList, setActiveList }) => (
  <div className="lists" style={listsStyle}>
    {lists.map(list => (
      <List 
        key={list.id}
        {...list}
        activeList={list.id === activeList}
        onClick={() => setActiveList(list.id)}
      />
    ))}
  </div>
)
export default Lists;