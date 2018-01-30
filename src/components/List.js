import React from 'react'
import { Title,Header,Item,MoveableItem } from './ListComponents'
import { Grid,Button,Col,Row,Alert } from 'react-bootstrap'
import { StickyContainer, Sticky } from 'react-sticky';
import FontAwesome from 'react-fontawesome'

class List extends React.Component {  
  constructor(props, context) {
    super(props, context);

    // Save a start swap order so that if an item is not dropped in a valid drop target it can be
    // reset to the pre-drag location
    this.startSwapOrder = null

    // Populate items
    this.state = {
      editingId: undefined,
      addingItem: false,
      sort: {},
      sortOrder: undefined,
      order: this.props.order,
      items: this.props.items,
      deletedIds: []
    };
  }

  render() {
    let newItem = {}
    let moveProps = {
      swapItems: this.swapItems,
      resetOrder: this.resetOrder,
      updateItemOrder: () => this.props.updateItemOrder(this.state.order)
    }
    // Put ordering the list and setting it to the list state into a variable function that will
    // be passed to the header so the lists can be ordered by clicking a button from there
    let orderAndSetItems = (fieldId,order) => this.setState({
      sort: {id: fieldId, order: order},
      sortOrder: this.orderItems(this.state.items,this.state.order,fieldId,order)
    })
    return (
    <Grid style={{float: 'left'}}>
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
        <Title {...this.props} />
        <Header {...this.props} orderItems={orderAndSetItems} />
        <div style={{position: 'relative', zIndex: '3'}}>
          {this.renderItemAddRow(newItem,true)}
          {(this.state.sortOrder || this.state.order).map(id => {
            let item = { ...this.state.items[id] }
            let itemProps = {
              fields:          this.props.fields,
              item:            item,
              emphasizedField: this.state.sort.id,
              editClick:       () => this.startEditItem(item._id),
              deleteItem:      () => this.deleteItem(id),
              acceptClick:     () => this.acceptEditItem(item),
              cancelClick:     () => this.cancelEditItem(),
              hidden:          this.state.deletedIds.indexOf(id) !== -1
            }
            return (<MoveableItem key={id} id={id} {...moveProps} sortable={Object.keys(this.state.sort).length === 0} >
              <Item editing={this.state.editingId === id} {...itemProps} />
            </MoveableItem>)
          })}
          {this.renderItemAddRow(newItem,false)}
        </div>
      </StickyContainer>
    </Grid>
  )}

  componentWillReceiveProps(nextProps) {
    if (this.state.editingId !== undefined) {
      // If a editingId is defined, update that item and then reset the editingId
      this.setState({
        items: {
          ...this.state.items,
          [this.state.editingId]: nextProps.items[this.state.editingId]
        },
        editingId: undefined
      })
    } else if (this.props.id !== nextProps.id) {
      // If a new list has been selected, reset the sort to null and use the new items/order
      this.setState({order: nextProps.order, items: nextProps.items, sort: {}, sortOrder: undefined})
    } else if (this.state.sort.id) {
      // If the same list is used and has a sort order defined, use the new items/order but re-order
      // the new list while including any new items
      this.setState({
        items: nextProps.items,
        order: nextProps.order,
        sortOrder: this.orderItems(nextProps.items,nextProps.order,this.state.sort.id,this.state.sort.order),
      })
    } else {
      // If the same list is being used, use the new items but don't reset sort order
      this.setState({order: nextProps.order, items: nextProps.items})
    }
  }

  createItem = (item) => {
    this.setState({addingItem: false})
    this.props.createItem(item)
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
      this.props.deleteItem(id)
    }

    this.setState({deletedIds: this.state.deletedIds.filter(d_id => {
      return d_id !== id
    })})
  }

  orderItems = (listItems, listOrder, fieldId, order) => {
    // Order the items passed in and return a sorted list of the items
    let sortOrder = listOrder.slice().sort((a,b) => {
      let columnA = listItems[a][fieldId].toLowerCase()
      let columnB = listItems[b][fieldId].toLowerCase()
      if (columnA < columnB) {
        return order === "asc" ? -1 : 1
      }
      if (columnA > columnB) {
        return order === "asc" ? 1 : -1
      }
      return 0
    })
    return sortOrder;
  }

  swapItems = (originId,destinationId) => {
    if (this.state.editingId !== undefined) return;
    if (this.startSwapOrder === null) this.startSwapOrder = this.state.order.slice(0)
    this.setState({order: this.state.order.map(id => {
      return id === originId ? destinationId : id === destinationId ? originId : id
    })})
  }

  resetOrder = () => {
    // Don't reset order when editing or sorted because re-ordering shouldn't be allowed in the first place
    if (this.state.editingId !== undefined || this.state.sort.id) return;
    this.setState({order: this.startSwapOrder.slice(0)})
    this.startSwapOrder = null
  }

  renderItemAddRow = (newItem,addToTop) => {
    if (addToTop !== this.props.addToTop) return undefined
    if (this.state.addingItem) {
      return (<Item key="newitem" fields={this.props.fields} item={newItem} editing={true}
      acceptClick={() => this.createItem(newItem)} cancelClick={() => this.cancelEditItem()} />)
    } else {
      return this.props.id ? <ItemAddButton start={() => this.startAddItem()} /> : undefined
    }
  }
}
export default List

const DeletedItemAlert = ({id,name,dismiss,undo}) => {
  const alertLink = {cursor: 'pointer'}
  return (
  <Alert bsStyle="danger" style={{padding: '8px', margin: '3px'}}>
    {name} has been deleted. <span style={{float: 'right'}}>
      <a onClick={dismiss} style={alertLink}>Dismiss</a> -- <a onClick={undo} style={alertLink}>Undo</a>
    </span>
  </Alert>
  )
}

const ItemAddButton = ({ start }) => (
  <Row>
    <Col md={2}>
      <Button onClick={start} style={{float: 'right'}}>
        <FontAwesome name='plus' style={{color: 'green'}}/>
      </Button>
    </Col>
  </Row>
)