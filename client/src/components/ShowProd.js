import React from 'react'
import './GlobalStyles.css'

const ShowProd = (props) => {
  return (
    <div>
      <div className="nav-wrapper">
        <button onClick={props.prev}>Products</button>
        <button onClick={props.next}>Results</button>
      </div>

      <table>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Status</th>
          <th>Image</th>
        </tr>
      </table>
    </div>
  )
}

export default ShowProd;
