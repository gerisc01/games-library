import React from 'react'
import ListView from '../containers/ListView'
import ListCreateView from '../containers/ListCreateView'
import ListEditView from '../containers/ListEditView'
import SearchView from '../containers/SearchView'

const ListContent = (props) => {
  if (props.isEditingLists) {
    return <div><ListEditView {...props} /></div>
  } else if (props.isAddingList) {
    return <div><ListCreateView {...props} /></div>
  } else if (props.isSearching) {
    return <div><SearchView {...props} /></div>
  } else {
    return <div><ListView {...props} /></div>
  }
}
export default ListContent