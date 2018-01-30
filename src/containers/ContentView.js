import React from 'react'
import { connect } from 'react-redux'
import ListView from '../containers/ListView'
import ListCreateView from '../containers/ListCreateView'
import ListEditView from '../containers/ListEditView'
import SearchView from '../containers/SearchView'

const Content = ({isEditingLists, isAddingList, isSearching}) => {
  if (isEditingLists) {
    return <ListEditView />
  } else if (isAddingList) {
    return <ListCreateView />
  } else if (isSearching) {
    return <SearchView />
  } else {
    return <ListView />
  }
}

const mapStateToProps = (state) => {
  return {
    isAddingList: state.app.isAddingList,
    isEditingLists: state.app.isEditingLists,
    isSearching: state.app.isSearching
  }
}

const ContentView = connect(mapStateToProps)(Content)
export default ContentView