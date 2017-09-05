import React from 'react'
import CollectionsView from '../containers/CollectionsView'
import ListSelectorView from '../containers/ListSelectorView'
import Content from './Content'

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class App extends React.Component {  
  constructor(props, context) {
    super(props, context);
    this.state = {
      // Setting application variables that shouldn't be stored in the redux store but are
      // used across multiple different views (generally temporary toggalable state variables)
      addingList: false,
      editMode: false
    };
  }

  startAddList = () => {
    this.setState({ addingList: true, editMode: false })
  }

  startEditMode = () => {
    this.setState({ editMode: true, addingList: false })
  }

  stopEditMode = () => {
    this.setState({ editMode: false, addingList: false })
  }

  render() {
    // Props to pass to containers
    const props = {
      // Methods to pass
      startAddList: this.startAddList,
      startEditMode: this.startEditMode,
      stopEditMode: this.stopEditMode,
      // State variables to pass
      isAddingList: this.state.addingList,
      isEditingLists: this.state.editMode,
    }
    return (
    <div>
      <CollectionsView {...props}/>
      <ListSelectorView {...props}/>
      <Content {...props} />
    </div>)
  }
}

export default DragDropContext(HTML5Backend)(App);