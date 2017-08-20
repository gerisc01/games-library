import React from 'react'
import ListView from '../containers/ListView'
import ListCreateView from '../containers/ListCreateView'
import ListsEditView from '../containers/ListsEditView'

const ListContent = (props) => {
  if (props.isEditingLists) {
    return <div><ListsEditView {...props} /></div>
  } else if (props.isAddingList) {
    return <div><ListCreateView {...props} /></div>
  } else {
    return <div><ListView {...props} /></div>
  }
}
export default ListContent