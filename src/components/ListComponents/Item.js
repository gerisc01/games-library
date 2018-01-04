import React from 'react'
import { Button,Col,Row } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'
import ItemDetails from './ItemDetails'

const Item = (props) => {
  let {fields, details, item, editing, hidden, style} = props
  let toggleDetails = props.toggleDetails;
  return (
    <div style={{...style, display: hidden ? 'none' : 'block'}}>
      <Row>
        <Col md={2} >
          {!editing ?
            <StandardButtons {...props} style={{float: 'right'}}/> :
            <EditButtons     {...props} style={{float: 'right'}}/>
          }
        </Col>
        {/* Div to be the click container for toggling details so the details don't show on a button click */}
        <div onClick={toggleDetails}>
          {fields.map((field,i) => {
            return (
              <Col key={i+"-"+(item._id || "new").toString()} md={parseInt(field.width,10)}>
                {!editing 
                  ? item[field._id]
                  : <input type="text" defaultValue={item[field._id]} style={{width: '95%'}}
                      onBlur={(event) => { item[field._id] = event.target.value }} />
                }
              </Col>
            )
          })}
        </div>
      </Row>
      {details ? <ItemDetails {...props}/> : undefined}
      </div>
  )
}
export default Item

/************************************************
 * HELPER COMPONENTS
 ***********************************************/
const StandardButtons = ({style, editClick, deleteItem }) => (
  <div style={style}>
    <Button onClick={editClick}><FontAwesome name='pencil'/></Button>
    <Button onClick={deleteItem}><FontAwesome name='trash'/></Button>
  </div>
)

const EditButtons = ({style, item, cancelClick, acceptClick}) => (
  <div style={style}>
    <Button onClick={cancelClick}><FontAwesome name='remove' style={{color: 'red'}}/></Button>
    <Button onClick={() => acceptClick(item._id,item)}><FontAwesome name='check' style={{color: 'green'}}/></Button>
  </div>
)