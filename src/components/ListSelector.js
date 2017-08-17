import React from 'react'
import { ListAddButton,ListButton } from './ListSelectorComponents'

const ListSelector = ({ lists,order,collectionId,activeId,setActiveList,addList }) => (
  <div style={listSelectorStyle}>
    {order[collectionId].map(id => (
      <ListButton
        key={id}
        activeList={id === activeId}
        onClick={() => setActiveList(id)}
        {...lists[id]}
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