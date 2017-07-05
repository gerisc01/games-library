import React from 'react'
import List from './List'

const Lists = ({ lists, activeList, setActiveList }) => (
  <span className="lists">
    <p>
    {lists.map(list => (
      <List 
        key={list.id}
        {...list}
        activeList={list.id === activeList}
        onClick={() => setActiveList(list.id)}
      />
    ))}
    </p>
  </span>
)
export default Lists;