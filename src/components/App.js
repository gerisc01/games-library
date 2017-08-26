import React from 'react'
import CollectionsView from '../containers/CollectionsView'
import ListSelectorView from '../containers/ListSelectorView'
import ListContent from './ListContent'

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class App extends React.Component {  
  constructor(props, context) {
    super(props, context);
    this.state = {
      // Setting application variables that shouldn't be stored in the redux store but are
      // used across multiple different views (generally temporary toggalable state variables)
      addingList: false,
      editingLists: false,
      editListsOrder: undefined
    };
  }

  startAddList = () => {
    this.setState({ addingList: true, editingLists: false })
  }

  startEditLists = () => {
    this.setState({ editingLists: true, addingList: false })
  }

  stopModifyingLists = () => {
    this.setState({ editingLists: false, addingList: false })
  }

  setEditListsOrder = (order) => {
    this.setState({editListsOrder: order})
  }

  render() {
    // Props to pass to containers
    const props = {
      // Methods to pass
      startEditLists: this.startEditLists,
      startAddList: this.startAddList,
      stopModifyingLists: this.stopModifyingLists,
      setEditListsOrder: this.setEditListsOrder,
      // State variables to pass
      isAddingList: this.state.addingList,
      isEditingLists: this.state.editingLists,
      editListsOrder: this.state.editListsOrder
    }
    return (
    <div>
      <CollectionsView {...props}/>
      <ListSelectorView {...props}/>
      <ListContent {...props} />
    </div>)
  }
}

export default DragDropContext(HTML5Backend)(App);