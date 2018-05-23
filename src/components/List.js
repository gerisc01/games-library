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
      showDetailId: undefined,
      addingItem: false,
      sort: {},
      sortOrder: undefined,
      order: this.props.order,
      deletedItems: []
    };
    this.items = this.props.items
    this.itemActionsMenus = [];

    if (props.defaultSort && this.props.defaultSort.id) this.orderAndSetItems(props.defaultSort.id,props.defaultSort.order)
  }

  render() {
    return (
    <Grid style={{float: 'left'}}>
      <StickyContainer>
        <Sticky>
          { ({style}) => (
              <div style={{position: 'absolute', zIndex: '4', top: '20px', width: '50%', left: '25%', ...style}}>
                {this.state.deletedItems.map((item,i) => {
                  return <DeletedItemAlert id={item._id} key={item._id} name={item[this.props.fields[0]._id]}
                    undo={() => this.props.undeleteItem(item._id)} dismiss={() => this.deleteItemDismiss(item._id)} />
                })}
              </div>
            )}
        </Sticky>
        <Title {...this.props} />
        <Header {...this.props} orderItems={this.orderAndSetItems} />
        <div style={{position: 'relative', zIndex: '3'}}>
          {this.renderItemAddRow(true)}
          {(this.state.sortOrder || this.state.order).map((id,i) => {
            const item = this.items[id]
            let itemProps = {
              ...this.props,
              swapItems:            this.swapItems,
              resetOrder:           this.resetOrder,
              emphasizedField:      this.state.sort.id,
              updateItemOrder:      () => this.updateItemOrder(),
              startEditItem:        () => this.startEditItem(id),
              cancelEditItem:       () => this.cancelEditItem(),
              acceptEditItem:       (item) => this.acceptEditItem(item),
              toggleDetails:    () => {
                this.setState({showDetailId: !this.state.showDetailId || this.state.showDetailId !== id
                  ? id : undefined})},
              details:              this.state.showDetailId === id,
              deleteItem:           this.deleteItem,
              item:                 item,
              editing:              this.state.editingId === id,
              sortable:             Object.keys(this.state.sort).length === 0,
              index:                i
            }
            return <MoveableItem {...itemProps} key={id} id={id} />
          })}
          {this.renderItemAddRow(false)}
        </div>
      </StickyContainer>
    </Grid>
  )}

  componentWillReceiveProps(nextProps) {
    this.items = nextProps.items
    if (this.state.editingId !== undefined) {
      // If a editingId is defined, update that item and then reset the editingId
      this.setState({ editingId: undefined })
    } else if (this.props.id !== nextProps.id) {
      // If a new list has been selected, reset the sort to null and use the new items/order
      let defaultSort = nextProps.defaultSort || {}
      this.setState({
        order: nextProps.order,
        sort: defaultSort,
        sortOrder: defaultSort.id ? this.orderItems(nextProps.items,nextProps.order,defaultSort.id,defaultSort.order) : undefined
      })
    } else if (this.state.sort.id) {
      // If the same list is used and has a sort order defined, use the new items/order but re-order
      // the new list while including any new items
      this.setState({
        order: nextProps.order,
        sortOrder: this.orderItems(nextProps.items,nextProps.order,this.state.sort.id,this.state.sort.order),
      })
    } else {
      // If the same list is being used, use the new items but don't reset sort order
      this.setState({ order: nextProps.order })
    }
  }

  orderAndSetItems = (fieldId,order) => {
    if (order === undefined && this.state.sort.order === "desc") {
      this.setState({sort: {}, sortOrder: undefined})
    } else {
      if (order === undefined) order = this.state.sort.order ? "desc" : "asc"
      this.setState({
        sort: {id: fieldId, order: order},
        sortOrder: this.orderItems(this.items,this.state.order,fieldId,order)
      })
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
    this.setState({deletedItems: this.state.deletedItems.concat(this.items[id])})
    this.props.deleteItem(id)
    setTimeout(() => this.deleteItemDismiss(id,true),7000)
  }

  deleteItemDismiss = id => {
    this.setState({deletedItems: this.state.deletedItems.filter(item => {
      return item._id !== id
    })})
  }

  updateItemOrder = () => {
    this.props.updateItemOrder(this.state.order);
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

  swapItems = (originIndex,destinationIndex) => {
    if (this.state.editingId !== undefined) return;
    if (this.startSwapOrder === null) this.startSwapOrder = this.state.order.slice(0)

    let originItem = this.state.order[originIndex]
    // Create a new order with the previous item sliced out of the list
    let newOrder = this.state.order.slice(0);
    newOrder.splice(originIndex,1)
    newOrder.splice(destinationIndex,0,originItem)
    this.setState({order: newOrder, showDetailId: undefined})
  }

  resetOrder = () => {
    // Don't reset order when editing or sorted because re-ordering shouldn't be allowed in the first place
    if (this.state.editingId !== undefined || this.state.sort.id) return;
    this.setState({order: this.startSwapOrder.slice(0)})
    this.startSwapOrder = null
  }

  renderItemAddRow = (addToTop) => {
    if (addToTop !== this.props.addToTop) return undefined
    if (this.state.addingItem) {
      return (<Item key="newitem" fields={this.props.fields} editing={true}
      acceptEditItem={(item) => this.createItem(item)} cancelEditItem={() => this.cancelEditItem()} />)
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
      <a onClick={dismiss} style={alertLink}>Dismiss</a> -- <a onClick={() => {undo(); dismiss();}} style={alertLink}>Undo</a>
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