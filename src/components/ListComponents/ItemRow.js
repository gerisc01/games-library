import React from 'react'
import ItemEdit from './ItemEdit'
import Item from './Item'

function ItemRow({ item,fields,isEditing,onClicks }) {
  return isEditing
    ? <ItemEdit
        fields={fields}
        item={item}
        acceptClick={() => onClicks.acceptEditingItem(item.id,item)}
        cancelClick={() => onClicks.cancelEditingItem(item.id)} />
    : <Item
        fields={fields}
        item={item}
        editClick={() => onClicks.setEditingItem(item.id)} />
}
export default ItemRow