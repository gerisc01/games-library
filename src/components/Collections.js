import React from 'react'
import Collection from './Collection'

const Collections = ({ collections, activeCollection }) => (
  <span className="collections">
    <p>
    {collections.map(collection => (
      <Collection key={collection.id} {...collection} />
    ))}
    </p>
  </span>
)
export default Collections;