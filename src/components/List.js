import React from 'react'
import { ListTitle,ListHeader,ItemList } from './ListComponents'
import { Grid } from 'react-bootstrap'

const List = (props) => {
  return (
    <div style={listStyle}>
      <Grid>
        <ListTitle title={props.title} />
        <ListHeader {...props} />
        <ItemList key={props.id} {...props} />
      </Grid>
    </div>
  )
}

const listStyle = {
  float: 'left',
}

export default List