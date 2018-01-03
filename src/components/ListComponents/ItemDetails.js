import React from 'react'
import { Col,Row } from 'react-bootstrap'
import Session from './Session'

class ItemDetails extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { expandedSession: null }
  }

  render() {
    let {collectionFields, item, sessions} = this.props
    // Temp sessions code
    sessions = [
      {
        "Start": "2016-10-12",
        "End": "2017-01-09",
        "Completed": "",
        "Platform":"PS3",
        "Status": "Retired",
        "Status Changes": [
          "Currently Playing on 2016-10-12",
          "Retired on 2017-01-94"
        ]
      },
      {
        "Start": "2017-06-19",
        "End": "2017-08-22",
        "Completed": "2017-07-27",
        "Platform":"PS4",
        "Status": "Completed",
        "Status Changes": [
          "Currently Playing on 2017-06-19",
          "Finished on 2017-07-27",
          "100% Completed on 2017-08-22"
        ]
      },
      {
        "Start": "2017-11-12",
        "End": "",
        "Completed": "",
        "Platform": "PS4",
        "Status": "Currently Playing",
        "Status Changes": [
          "Currently Playing on 2017-11-12"
        ]
      }
    ]

    const fieldStyle = {padding: '5px', paddingLeft: '0px'}
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
    const colStyle = {minHeight: '75px', display: 'flex', flexDirection: 'column', fontSize: '90%',
                      background: 'rgba(127,127,127,0.1)'}

    return (<Row style={{display: 'flex', flexWrap: 'wrap'}}>
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
        {sessions.map((session,i) => {
          return <Session key={"session-"+i}
            start={session["Start"]}
            end={session["End"]}
            completed={session["Completed"]}
            platform={session["Platform"]}
            statuses={session["Status Changes"]}
            active={this.state.expandedSession === i}
            expand={() => this.setState({expandedSession: this.state.expandedSession === i ? null : i})} />
        })}
      </Col>
    </Row>)
  }
}
export default ItemDetails;