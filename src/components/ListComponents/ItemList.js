import React from 'react'
import ItemRow from './ItemRow'

class ItemList extends React.Component {  
  constructor(props, context) {
    super(props, context);
    this.itemEditingOnClicks = {
      setEditingItem: props.onSetEditingItem,
      acceptEditingItem: props.onAcceptEditingItem,
      cancelEditingItem: props.onCancelEditingItem,
    }
    this.order = this.props.items.map(item => {return item.id})
    this.items = {}
    this.props.items.forEach(item => {
      this.items[item.id] = item
    })
  }

  render() {
  return (
    <div>
      {this.order.map(id => {
        return <ItemRow key={id} item={this.items[id]} fields={this.props.fields} 
            isEditing={this.props.editingId === id} onClicks={this.itemEditingOnClicks} />
      })}
    </div>)
  }
}
export default ItemList