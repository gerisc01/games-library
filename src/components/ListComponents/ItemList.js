import React from 'react'
import ItemEdit from './ItemEdit'
import Item from './Item'
import { Button,Col,Row } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'


class ItemList extends React.Component {  
  constructor(props, context) {
    super(props, context);

    // Populate items
    this.state = {
      editingId: undefined,
      addingItem: false,
      order: this.props.order,
      items: this.props.items,
    };
  }

  startEditItem = (id) => {
    this.setState({editingId: id, addingItem: false})
  }

  acceptEditItem = (item) => {
    let items = Object.assign({},this.state.items)
    items[item._id] = item
    this.setState({items: items, editingId: undefined})
  }

  cancelEditItem = () => {
    this.setState({editingId: undefined, addingItem: false})
  }

  startAddItem = () => {
    this.setState({editingId: undefined, addingItem: true})
  }

  createItem = (item) => {
    item["_id"] = "newitem"
    // Either create a real ID or move to redux
    let items = { ...this.state.items }
    items["newitem"] = item
    this.setState({items: items, order: this.state.order.concat("newitem"), addingItem: false})
  }

  swapItems = (originId,destinationId) => {
    this.setState({order: this.state.order.map(id => {
      return id === originId ? destinationId : id === destinationId ? originId : id
    })})
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
            editClick={() => this.startEditItem(item._id)} />
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