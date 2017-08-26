import React from 'react'
import { Grid } from 'react-bootstrap'
import { ListEdit } from './ListComponents'

let updatedLists = {}
const ListsEdit = ({ editListsOrder, lists, order, fields }) => (
  <Grid style={{float: 'left'}}>
    {editListsOrder.map(id => {
      // Add a name into each of the fields before adding passing them to ListEdit
      let list = lists[id]
      list["fields"] = list.fields.map(f => { return { ...f, name: fields[f._id].name } })
      return (
      <div key={id} style={{border: 'dotted', marginBottom: '10px'}}>
        <ListEdit list={Object.assign({},list)} fields={fields} onChange={onChange}/>
      </div>
      )
    })}
  </Grid>
)

const onChange = (updatedList) => {
  updatedLists[updatedList._id] = updatedList
}

export default ListsEdit