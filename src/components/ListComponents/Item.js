import React from 'react'
import { Button,Col,Row } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'

const Item = (props) => {
  let {fields, item, editing, hidden, style, emphasizedField} = props
  return (
    <div style={{...style, display: hidden ? 'none' : 'block'}}>
      <Row style={{display: 'flex', height: '100%'}}>
        <Col md={2} >
          {!editing ?
            <StandardButtons {...props} style={{float: 'right'}}/> :
            <EditButtons     {...props} style={{float: 'right'}}/>
          }
        </Col>
        {fields.map((field,i) => {
          let style = emphasizedField === field._id ? 
            {backgroundColor: '#f9f9f9', display: 'flex', flexDirection: 'row'} : {}
          return (
            <Col key={i+"-"+(item._id || "new").toString()} md={parseInt(field.width,10)} style={style}>
              {!editing 
                ? item[field._id]
                : <input type="text" defaultValue={item[field._id]} style={{width: '95%'}}
                    onBlur={(event) => { item[field._id] = event.target.value }} />
              }
            </Col>
          )
        })}
      </Row>
    </div>
  )
}
export default Item

/************************************************
 * HELPER COMPONENTS
 ***********************************************/
const StandardButtons = ({ style,item,editClick }) => (
  <div style={style}>
    <Button onClick={editClick}><FontAwesome name='pencil'/></Button>
  </div>
)

const EditButtons = ({style, item, cancelClick, acceptClick}) => (
  <div style={style}>
    <Button onClick={cancelClick}><FontAwesome name='remove' style={{color: 'red'}}/></Button>
    <Button onClick={() => acceptClick(item._id,item)}><FontAwesome name='check' style={{color: 'green'}}/></Button>
  </div>
)