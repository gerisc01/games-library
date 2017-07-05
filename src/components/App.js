import React from 'react'
import CollectionsView from '../containers/CollectionsView'
import ListsView from '../containers/ListsView'
import ItemsView from '../containers/ItemsView'

const App = () => (
  <div>
    {/*Including Bootstrap CSS*/}
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"></link>
    <CollectionsView />
    <ListsView />
    <ItemsView />
  </div>
)

export default App