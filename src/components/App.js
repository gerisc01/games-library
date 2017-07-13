import React from 'react'
import CollectionsView from '../containers/CollectionsView'
import ListSelectorView from '../containers/ListSelectorView'
import ContentView from '../containers/ContentView'

const App = () => (
  <div>
    <CollectionsView />
    <ListSelectorView />
    <ContentView />
  </div>
)

export default App