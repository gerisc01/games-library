import React from 'react'
import { connect } from 'react-redux'
import ListView from '../containers/ListView'
import ListCreateView from '../containers/ListCreateView'
import ListEditView from '../containers/ListEditView'

const Content = ({isEditingLists, isAddingList}) => {
  if (isEditingLists) {
    return <div><ListEditView /></div>
  } else if (isAddingList) {
    return <div><ListCreateView /></div>
  } else {
    return <div><ListView /></div>
  }
}

const mapStateToProps = (state) => {
  return {
    isAddingList: state.app.isAddingList,
    isEditingLists: state.app.isEditingLists
  }
}

const ContentView = connect(mapStateToProps)(Content)
export default ContentView