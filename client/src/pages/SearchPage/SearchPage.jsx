// React
import React, { useState } from 'react'
// Styles
import './SearchPage.scss'

function SearchPage(props) {
  const [searchText, setSearchText] = useState('')

  return (
    <div className="SearchPage">
      <div className="search-bar">
        <input type="text" value={searchText} onChange={({ target }) => setSearchText(target.value)} />
      </div>
    </div>
  )
}

export default SearchPage