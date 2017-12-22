import React from 'react'
import { Button,Col,Row } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'

const Item = (props) => {
  let {fields, details, item, editing, hidden, style} = props
  let toggleDetails = props.toggleDetails;
  if (details) console.log("Showing details for: "+item._id);
  return (
    <div style={{...style, display: hidden ? 'none' : 'block'}} onClick={toggleDetails}>
      <Row>
        <Col md={2} >
          {!editing ?
            <StandardButtons {...props} style={{float: 'right'}}/> :
            <EditButtons     {...props} style={{float: 'right'}}/>
          }
        </Col>
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
      </Row>
      {details ? <ShowDetails {...props} /> : undefined}
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

const ShowDetails = ({collectionFields, item}) => {
  const colStyle = {minHeight: '75px', background: 'rgba(127,127,127,0.1)', fontSize: '90%'}
  const fieldStyle = {padding: '5px', paddingLeft: '0px', opacity: '1'}
  let fieldIds = Object.keys(collectionFields)
  // sort by collectionField name
  fieldIds.sort(function(id1,id2) {
    var nameA = collectionFields[id1].name.toUpperCase();
    var nameB = collectionFields[id2].name.toUpperCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });

  const splitNum = Math.ceil(Object.keys(collectionFields).length/2)
  return (<Row>
    <Col mdOffset={2} md={3} style={colStyle}>
      {fieldIds.slice(0,splitNum).map(id => {
        return (<span style={fieldStyle} key={id}><strong>{collectionFields[id].name}:</strong> {item[id]}<br/></span>)
      })}
    </Col>
    <Col md={3} style={colStyle}>
    {fieldIds.slice(splitNum).map(id => {
        return (<span style={fieldStyle} key={id}><strong>{collectionFields[id].name}:</strong> {item[id]}<br/></span>)
      })}
    </Col>
    <Col md={4} style={colStyle}>
      <span style={{fontWeight: 'bold', textDecoration: 'underline'}}>Playthroughs</span>
    </Col>
  </Row>)
}