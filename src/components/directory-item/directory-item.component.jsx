import './directory-item.styles.scss'

import React from 'react'

function DirectoryItem({ category }) {
  const { imageUrl, title } = category;

  return (
    <div className="directory-item-container">
      <div className="background-image" style={{
        backgroundImage: `url(${imageUrl})`
      }} />
      {/* <img src={imageUrl} alt="category-image" /> */}
      <div className="directory-item-body">
        <h2>{title}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  )
}

export default DirectoryItem;