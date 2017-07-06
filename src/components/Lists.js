import React from 'react'
import List from './List'

const Lists = ({ lists, activeList, setActiveList }) => (
  <div className="lists" style={listsStyle}>
    {lists.map(list => (
      <List 
        key={list.id}
        activeList={list.id === activeList}
        onClick={() => setActiveList(list.id)}
        {...list}
      />
    ))}
  </div>
)

const listsStyle = {
  float: 'left',
  width: '200px',
  height: '500px',
  marginTop: '70px'
}

export default Lists;