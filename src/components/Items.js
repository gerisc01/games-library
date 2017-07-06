import React from 'react'
import { Item,ItemHeader } from './Item'
import { Col,Grid,Row } from 'react-bootstrap'

function Items({ items,activeList }) {
  return (
    <div className="items" style={itemsStyle}>
      <Grid>
        <Row>
          <Col mdOffset={1}><h3>{activeList.name}</h3></Col>
        </Row>
        <ItemHeader fields={activeList.fields}/>
        {items.map(item => {
          return <Item key={item.id} fields={activeList.fields} item={item} />
        })}
      </Grid>
    </div>
  )
}

const itemsStyle = {
  float: 'left'
}

/*const Items = ({ items,activeList }) => (
  <div style={itemsStyle}>
    <ul className={activeList.id}>
      {items.map(item => (
        <Item
          key={item.id}
          {...item}
        />
      ))}
    </ul>
  </div>
)*/
export default Items;