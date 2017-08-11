import React from 'react'
import { ListAddButton,ListButton } from './ListSelectorComponents'

const ListSelector = ({ lists,activeListId,setActiveList,addList }) => (
  <div style={listSelectorStyle}>
    {lists.map(list => (
      <ListButton
        key={list.id}
        activeList={list.id === activeListId}
        onClick={() => setActiveList(list.id)}
        {...list}
      />
    ))}
    <ListAddButton onClick={addList}/>
  </div>
)

const listSelectorStyle = {
  float: 'left',
  width: '200px',
  height: '500px',
  marginTop: '70px'
}

export default ListSelector;