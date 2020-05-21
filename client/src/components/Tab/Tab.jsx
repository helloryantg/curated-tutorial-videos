// React
import React from 'react'
// Styles
import './Tab.scss'
// Dependencies
import { 
  IoMdSearch,
  IoIosList,
  IoIosArrowForward
} from "react-icons/io"

const table = {
  search: IoMdSearch,
}

function Tab(props) {
  const { 
    label,
  } = props

  const renderIcon = () => {
    switch(props.label) {
      case 'Search':
        return <IoMdSearch />
      default:
        return <div>E</div>
    }
  }

  return (
    <div className="Tab">
      <div className="row">
        <div className="icon">{renderIcon()}</div>
        <div className="label">{label}</div>
      </div>
    </div>
  )
}

export default Tab