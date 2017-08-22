import React from 'react'
import { ListAddButton,ListButton } from './ListSelectorComponents'

const ListSelector = ({ lists,order,activeId,setActiveList,startAddList,isModifyingLists,stopModifyingLists,moveItem }) => (
  <div style={listSelectorStyle}>
    {order.map(id => (
      <ListButton
        key={id}
        activeList={id === activeId && !isModifyingLists}
        onClick={
          () => {
            setActiveList(id);
            if (isModifyingLists) stopModifyingLists(); 
          }
        }
        moveItem={moveItem}
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