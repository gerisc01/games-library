import React from 'react'
import FontAwesome from 'react-fontawesome'

const fieldStyle = {padding: '5px', paddingLeft: '0px'}
const Session = ({start,end,completed,platform,statuses,active,expand}) => (
  <div>
    {/* Session Expander and Start/End Dates */}
    <FontAwesome name={(active ? 'minus' : 'plus')+'-square-o'} style={{paddingRight: '5px'}} onClick={expand}/>
    <span style={fieldStyle}>{start} -> {end !== "" ? end : "--"}</span><br/>
    {/* Session details -- visibility depends on active flag */}
    {active ? (<div>
      <span>Completed: {completed !== "" ? completed : "--"} ({platform})</span><br/>
      <span>---------</span><br/>
      {statuses.map(status => {
        return <span>- {status}<br/></span>
      })}
    </div>) : null}
  </div>
)
export default Session