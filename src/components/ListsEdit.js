import React from 'react'
import { Grid } from 'react-bootstrap'
import ListEdit from './ListEdit'

let listItems = []
const ListsEdit = ({ lists }) => (
  <Grid style={{float: 'left'}}>
    {lists.map(list => {
      listItems.push(list)
      return (
        <div key={list.id} style={{border: 'dotted', marginBottom: '10px'}}>
          <ListEdit list={Object.assign({},list)} onChange={onChange}/>
        </div>
      )
    })}
  </Grid>
)

const onChange = (updatedList) => {
  listItems.map(list => {
    return updatedList.id === list.id ? updatedList : list
  })
}

export default ListsEdit