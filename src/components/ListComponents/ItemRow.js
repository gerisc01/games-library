import React from 'react'
import ItemEdit from './ItemEdit'
import Item from './Item'

function ItemRow({ item,fields,isEditing,startEditItem,acceptEditItem,cancelEditItem }) {
  return isEditing
    ? <ItemEdit
        fields={fields}
        item={item}
        acceptClick={() => acceptEditItem(item)}
        cancelClick={() => cancelEditItem()} />
    : <Item
        fields={fields}
        item={item}
        editClick={() => startEditItem(item.id)} />
}
export default ItemRow