import React from 'react'
import 'styles/ascending-boxes.sass'

const AscendingBoxes = () => {
  return <div className=" area o-20">
    <ul className="circles">
      <li><img className="upside-down" src={ process.env.baseURL + '/images/cup-1.svg' } /></li>
      <li><img className="upside-down" src={ process.env.baseURL + '/images/cup-1.svg' } /></li>
      <li><img className="upside-down" src={ process.env.baseURL + '/images/cup-1.svg' } /></li>
      <li><img className="upside-down" src={ process.env.baseURL + '/images/cup-2.svg' } /></li>
      <li><img className="upside-down" src={ process.env.baseURL + '/images/cup-2.svg' } /></li>
      <li><img className="upside-down" src={ process.env.baseURL + '/images/cup-2.svg' } /></li>
      <li><img className="upside-down" src={ process.env.baseURL + '/images/cup-3.svg' } /></li>
      <li><img className="upside-down" src={ process.env.baseURL + '/images/cup-3.svg' } /></li>
      <li><img className="upside-down" src={ process.env.baseURL + '/images/cup-3.svg' } /></li>
      <li><img className="upside-down" src={ process.env.baseURL + '/images/cup-3.svg' } /></li>
    </ul>
  </div>
}

export default AscendingBoxes
