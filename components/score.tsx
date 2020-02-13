import React from 'react'
import '../styles/shadows.sass'
import lang from '../lang'

interface Props {
  score: number,
}
interface State {}


class Score extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = { }
  }

  public render() {
    return(
      <div className="absolute right-0 top-0 dib ph3 pv2 bg-white mt3 mr3 light-shadow">
        { lang.score } : { this.props.score }
      </div>
    )
  }
}

export default Score