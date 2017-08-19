import React from 'react'
import { ListAddButton,ListButton } from './ListSelectorComponents'

const ListSelector = ({ lists,order,collectionId,activeId,setActiveList,startAddList,isModifyingLists,stopModifyingLists }) => (
  <div style={listSelectorStyle}>
    {order[collectionId].map(id => (
      <ListButton
        key={id}
        activeList={id === activeId && !isModifyingLists}
        onClick={
          () => {
            setActiveList(id);
            if (isModifyingLists) stopModifyingLists(); 
          }
        }
        {...lists[id]}
      />
    ))}
    <ListAddButton onClick={startAddList}/>
  </div>
)

const listSelectorStyle = {
  float: 'left',
  width: '200px',
  height: '500px',
  marginTop: '70px'
}

export default ListSelector;