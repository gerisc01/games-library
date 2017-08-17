import React from 'react'
import ItemRow from './ItemRow'

class ItemList extends React.Component {  
  constructor(props, context) {
    super(props, context);

    // Populate items
    this.state = {
      editingId: undefined,
      order: this.props.order,
      items: this.props.items,
    };
  }

  startEditItem = (id) => {
    this.setState({editingId: id})
  }

  acceptEditItem = (item) => {
    let items = Object.assign({},this.state.items)
    items[item._id] = item
    this.setState({items: items, editingId: undefined})
  }

  cancelEditItem = () => {
    this.setState({editingId: undefined})
  }

  swapItems = (originId,destinationId) => {
    this.setState({order: this.state.order.map(id => {
      return id === originId ? destinationId : id === destinationId ? originId : id
    })})
  }

  render() {
  return (
    <div>
      {this.state.order.map(id => {
        return <ItemRow key={id} item={this.state.items[id]} fields={this.props.fields} isEditing={this.state.editingId === id}
          startEditItem={this.startEditItem} acceptEditItem={this.acceptEditItem} cancelEditItem={this.cancelEditItem} 
          swapItems={this.swapItems}/>
      })}
    </div>)
  }
}
export default ItemList