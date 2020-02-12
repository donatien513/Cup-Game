import { Component } from 'react'

import '../styles/ascending-boxes.sass'

interface Props {
  className?: string
}
interface State {}

class CubeBackground extends Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {}
  }

  public render() {
    return <div className={ (this.props.className || "") + " area o-20"} >
      <ul className="circles">
        <li><img className="upside-down" src="/images/cup-1.svg" /></li>
        <li><img className="upside-down" src="/images/cup-1.svg" /></li>
        <li><img className="upside-down" src="/images/cup-1.svg" /></li>
        <li><img className="upside-down" src="/images/cup-2.svg" /></li>
        <li><img className="upside-down" src="/images/cup-2.svg" /></li>
        <li><img className="upside-down" src="/images/cup-2.svg" /></li>
        <li><img className="upside-down" src="/images/cup-3.svg" /></li>
        <li><img className="upside-down" src="/images/cup-3.svg" /></li>
        <li><img className="upside-down" src="/images/cup-3.svg" /></li>
        <li><img className="upside-down" src="/images/cup-3.svg" /></li>
      </ul>
    </div>
  }
}

export default CubeBackground
