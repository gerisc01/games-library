import React from 'react'
import CollectionsView from '../containers/CollectionsView'
import ListSelectorView from '../containers/ListSelectorView'
import ContentView from '../containers/ContentView'

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import '../resources/css/react-contextmenu.css';

const App = (props) => (
  <div>
    <CollectionsView />
    <ListSelectorView />
    <ContentView />
  </div>
)
export default DragDropContext(HTML5Backend)(App);