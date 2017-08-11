import React from 'react'
import ItemRow from './ItemRow'

class ItemList extends React.Component {  
  constructor(props, context) {
    super(props, context);

    // Populate items
    this.items = {}
    this.props.items.forEach(item => { this.items[item.id] = item })
    this.state = {
      editingId: undefined,
      order: this.props.items.map(item => {return item.id}),
      items: this.items,
    };
  }

  startEditItem = (id) => {
    this.setState({editingId: id})
  }

  acceptEditItem = (item) => {
    let items = Object.assign({},this.state.items)
    items[item.id] = item
    this.setState({items: items, editingId: undefined})
  }

  cancelEditItem = () => {
    this.setState({editingId: undefined})
  }

  render() {
  return (
    <div>
      {this.state.order.map(id => {
        return <ItemRow key={id} item={this.state.items[id]} fields={this.props.fields} isEditing={this.state.editingId == id}
          startEditItem={this.startEditItem} acceptEditItem={this.acceptEditItem} cancelEditItem={this.cancelEditItem} />
      })}
    </div>)
  }
}
export default ItemList