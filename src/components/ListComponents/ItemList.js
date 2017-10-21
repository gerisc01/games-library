import React from 'react'
import ItemEdit from './ItemEdit'
import Item from './Item'
import { Button,Col,Row,Alert } from 'react-bootstrap'
import { StickyContainer, Sticky } from 'react-sticky';
import FontAwesome from 'react-fontawesome'

const alertLink = {cursor: 'pointer'}
class ItemList extends React.Component {  
  constructor(props, context) {
    super(props, context);

    // Save a start swap order so that if an item is not dropped in a valid drop target it can be
    // reset to the pre-drag location
    this.startSwapOrder = null

    // Populate items
    this.state = {
      editingId: undefined,
      addingItem: false,
      order: this.props.order,
      items: this.props.items,
      deletedIds: []
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

  createItem = (item) => {
    this.setState({addingItem: false})
    this.props.createItem(this.props.activeList,item)
  }

  startEditItem = (id) => {
    this.setState({editingId: id, addingItem: false})
  }

  acceptEditItem = (item) => {
    this.props.updateItem(item)
    this.setState({editingId: undefined})
  }

  cancelEditItem = () => {
    this.setState({editingId: undefined, addingItem: false})
  }

  startAddItem = () => {
    this.setState({editingId: undefined, addingItem: true})
  }

  deleteItem = id => {
    this.setState({deletedIds: this.state.deletedIds.concat(id)})
    setTimeout(() => this.deleteConfirm(id,true),5000)
  }

  deleteConfirm = (id,confirm) => {
    if (confirm && this.state.deletedIds.indexOf(id) !== -1) {
      this.props.deleteItem(this.props.activeList,id)
    }

    this.setState({deletedIds: this.state.deletedIds.filter(d_id => {
      return d_id !== id
    })})
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

  renderItemAddRow = (newItem,addToTop) => {
    if (addToTop !== this.props.addToTop) return undefined
    if (this.state.addingItem) {
      return (<ItemEdit key="newitem" fields={this.props.fields} item={newItem}
      acceptClick={() => this.createItem(newItem)} cancelClick={() => this.cancelEditItem()} />)
    } else {
      return this.props.id ? <ItemAddButton start={() => this.startAddItem()} /> : undefined
    }
  }

  render() {
  let newItem = {}
  return (
    <StickyContainer>
      <Sticky>
        { ({style}) => (
            <div style={{position: 'absolute', zIndex: '2', top: '20px', width: '50%', left: '25%', ...style}}>
              {this.state.deletedIds.map(id => (
                <DeletedItemAlert id={id} key={id} name={this.state.items[id][this.props.fields[0]._id]}
                  dismiss={() => this.deleteConfirm(id,true)} undo={() => this.deleteConfirm(id,false)}/>
              ))}
            </div>
          )}
      </Sticky>
      <div style={{position: 'relative', zIndex: '1'}}>
        {this.renderItemAddRow(newItem,true)}
        {this.state.order.map(id => {
          let item = { ...this.state.items[id] }
          return this.state.editingId === id
          ? <ItemEdit key={id} fields={this.props.fields} item={item}
              acceptClick={() => this.acceptEditItem(item)} cancelClick={() => this.cancelEditItem()} />
          : <Item key={id} fields={this.props.fields} item={item} swapItems={this.swapItems}
              resetOrder={this.resetOrder} editClick={() => this.startEditItem(item._id)}
              deleteItem={() => this.deleteItem(id)}
              hidden={this.state.deletedIds.indexOf(id) !== -1}
              updateItemOrder={() => this.props.updateItemOrder(this.props.activeList,this.state.order)} />
        })}
        {this.renderItemAddRow(newItem,false)}
      </div>
    </StickyContainer>)
  }
}
export default ItemList

const DeletedItemAlert = ({id,name,dismiss,undo}) => (
  <Alert bsStyle="danger" style={{padding: '8px', margin: '3px'}}>
    {name} has been deleted. <span style={{float: 'right'}}>
      <a onClick={dismiss} style={alertLink}>Dismiss</a> -- <a onClick={undo} style={alertLink}>Undo</a>
    </span>
  </Alert>
)

const ItemAddButton = ({ start }) => (
  <Row>
    <Col md={2}>
      <Button onClick={start} style={{float: 'right'}}>
        <FontAwesome name='plus' style={{color: 'green'}}/>
      </Button>
    </Col>
  </Row>
)