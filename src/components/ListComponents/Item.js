import React from 'react'
import { Button,Col,Row } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'

// const Item = (props) => {
class Item extends React.Component {
  shouldComponentUpdate(nextProps) {
    return this.props.editing !== nextProps.editing
      || this.props.emphasizedField !== nextProps.emphasizedField
  }

  render() {
    let {fields, editing, hidden, style, emphasizedField} = this.props
    let item = editing ? { ...this.props.item } : this.props.item
    return (
      <div style={{...style, display: hidden ? 'none' : 'block'}}>
        <Row style={{display: 'flex', height: '100%'}}>
          <Col md={2} >
            {!editing ?
              <StandardButtons {...this.props} style={{float: 'right'}}/> :
              <EditButtons     {...this.props} item={item} style={{float: 'right'}}/>
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
}
export default Item

/************************************************
 * HELPER COMPONENTS
 ***********************************************/
const StandardButtons = ({ style,item,startEditItem }) => (
  <div style={style}>
    <Button onClick={startEditItem}><FontAwesome name='pencil'/></Button>
  </div>
)

const EditButtons = ({style, item, cancelEditItem, acceptEditItem}) => (
  <div style={style}>
    <Button onClick={cancelEditItem}><FontAwesome name='remove' style={{color: 'red'}}/></Button>
    <Button onClick={() => acceptEditItem(item)}><FontAwesome name='check' style={{color: 'green'}}/></Button>
  </div>
)