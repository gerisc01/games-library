import React from 'react'
import ItemEdit from './ItemEdit'
import Item from './Item'
import { Button,Col,Row } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'


class SortableItem extends React.Component {  
  constructor(props, context) {
    super(props, context);

    // Save a start swap order so that if an item is not dropped in a valid drop target it can be
    // reset to the pre-drag location
    this.startSwapOrder = null

    this.props.frozenIds = []

    // Populate items
    this.state = {
      order: this.props.order,
      items: this.props.items,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(this.state.order) !== JSON.stringify(nextProps.order)) {
      this.setState({order: nextProps.order, items: nextProps.items})
    }

    // If a editingId is defined, update that item and then reset the editingId
    if (this.state.editingId !== undefined) {
      this.setState({
        items: {
          ...this.state.items,
          [this.state.editingId]: nextProps.items[this.state.editingId]
        },
        editingId: undefined
      })
    }
  }

  swapItems = (originId,destinationId) => {
    if (this.state.editingId !== undefined) return;
    if (this.startSwapOrder === null) this.startSwapOrder = this.state.order.slice(0)
    this.setState({order: this.state.order.map(id => {
      return id === originId ? destinationId : id === destinationId ? originId : id
    })})
  }

  resetOrder = () => {
    if (this.state.editingId !== undefined) return;
    this.setState({order: this.startSwapOrder.slice(0)})
    this.startSwapOrder = null
  }

  render() {
  let newItem = {}
  return (
    <div>
      {this.state.order.map(id => {
        let item = { ...this.state.items[id] }
        return this.state.editingId === id
        ? <ItemEdit key={id} fields={this.props.fields} item={item}
            acceptClick={() => this.acceptEditItem(item)} cancelClick={() => this.cancelEditItem()} />
        : <Item key={id} fields={this.props.fields} item={item} swapItems={this.swapItems}
            resetOrder={this.resetOrder} editClick={() => this.startEditItem(item._id)}
            deleteItem={() => this.props.deleteItem(this.props.activeList,item._id)}
            updateItemOrder={() => this.props.updateItemOrder(this.props.activeList,this.state.order)} />
      })}
      {
        this.state.addingItem
          ? <ItemEdit key="newitem" fields={this.props.fields} item={newItem}
              acceptClick={() => this.createItem(newItem)} cancelClick={() => this.cancelEditItem()} />
          : this.props.id ? <ItemAddButton start={() => this.startAddItem()} /> : undefined
      }
    </div>)
  }
}
export default ItemList

const ItemAddButton = ({ start }) => (
  <Row>
    <Col md={2}>
      <Button onClick={start} style={{float: 'right'}}>
        <FontAwesome name='plus' style={{color: 'green'}}/>
      </Button>
    </Col>
  </Row>
)